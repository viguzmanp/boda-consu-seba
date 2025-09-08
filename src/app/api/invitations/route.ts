import { NextRequest, NextResponse } from 'next/server';
import { InvitationDB, Invitation } from '@/lib/database';

export async function GET() {
  try {
    const invitations = InvitationDB.getAll();
    return NextResponse.json(invitations);
  } catch (error) {
    console.error('Error fetching invitations:', error);
    return NextResponse.json(
      { error: 'Error al obtener las invitaciones' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, url } = body;

    if (!name || !type || !url) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: name, type, url' },
        { status: 400 }
      );
    }

    // Verificar si ya existe una invitación con ese nombre
    const existing = InvitationDB.getByName(name);
    if (existing) {
      return NextResponse.json(
        { error: 'Ya existe una invitación para esta persona' },
        { status: 409 }
      );
    }

    const invitation = InvitationDB.create({
      name,
      type: type as 'male' | 'female' | 'couple',
      url,
      status: 'pending'
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error('Error creating invitation:', error);
    return NextResponse.json(
      { error: 'Error al crear la invitación' },
      { status: 500 }
    );
  }
}
