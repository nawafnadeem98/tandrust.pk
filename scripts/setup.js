// npm run setup : creates .env from .env.example (if missing) and reports what is still needed.
const fs = require("fs");
if (!fs.existsSync(".env")) { fs.copyFileSync(".env.example", ".env"); console.log("Created .env from .env.example"); }
const env = {};
fs.readFileSync(".env", "utf8").split(/\r?\n/).forEach((l) => { const m = l.match(/^([A-Z_]+)=(.*)$/); if (m) env[m[1]] = m[2].split("#")[0].trim(); });
const need = [
  ["DATABASE_URL", "Postgres connection string (free: neon.tech). Required for doctors, hospitals, labs, articles."],
  ["JWT_SECRET", "Any long random text. Required for login."],
  ["AI_API_KEY", "Key for the AI assistant (optional, e.g. Gemini from aistudio.google.com)."],
];
need.forEach(([k, why]) => console.log((env[k] ? "OK      " : "MISSING ") + k + "  - " + why));
console.log("\nNext: put the missing values in .env, then run:\n  npx prisma generate\n  npx prisma db push\n  npm run prisma:seed\n  npm run dev");
