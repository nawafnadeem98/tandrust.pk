const { SignJWT, jwtVerify } = require("jose");
const bcrypt = require("bcryptjs");
const { cookies } = require("next/headers");
const { prisma } = require("./prisma");

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "tandrust-pk-default-secure-secret-key-2026"
);

const COOKIE_NAME = "sehat_token";

async function signToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

async function hashPassword(plainText) {
  return await bcrypt.hash(plainText, 10);
}

async function comparePassword(plainText, hash) {
  return await bcrypt.compare(plainText, hash);
}

async function getSessionUser(request = null) {
  let token = null;

  if (request) {
    // Check Authorization header
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    } else {
      // Check cookies on request
      const cookieHeader = request.headers.get("cookie");
      if (cookieHeader) {
        const match = cookieHeader.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
        if (match) token = decodeURIComponent(match[1]);
      }
    }
  }

  if (!token) {
    try {
      const cookieStore = cookies();
      const cookieObj = cookieStore.get(COOKIE_NAME);
      if (cookieObj) token = cookieObj.value;
    } catch (e) {
      // Outside of Next request context
    }
  }

  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload || !payload.id) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      include: {
        profile: true,
        provider: true,
      },
    });

    if (!user || !user.isActive) return null;

    const { passwordHash, ...safeUser } = user;
    return safeUser;
  } catch (e) {
    console.error("Error fetching session user:", e);
    return null;
  }
}

async function requireAuth(request) {
  const user = await getSessionUser(request);
  if (!user) {
    return {
      error: "Authentication required. Please sign in to continue.",
      status: 401,
      user: null,
    };
  }
  return { error: null, user };
}

async function requireRole(request, allowedRoles = []) {
  const auth = await requireAuth(request);
  if (auth.error) return auth;

  if (allowedRoles.length > 0 && !allowedRoles.includes(auth.user.role)) {
    return {
      error: "Forbidden. You do not have permission to access this resource.",
      status: 403,
      user: null,
    };
  }

  return { error: null, user: auth.user };
}

module.exports = {
  COOKIE_NAME,
  signToken,
  verifyToken,
  hashPassword,
  comparePassword,
  getSessionUser,
  requireAuth,
  requireRole,
};
