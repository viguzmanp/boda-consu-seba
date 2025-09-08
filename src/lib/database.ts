import Database from 'better-sqlite3';
import path from 'path';

// Crear la base de datos en la carpeta del proyecto
const dbPath = path.join(process.cwd(), 'invitations.db');
const db = new Database(dbPath);

// Crear tabla si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS invitations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('male', 'female', 'couple')),
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    sent_at DATETIME,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'viewed', 'confirmed'))
  )
`);

export interface Invitation {
  id?: number;
  name: string;
  type: 'male' | 'female' | 'couple';
  url: string;
  created_at?: string;
  sent_at?: string;
  status?: 'pending' | 'sent' | 'viewed' | 'confirmed';
}

export class InvitationDB {
  // Insertar una nueva invitación
  static create(invitation: Omit<Invitation, 'id' | 'created_at'>): Invitation {
    const stmt = db.prepare(`
      INSERT INTO invitations (name, type, url, status)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      invitation.name,
      invitation.type,
      invitation.url,
      invitation.status || 'pending'
    );
    
    return this.getById(result.lastInsertRowid as number)!;
  }

  // Obtener todas las invitaciones
  static getAll(): Invitation[] {
    const stmt = db.prepare('SELECT * FROM invitations ORDER BY created_at DESC');
    return stmt.all() as Invitation[];
  }

  // Obtener invitación por ID
  static getById(id: number): Invitation | null {
    const stmt = db.prepare('SELECT * FROM invitations WHERE id = ?');
    return stmt.get(id) as Invitation | null;
  }

  // Obtener invitación por nombre
  static getByName(name: string): Invitation | null {
    const stmt = db.prepare('SELECT * FROM invitations WHERE name = ?');
    return stmt.get(name) as Invitation | null;
  }

  // Actualizar estado de una invitación
  static updateStatus(id: number, status: Invitation['status'], sent_at?: string): boolean {
    const stmt = db.prepare(`
      UPDATE invitations 
      SET status = ?, sent_at = COALESCE(?, sent_at)
      WHERE id = ?
    `);
    
    const result = stmt.run(status, sent_at, id);
    return result.changes > 0;
  }

  // Eliminar una invitación
  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM invitations WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  // Obtener estadísticas
  static getStats() {
    const totalStmt = db.prepare('SELECT COUNT(*) as total FROM invitations');
    const sentStmt = db.prepare('SELECT COUNT(*) as sent FROM invitations WHERE status = "sent"');
    const viewedStmt = db.prepare('SELECT COUNT(*) as viewed FROM invitations WHERE status = "viewed"');
    const confirmedStmt = db.prepare('SELECT COUNT(*) as confirmed FROM invitations WHERE status = "confirmed"');
    
    return {
      total: (totalStmt.get() as any).total,
      sent: (sentStmt.get() as any).sent,
      viewed: (viewedStmt.get() as any).viewed,
      confirmed: (confirmedStmt.get() as any).confirmed,
    };
  }
}

export default db;
