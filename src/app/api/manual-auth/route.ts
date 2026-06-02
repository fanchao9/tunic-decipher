export async function POST(request: Request) {
  const { password } = await request.json();
  const expectedPassword = process.env.MANUAL_ADMIN_PASSWORD || 'tunic';

  return Response.json({ ok: password === expectedPassword });
}
