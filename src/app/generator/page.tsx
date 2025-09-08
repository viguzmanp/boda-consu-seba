"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Trash2, Eye, Send, CheckCircle } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

interface Invitation {
  id?: number;
  name: string;
  type: 'male' | 'female' | 'couple';
  url: string;
  created_at?: string;
  sent_at?: string;
  status?: 'pending' | 'sent' | 'viewed' | 'confirmed';
}

export default function InvitationGenerator() {
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [guestList, setGuestList] = useState<Invitation[]>([]);
  const [stats, setStats] = useState({ total: 0, sent: 0, viewed: 0, confirmed: 0 });

  // Cargar invitaciones al montar el componente
  useEffect(() => {
    loadInvitations();
    loadStats();
  }, []);

  // Cargar invitaciones desde la base de datos
  const loadInvitations = async () => {
    try {
      const response = await fetch('/api/invitations');
      if (response.ok) {
        const invitations = await response.json();
        setGuestList(invitations);
      }
    } catch (error) {
      console.error('Error cargando invitaciones:', error);
    }
  };

  // Cargar estadísticas
  const loadStats = async () => {
    try {
      const response = await fetch('/api/stats');
      if (response.ok) {
        const statistics = await response.json();
        setStats(statistics);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  };

  // Generar el texto personalizado de invitación
  const generateInvitationText = (name: string, type: 'male' | 'female' | 'couple') => {
    const namePart = name ? ` ${name}` : "";
    
    switch (type) {
      case 'male':
        return `¡${namePart}, estás cordialmente invitado a celebrar con nosotros!`;
      case 'female':
        return `¡${namePart}, estás cordialmente invitada a celebrar con nosotros!`;
      case 'couple':
        return `¡${namePart}, están cordialmente invitados a celebrar con nosotros!`;
      default:
        return `¡Estás cordialmente invitado a celebrar con nosotros!`;
    }
  };

  // Generar la URL personalizada
  const generateURL = () => {
    const baseURL = window.location.origin;
    const params = new URLSearchParams();
    
    if (name) params.set('name', name);
    params.set('type', type);
    
    return `${baseURL}?${params.toString()}`;
  };

  // Copiar al portapapeles
  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Agregar nueva invitación a la base de datos
  const addGuest = async () => {
    if (!name.trim()) return;
  if (!name.trim() || !['male','female','couple'].includes(type)) return;
    setLoading(true);
    try {
      const url = generateURL();
      const response = await fetch('/api/invitations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          type,
          url,
        }),
      });

      if (response.ok) {
        setName("");
        await loadInvitations();
        await loadStats();
      } else {
        const error = await response.json();
        alert(error.error || 'Error al crear la invitación');
      }
    } catch (error) {
      console.error('Error al agregar invitación:', error);
      alert('Error al agregar la invitación');
    } finally {
      setLoading(false);
    }
  };

  // Eliminar invitación
  const removeGuest = async (id: number) => {
    try {
      const response = await fetch(`/api/invitations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadInvitations();
        await loadStats();
      } else {
        alert('Error al eliminar la invitación');
      }
    } catch (error) {
      console.error('Error al eliminar invitación:', error);
      alert('Error al eliminar la invitación');
    }
  };

  // Actualizar estado de invitación
  const updateStatus = async (id: number, status: Invitation['status']) => {
    try {
      const response = await fetch(`/api/invitations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          sent_at: status === 'sent' ? new Date().toISOString() : undefined,
        }),
      });

      if (response.ok) {
        await loadInvitations();
        await loadStats();
      } else {
        alert('Error al actualizar el estado');
      }
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      alert('Error al actualizar el estado');
    }
  };

  return (
    <>
      <Head>
        <title>Generador de Invitaciones</title>
      </Head>
  <div className="min-h-screen py-16 px-6 md:px-20 bg-repeat relative"
          style={{
            backgroundImage: "url('/media/pattern.jpg')",
            backgroundSize: "600px 600px",
          }}>
        <div className="absolute inset-0 bg-orange-300/40 backdrop-blur-sm"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-bold text-orange-900 mb-2 mt-8 leading-loose" style={{ fontFamily: "adelia" }}>
              Generador de Invitaciones
            </h1>
            <p className="text-gray-600">Crea enlaces personalizados para cada invitado</p>
            <Link href="/" className="text-orange-800 hover:underline mt-2 inline-block">
              ← Volver a la invitación
            </Link>
            
            {/* Estadísticas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-blue-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-blue-800">{stats.total}</div>
                <div className="text-sm text-blue-600">Total</div>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-green-800">{stats.sent}</div>
                <div className="text-sm text-green-600">Enviadas</div>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-yellow-800">{stats.viewed}</div>
                <div className="text-sm text-yellow-600">Vistas</div>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <div className="text-2xl font-bold text-purple-800">{stats.confirmed}</div>
                <div className="text-sm text-purple-600">Confirmadas</div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear nueva invitación</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del invitado
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Juan, Ana, Juan y María"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de invitado
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as 'male' | 'female' | 'couple')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 bg-white"
                >
                  <option value="" disabled>
                    Selecciona tipo
                  </option>
                  <option value="male">Hombre</option>
                  <option value="female">Mujer</option>
                  <option value="couple">Pareja</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={addGuest}
                  disabled={loading || !name.trim() || !['male','female','couple'].includes(type)}
                  className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Guardando...' : 'Agregar a la lista'}
                </button>
              </div>
            </div>

            {/* Vista previa */}
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h3 className="font-medium text-gray-800 mb-2">Vista previa del mensaje:</h3>
              <p className="text-gray-700 italic">
                {['male','female','couple'].includes(type) 
                  ? generateInvitationText(name, type as 'male' | 'female' | 'couple')
                  : 'Selecciona tipo de invitado para ver el mensaje'}
              </p>
            </div>

            {/* URL generada */}
            <div className="bg-blue-50 p-4 rounded-md">
              <h3 className="font-medium text-gray-800 mb-2">URL generada:</h3>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={generateURL()}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
                />
                <button
                  onClick={() => copyToClipboard(generateURL(), -1)}
                  className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {copiedIndex === -1 ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Lista de invitados */}
          {guestList.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Lista de invitados ({guestList.length})
              </h2>
              
              <div className="space-y-4">
                {guestList.map((guest) => (
                  <div key={guest.id} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-800">{guest.name}</span>
                          <span className="px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                            {guest.type === 'male' ? 'Hombre' : guest.type === 'female' ? 'Mujer' : 'Pareja'}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            guest.status === 'pending' ? 'bg-gray-100 text-gray-800' :
                            guest.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                            guest.status === 'viewed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {guest.status === 'pending' ? 'Pendiente' :
                             guest.status === 'sent' ? 'Enviada' :
                             guest.status === 'viewed' ? 'Vista' : 'Confirmada'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {generateInvitationText(guest.name, guest.type)}
                        </p>
                        <div className="text-xs text-gray-500">
                          Creada: {new Date(guest.created_at!).toLocaleDateString()}
                          {guest.sent_at && ` • Enviada: ${new Date(guest.sent_at).toLocaleDateString()}`}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        {/* Botones de estado */}
                        <div className="flex gap-1">
                          {guest.status === 'pending' && (
                            <button
                              onClick={() => updateStatus(guest.id!, 'sent')}
                              className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                              title="Marcar como enviada"
                            >
                              <Send size={14} />
                            </button>
                          )}
                          {(guest.status === 'sent' || guest.status === 'pending') && (
                            <button
                              onClick={() => updateStatus(guest.id!, 'viewed')}
                              className="p-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                              title="Marcar como vista"
                            >
                              <Eye size={14} />
                            </button>
                          )}
                          {guest.status !== 'confirmed' && (
                            <button
                              onClick={() => updateStatus(guest.id!, 'confirmed')}
                              className="p-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                              title="Marcar como confirmada"
                            >
                              <CheckCircle size={14} />
                            </button>
                          )}
                        </div>
                        
                        {/* Botones de acción */}
                        <div className="flex gap-1">
                          <button
                            onClick={() => copyToClipboard(guest.url, guest.id!)}
                            className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                            title="Copiar enlace"
                          >
                            {copiedIndex === guest.id ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                          <button
                            onClick={() => removeGuest(guest.id!)}
                            className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Botón para copiar todas las URLs */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    const allURLs = guestList.map(guest => 
                      `${guest.name}: ${guest.url}`
                    ).join('\n');
                    copyToClipboard(allURLs, 999);
                  }}
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  {copiedIndex === 999 ? '✓ Copiado' : 'Copiar todas las URLs'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
