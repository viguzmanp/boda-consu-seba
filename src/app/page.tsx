// Indica que este componente debe ejecutarse en el navegador (client-side)
"use client";

// Importamos los hooks de React que necesitamos
import { useState, useEffect } from "react";
// Framer Motion para animaciones suaves
import { motion, AnimatePresence } from "framer-motion";
// Icono de menú hamburguesa de Lucide React
import { Menu } from "lucide-react";

export default function Home() {
  // Estado para controlar si el menú móvil está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  
  // Fecha y hora de la boda (2 de noviembre 2025 a las 12:30)
  const weddingDate = new Date("2025-11-02T12:30:00");
  
  // Estado para almacenar el tiempo restante hasta la boda
  const [timeLeft, setTimeLeft] = useState("");

  // useEffect: Se ejecuta cuando el componente se monta y crea un contador regresivo
  useEffect(() => {
    // Crear un timer que se ejecuta cada 1000ms (1 segundo)
    const timer = setInterval(() => {
      // Obtener el tiempo actual en milisegundos
      const now = new Date().getTime();
      // Calcular la diferencia entre la fecha de la boda y ahora
      const distance = weddingDate.getTime() - now;

      // Calcular tiempo restante en días, horas, minutos y segundos
      if (distance < 0) {
        // Si la fecha ya pasó, mostrar mensaje especial
        setTimeLeft("¡Ya comenzó el gran día!");
        clearInterval(timer); // Detener el contador
      } else {
        // Convertir milisegundos a días, horas, minutos y segundos
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Actualizar el estado con el tiempo formateado
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    // Función de limpieza: detener el timer cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []); // Array vacío significa que solo se ejecuta una vez al montar

  // Función para hacer scroll suave a una sección específica
  const scrollTo = (id: string) => {
    // Buscar el elemento por su ID y hacer scroll hacia él
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    // Cerrar el menú móvil después de navegar
    setIsOpen(false);
  };

  return (
    // Contenedor principal con fondo crema y texto gris oscuro
    <div className="bg-[#fffaf7] text-gray-800 relative">
      {/* Barra de navegación fija en la parte superior */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm shadow-md z-50 flex justify-between items-center px-6 py-4">
        {/* Logo/título principal con fuente personalizada "adelia" */}
        <h1 className="text-xl font-medium text-pink-600 cursor-pointer" style={{ fontFamily: "adelia" }} onClick={() => scrollTo("inicio")}>
          Consu & Seba
        </h1>

        {/* Menú de navegación para pantallas medianas y grandes (desktop) */}
        <nav className="hidden md:flex gap-6">
          <button onClick={() => scrollTo("inicio")} className="hover:text-pink-600">Inicio</button>
          <button onClick={() => scrollTo("informacion")} className="hover:text-pink-600">Información</button>
          <button onClick={() => scrollTo("confirmar")} className="bg-pink-600 text-white px-3 py-1 rounded-full hover:bg-pink-700">
            Confirmar asistencia
          </button>
        </nav>

        {/* Botón de menú hamburguesa solo visible en móviles */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      {/* Menú lateral móvil que se desliza desde la derecha */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}    // Comienza fuera de pantalla (derecha)
            animate={{ x: 0 }}          // Se anima hacia la posición normal
            exit={{ x: "100%" }}        // Sale hacia la derecha al cerrar
            transition={{ type: "spring", stiffness: 400, damping: 32 }} // Animación suave tipo resorte
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6"
          >
            {/* Botón para cerrar el menú */}
            <button onClick={() => setIsOpen(false)} className="self-end text-xl">✖</button>
            {/* Enlaces de navegación del menú móvil */}
            <button onClick={() => scrollTo("inicio")} className="py-2 text-lg">Inicio</button>
            <button onClick={() => scrollTo("informacion")} className="py-2 text-lg">Información</button>
            <button onClick={() => scrollTo("confirmar")} className="py-2 text-lg text-white bg-pink-600 rounded-full">Confirmar asistencia</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección principal (Hero) - Pantalla completa con imagen de fondo */}
      <section 
        id="inicio" 
        className="h-screen flex flex-col justify-center md:justify-end items-center text-center bg-cover relative pt-45 md:pt-0 md:pb-45"
        style={{
          backgroundImage: "url('/media/_CFP8919.jpg')",
          backgroundPosition: '35% center',
        }}
      >
        {/* Nombres de los novios con fuente personalizada "adelia" */}
        <h2
          className="text-5xl md:text-8xl font-bold text-white leading-loose text-center"
          style={{
            fontFamily: "adelia",
            textShadow: "2px 4px 16px rgba(0, 0, 0, 0.84)",
          }}
        >
          <span className="block md:inline">Consuelo y</span>
          <span className="block md:inline">Sebastián</span>
        </h2>
        {/* Fecha de la boda */}
        <p className="text-base md:text-2xl mt-2 text-center text-white" style={{ textShadow: "2px 4px 16px rgba(0, 0, 0, 0.84)" }}>2 de noviembre, 2025</p>
        {/* Texto de invitación con animación en la parte inferior */}
        <motion.p className="absolute bottom-10 text-xl italic text-gray-700">Estás invitado!</motion.p>
        
        <h3 className="text-2xl font-semibold mb-4">Faltan</h3>
        {/* Muestra el tiempo restante calculado por el useEffect */}
        <p className="text-3xl text-pink-600 font-bold">{timeLeft}</p>
      </section>

      {/* Sección del contador regresivo */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">Faltan</h3>
        {/* Muestra el tiempo restante calculado por el useEffect */}
        <p className="text-3xl text-pink-600 font-bold">{timeLeft}</p>
      </section>

      {/* Sección de información del evento */}
      <section id="informacion" className="py-16 px-6 md:px-20 bg-[#fff0f3]">
        <h2 className="text-3xl font-bold text-center text-pink-700">Información</h2>
        {/* Detalles del evento con iconos */}
        <div className="mt-6 text-center space-y-3">
          <p><b>📅 Fecha:</b> 2 de noviembre, 2025</p>
          <p><b>🕔 Hora:</b> 12:30 hrs</p>
          <p><b>📍 Lugar:</b> Centro de eventos Los Naranjos</p>
          <p><b>📖 Cronograma:</b> Ceremonia, cena y fiesta</p>
        </div>
        {/* Botón para agregar evento a Google Calendar */}
        <div className="flex justify-center mt-6">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio+Consuelo+y+Sebasti%C3%A1n&dates=20251102T153000Z/20251103T025900Z&details=Celebraci%C3%B3n+de+la+boda&location=Hacienda+Los+Naranjos"
            target="_blank"    // Abre en nueva pestaña
            rel="noopener noreferrer"  // Seguridad para enlaces externos
            className="bg-pink-600 text-white px-5 py-3 rounded-full hover:bg-pink-700"
          >
            📅 Agendar en Google Calendar
          </a>
        </div>
      </section>

      {/* Sección para confirmar asistencia */}
      <section id="confirmar" className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-pink-700">Confirmar asistencia</h2>
        <p className="mt-4">Por favor confirma tu asistencia llenando el formulario en el siguiente enlace:</p>
        {/* Enlace al formulario de confirmación (reemplazar con URL real) */}
        <a
          href="https://forms.gle/xxxxxxxx" // <-- reemplazar con link real
          target="_blank"    // Abre en nueva pestaña
          rel="noopener noreferrer"  // Seguridad para enlaces externos
          className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700"
        >
          Confirmar aquí
        </a>
      </section>

      {/* Pie de página */}
      <footer className="text-center py-6 bg-white text-gray-500 text-sm">
        Hecho con 💖 para Consu & Seba <br /> 
        <a
          href="https://instagram.com/tarjeteados"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-600 hover:underline"
        >
          @tarjeteados
        </a>, 2025
      </footer>
    </div>
  );
}
