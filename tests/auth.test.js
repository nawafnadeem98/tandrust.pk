const { test, describe } = require("node:test");
const assert = require("node:assert");
const { hashPassword, comparePassword, signToken, verifyToken } = require("../lib/auth");

describe("Authentication & Security Tests", () => {
  test("hashPassword produces valid bcrypt hash and comparePassword verifies it", async () => {
    const raw = "SecurePassword123!";
    const hash = await hashPassword(raw);

    assert.notStrictEqual(raw, hash);
    assert.strictEqual(typeof hash, "string");
    assert.strictEqual(hash.startsWith("$2"), true);

    const match = await comparePassword(raw, hash);
    assert.strictEqual(match, true);

    const wrongMatch = await comparePassword("WrongPassword123!", hash);
    assert.strictEqual(wrongMatch, false);
  });

  test("signToken generates valid signed JWT and verifyToken extracts payload", async () => {
    const payload = {
      id: "user-123",
      email: "test@tandrust.pk",
      role: "PATIENT",
    };

    const token = await signToken(payload);
    assert.strictEqual(typeof token, "string");

    const decoded = await verifyToken(token);
    assert.ok(decoded);
    assert.strictEqual(decoded.id, payload.id);
    assert.strictEqual(decoded.email, payload.email);
    assert.strictEqual(decoded.role, payload.role);
  });

  test("verifyToken rejects tampered or invalid token", async () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tampered.token";
    const decoded = await verifyToken(invalidToken);
    assert.strictEqual(decoded, null);
  });
});
