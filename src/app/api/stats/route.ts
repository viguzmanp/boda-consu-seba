import { NextResponse } from 'next/server';
import { InvitationDB } from '@/lib/database';

export async function GET() {
  try {
    const stats = InvitationDB.getStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas' },
      { status: 500 }
    );
  }
}
