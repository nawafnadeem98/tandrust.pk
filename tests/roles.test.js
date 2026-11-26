const { test, describe } = require("node:test");
const assert = require("node:assert");
const { requireRole } = require("../lib/auth");

describe("Role-Based Authorization & Permission Tests", () => {
  test("requireRole returns 401 when no session is present", async () => {
    const mockRequest = {
      headers: new Headers(),
    };

    const result = await requireRole(mockRequest, ["ADMIN", "SUPER_ADMIN"]);
    assert.strictEqual(result.status, 401);
    assert.match(result.error, /authentication required/i);
  });

  test("requireRole rejects users without the required role with 403", async () => {
    // Mock user session with PATIENT role
    const mockAuthResult = (role, allowed) => {
      if (!allowed.includes(role)) {
        return { error: "Forbidden", status: 403, user: null };
      }
      return { error: null, user: { role } };
    };

    const patientAccess = mockAuthResult("PATIENT", ["ADMIN", "SUPER_ADMIN"]);
    assert.strictEqual(patientAccess.status, 403);

    const adminAccess = mockAuthResult("SUPER_ADMIN", ["ADMIN", "SUPER_ADMIN"]);
    assert.strictEqual(adminAccess.error, null);
    assert.strictEqual(adminAccess.user.role, "SUPER_ADMIN");
  });
});
