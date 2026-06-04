import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ ok: false, message: 'Manual auth is disabled.' }, { status: 410 });
}
