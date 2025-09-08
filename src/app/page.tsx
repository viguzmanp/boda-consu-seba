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

  // Estados para personalización de invitación
  const [guestName, setGuestName] = useState("");
  const [guestType, setGuestType] = useState<'male' | 'female' | 'couple'>('male');

  // useEffect: Se ejecuta cuando el componente se monta y crea un contador regresivo
  useEffect(() => {
    // Leer parámetros de URL para personalización
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const type = urlParams.get('type') as 'male' | 'female' | 'couple';
    
    if (name) {
      setGuestName(name);
    }
    
    if (type && ['male', 'female', 'couple'].includes(type)) {
      setGuestType(type);
    }

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

  // Función para generar el mensaje personalizado de invitación
  const getPersonalizedMessage = () => {
    const namePart = guestName ? ` ${guestName}` : "";
    
    switch (guestType) {
      case 'male':
        return {
          greeting: `${namePart}`,
          title: "¡Estás Invitado!",
          message: "¡Nos encantaría que seas parte de este momento tan especial para nosotros!"
        };
      case 'female':
        return {
          greeting: `${namePart}`,
          title: "¡Estás Invitada!",
          message: "¡Nos encantaría que seas parte de este momento tan especial para nosotros!"
        };
      case 'couple':
        return {
          greeting: `${namePart}`,
          title: "¡Están Invitados!",
          message: "¡Nos encantaría que sean parte de este momento tan especial para nosotros!"
        };
      default:
        return {
          greeting: guestName ? `${guestName}` : "",
          title: "¡Estás Invitado!",
          message: "¡Nos encantaría que seas parte de este momento tan especial para nosotros!"
        };
    }
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
          <button onClick={() => scrollTo("invitacion")} className="hover:text-pink-600">Invitación</button>
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
            <button onClick={() => scrollTo("invitacion")} className="py-2 text-lg">Invitación</button>
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
        <p className="text-base md:text-2xl mt-8 text-center text-white" style={{ textShadow: "2px 4px 16px rgba(0, 0, 0, 0.84)" }}>2 de noviembre, 2025</p>
        
        {/* Contador regresivo en recuadro semi-transparente */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/40 backdrop-blur-sm rounded-2xl p-2 md:p-4 shadow-lg w-64 md:w-80">
          <h3 className="text-xl md:text-2xl font-semibold mb-0.5 text-gray-900 text-center">Faltan</h3>
          <p className="text-2xl md:text-3xl text-pink-600 font-bold text-center">{timeLeft}</p>
        </div>
      </section>

      {/* Sección de invitación */}
      <section 
        id="invitacion" 
        className="h-screen py-16 px-6 md:px-20 bg-repeat relative"
        style={{
          backgroundImage: "url('/media/pattern.jpg')",
          backgroundSize: "600px 600px",
        }}
      >
        {/* Overlay semi-transparente para mejor legibilidad */}
        <div className="absolute inset-0 bg-orange-300/80"></div>

        {/* Sombra en la parte superior */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

        {/* Sombra en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-7 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

        {/* Contenido de la sección */}
        <div className="relative z-10 mt-12">
          {/* Cita bíblica */}
          <blockquote className="text-center max-w-lg mx-auto mb-12 relative px-4">
            {/* Óvalo de luz blanca */}
            <div className="absolute inset-2 bg-orange-100/70 rounded-full blur-sm scale-105 opacity-80"></div>
            <div className="absolute inset-1 bg-white/60 rounded-full blur-md scale-110 opacity-60"></div>
            <div className="absolute inset-0 bg-white/40 rounded-full blur-lg scale-115 opacity-40"></div>
            
            {/* Contenido de la cita */}
            <div className="relative z-10 px-6 md:px-8 py-6 mb-30">
              <p className="text-base md:text-lg italic text-orange-600 font-light leading-normal mb-2">
                &ldquo;Uno solo puede ser vencido, pero dos podrán resistir. Y además, la cuerda de tres hilos no se rompe fácilmente.&rdquo;
              </p>
              <cite className="text-xs md:text-sm text-orange-700 font-medium">Eclesiastés 4:12</cite>
            </div>
          </blockquote>

          {/* Título y mensaje de invitación */}
          {getPersonalizedMessage().greeting && (
            <p className="text-center text-xl md:text-3xl text-grey-900 italic">
              {getPersonalizedMessage().greeting}
            </p>
          )}
          <h2
            className="text-3xl md:text-8xl font-semibold text-amber-900 leading-loose text-center mt-4"
            style={{
              fontFamily: "adelia",
              textShadow: "2px 2px 5px rgba(255, 255, 255, 0.32)",
            }}
          >
            <span className="block md:inline">{getPersonalizedMessage().title}</span>
          </h2>
          <p className="mt-4 text-center text-sm md:text-xl text-grey-900">
            {getPersonalizedMessage().message}
          </p>
        </div>
        {/* Botón para agregar evento a Google Calendar */}
          <div className="flex justify-center absolute bottom-20 left-0 right-0">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio+Consuelo+y+Sebasti%C3%A1n&dates=20251102T153000Z/20251103T025900Z&details=Celebraci%C3%B3n+de+la+boda&location=Hacienda+Los+Naranjos"
              target="_blank"    // Abre en nueva pestaña
              rel="noopener noreferrer"  // Seguridad para enlaces externos
              className="bg-orange-600 text-white px-5 py-3 rounded-full hover:bg-orange-800"
            >
              📅 Agendar en Google Calendar
            </a>
            </div>
      </section>

      {/* Sección de información del evento */}
      <section id="informacion" className="min-h-screen py-16 px-6 md:px-20 bg-[#fff0f3]">
        
        {/* Grid de información - 2x2 */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          
          {/* Mapa */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Ubicación</h3>
            <div className="w-full h-32 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3320.3445200101987!2d-70.7320711133196!3d-33.674142304462165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966320a82211b543%3A0xd22ecaa048bc51a8!2sHacienda%20Los%20Naranjos!5e0!3m2!1sen!2scl!4v1757357865198!5m2!1sen!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación del evento"
              ></iframe>
            </div>
          </div>

          {/* Lista de regalos */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎁</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lista de Regalos</h3>
            <p className="text-gray-600 mb-6">
              Tu presencia es nuestro mejor regalo, pero si deseas obsequiarnos algo, puedes encontrar nuestra lista aquí.
            </p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700 transition-colors"
            >
              Ver Lista de Regalos
            </a>
          </div>

          {/* Dress Code */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">👔</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Dress Code</h3>
            <p className="text-gray-600 mb-2">
              <strong>Formal / Cocktail</strong>
            </p>
            <p className="text-gray-600 text-sm">
              Sugerimos evitar el color blanco y tonos muy claros. ¡Queremos que te sientas cómodo y elegante!
            </p>
          </div>

          {/* Horario */}
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Horario</h3>
            <div className="text-gray-600 space-y-2">
              <p><strong>12:30 hrs</strong> - Ceremonia</p>
              <p><strong>13:30 hrs</strong> - Cocktail</p>
              <p><strong>15:00 hrs</strong> - Almuerzo</p>
              <p><strong>17:00 hrs</strong> - Fiesta</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Sección para confirmar asistencia */}
      <section id="confirmar" className="h-screen py-8 px-6 md:px-20 flex flex-col justify-center items-center text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-regular text-pink-700 mb-6 leading-loose" style={{ fontFamily: "adelia" }}>
            ¿Qué esperas para vernos ese día?
          </h2>
          <p className="text-sm md:text-lg text-gray-700 mb-8 leading-relaxed">
            Tu confirmación es muy importante para que podamos esperarte como mereces.<br />
            ¡Completa este formulario y acompáñanos en esta gran aventura!
          </p>
          {/* Enlace al formulario de confirmación */}
          <a
            href="https://forms.gle/2DWRcbDWdTdCbXjx8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-pink-600 text-white px-12 py-4 rounded-full hover:bg-pink-700 transition-colors text-xl font-semibold shadow-lg"
          >
            Confirmar Asistencia
          </a>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="text-center py-5 bg-pink-900 text-white text-sm relative">
        {/* Sombra interior en la parte superior */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10 leading-relaxed">
          Hecho con 🧡 para Consu y Seba <br /> 
          <a
            href="https://instagram.com/tarjeteados"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-300 hover:underline"
          >
            @tarjeteados
          </a>, 2025
        </div>
      </footer>
    </div>
  );
}
