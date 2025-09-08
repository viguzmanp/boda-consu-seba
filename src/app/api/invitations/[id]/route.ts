import { NextRequest, NextResponse } from 'next/server';
import { InvitationDB } from '@/lib/database';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    const body = await request.json();
    const { status, sent_at } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status es requerido' },
        { status: 400 }
      );
    }

    const updated = InvitationDB.updateStatus(id, status, sent_at);
    
    if (!updated) {
      return NextResponse.json(
        { error: 'Invitación no encontrada' },
        { status: 404 }
      );
    }

    const invitation = InvitationDB.getById(id);
    return NextResponse.json(invitation);
  } catch (error) {
    console.error('Error updating invitation:', error);
    return NextResponse.json(
      { error: 'Error al actualizar la invitación' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await params;
    const id = parseInt(idString);
    const deleted = InvitationDB.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Invitación no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Invitación eliminada' });
  } catch (error) {
    console.error('Error deleting invitation:', error);
    return NextResponse.json(
      { error: 'Error al eliminar la invitación' },
      { status: 500 }
    );
  }
}
