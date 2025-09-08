"use client";

import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import Head from "next/head";
import Link from "next/link";

export default function InvitationGenerator() {
  const [name, setName] = useState("");
  const [type, setType] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

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
    const baseURL = typeof window !== 'undefined' ? window.location.origin : '';
    const params = new URLSearchParams();
    if (name) params.set('name', name);
    params.set('type', type);
    return `${baseURL}?${params.toString()}`;
  };

  // Copiar al portapapeles
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  // Limpiar campos
  const handleAdd = () => {
    setName("");
    setType("");
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
            
            {/* ...eliminado estadísticas... */}
          </div>

          {/* Formulario */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crear nueva invitación</h2>
            
            <div className="grid md:grid-cols-5 gap-4 mb-4">
              <div className="md:col-span-3">
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
              
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de invitado
                </label>
                <div className="flex gap-2">
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as 'male' | 'female' | 'couple')}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-900 bg-white"
                  >
                    <option value="" disabled>
                      Selecciona tipo
                    </option>
                    <option value="male">Hombre</option>
                    <option value="female">Mujer</option>
                    <option value="couple">Pareja</option>
                  </select>
                  <button
                    onClick={handleAdd}
                    disabled={loading || !name.trim() || !['male','female','couple'].includes(type)}
                    className="w-10 h-10 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 transition-colors flex items-center justify-center flex-shrink-0"
                    title="Limpiar campos"
                  >
                    <X size={16} />
                  </button>
                </div>
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
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <h3 className="font-medium text-gray-800 mb-2">URL generada:</h3>
              <input
                type="text"
                value={generateURL()}
                readOnly
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900"
              />
            </div>

            {/* Botón principal de copiar */}
            <div className="text-center">
              <button
                onClick={() => copyToClipboard(generateURL())}
                className="inline-flex items-center justify-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium min-w-[280px]"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied ? 'Copiado!' : 'Copiar al Portapapeles'}
              </button>
            </div>
          </div>

          {/* ...eliminado lista de invitados... */}
        </div>
      </div>
    </>
  );
}
