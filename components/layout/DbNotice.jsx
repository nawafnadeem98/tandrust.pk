// Server component: tells the site owner when the database is not configured.
export default function DbNotice() {
  if (process.env.DATABASE_URL) return null;
  return (
    <div role="alert" className="bg-amber-100 text-amber-950 text-sm px-4 py-2 text-center border-b border-amber-300">
      Setup needed: <code className="font-bold">DATABASE_URL</code> is not set, so doctor, hospital and article lists cannot load yet.
      Run <code className="font-bold">npm run setup</code> and follow the README (“Database setup”).
    </div>
  );
}
