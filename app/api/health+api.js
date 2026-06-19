// Expo Router API route (simple backend). GET /api/health
// Deployed with the app via EAS Hosting. (ARCHITECTURE.md §1 "Backend - simple")
export function GET() {
  return Response.json({ ok: true, service: 'new-app', ts: Date.now() });
}
