import { NextRequest, NextResponse } from 'next/server';
import { InvitationDB } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Buscar la invitación por nombre
    const invitation = InvitationDB.getByName(name);
    
    if (!invitation) {
      return NextResponse.json(
        { error: 'Invitation not found' },
        { status: 404 }
      );
    }

    // Solo actualizar si no ha sido vista o confirmada
    if (invitation.status === 'pending' || invitation.status === 'sent') {
      InvitationDB.updateStatus(invitation.id!, 'viewed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking view:', error);
    return NextResponse.json(
      { error: 'Error tracking view' },
      { status: 500 }
    );
  }
}
