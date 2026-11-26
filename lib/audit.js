const { prisma } = require("./prisma");

async function logAudit({ userId = null, action, resource, details = null, ipAddress = null }) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        details: typeof details === "object" ? JSON.stringify(details) : details,
        ipAddress,
      },
    });
  } catch (err) {
    console.error("Audit log error:", err);
  }
}

module.exports = { logAudit };
