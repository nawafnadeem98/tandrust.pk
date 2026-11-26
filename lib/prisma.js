const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// tandrust.pk is Punjab-only: facility lists never return other provinces.
const facFilter = (args) => { args.where = { AND: [args.where || {}, { province: "Punjab" }] }; return args; };
const provFilter = (args) => {
  args.where = { AND: [args.where || {}, { OR: [{ facilityId: null }, { facility: { province: "Punjab" } }] }, { province: "Punjab" }] };
  return args;
};
const punjabOnly = prisma.$extends({
  query: {
    facility: {
      findMany({ args, query }) { return query(facFilter(args)); },
      findFirst({ args, query }) { return query(facFilter(args)); },
      count({ args, query }) { return query(facFilter(args)); },
    },
    provider: {
      findMany({ args, query }) { return query(provFilter(args)); },
      findFirst({ args, query }) { return query(provFilter(args)); },
      count({ args, query }) { return query(provFilter(args)); },
    },
  },
});

// If the database is not configured/reachable, READ queries return empty results instead of crashing the page.
// Nothing is faked: lists are simply empty and a banner (components/layout/DbNotice.jsx) explains the fix.
// Writes (create/update/delete) still throw so no data is silently lost.
const isDbConfigError = (e) =>
  !!e && (e.name === "PrismaClientInitializationError" ||
    /Environment variable not found|DATABASE_URL|Can't reach database server|P1000|P1001|P1003/.test(String(e.message)));
const READ_FALLBACK = { findMany: [], findFirst: null, findUnique: null, count: 0, aggregate: {}, groupBy: [] };
const safe = punjabOnly.$extends({
  query: {
    $allModels: {
      async $allOperations({ operation, args, query }) {
        try {
          return await query(args);
        } catch (e) {
          if (operation in READ_FALLBACK && isDbConfigError(e)) {
            if (!globalThis.__tpDbWarned) {
              globalThis.__tpDbWarned = true;
              console.error("[tandrust.pk] Database is not connected. Set DATABASE_URL in .env (see README). Lists stay empty until then.");
            }
            return READ_FALLBACK[operation];
          }
          throw e;
        }
      },
    },
  },
});

module.exports = { prisma: safe };
