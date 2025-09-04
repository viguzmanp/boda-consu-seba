"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const weddingDate = new Date("2025-11-02T17:00:00");
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = weddingDate.getTime() - now;

      if (distance < 0) {
        setTimeLeft("¡Ya comenzó el gran día!");
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <div className="font-serif bg-[#fffaf7] text-gray-800 relative">
      {/* Topbar */}
      <header className="fixed w-full bg-white shadow-md z-50 flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-pink-600 cursor-pointer" style={{ fontFamily: "Photograph Signature" }} onClick={() => scrollTo("inicio")}>
          💐 Consu & Seba
        </h1>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-6">
          <button onClick={() => scrollTo("inicio")} className="hover:text-pink-600">Inicio</button>
          <button onClick={() => scrollTo("informacion")} className="hover:text-pink-600">Información</button>
          <button onClick={() => scrollTo("confirmar")} className="bg-pink-600 text-white px-3 py-1 rounded-full hover:bg-pink-700">
            Confirmar asistencia
          </button>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu size={28} />
        </button>
      </header>

      {/* Side menu móvil */}
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 80 }}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 flex flex-col p-6"
        >
          <button onClick={() => setIsOpen(false)} className="self-end text-xl">✖</button>
          <button onClick={() => scrollTo("inicio")} className="py-2 text-lg">Inicio</button>
          <button onClick={() => scrollTo("informacion")} className="py-2 text-lg">Información</button>
          <button onClick={() => scrollTo("confirmar")} className="py-2 text-lg text-white bg-pink-600 rounded-full">Confirmar asistencia</button>
        </motion.div>
      )}

      {/* Hero Section */}
      <section id="inicio" className="h-screen flex flex-col justify-center items-center text-center bg-[url('/flores-bg.jpg')] bg-cover bg-center relative">
        <div className="bg-white/70 p-6 rounded-2xl shadow-lg">
          <h2 className="text-4xl md:text-6xl font-bold text-pink-700" style={{ fontFamily: "Photograph Signature" }}>Consuelo y Sebastián</h2>
          <p className="text-lg md:text-2xl mt-2">2 de noviembre, 2025</p>
        </div>
        <motion.p className="absolute bottom-10 text-xl italic text-gray-700">Estás invitado!</motion.p>
      </section>

      {/* Contador */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-semibold mb-4">Faltan</h3>
        <p className="text-3xl text-pink-600 font-bold">{timeLeft}</p>
      </section>

      {/* Información */}
      <section id="informacion" className="py-16 px-6 md:px-20 bg-[#fff0f3]">
        <h2 className="text-3xl font-bold text-center text-pink-700">Información</h2>
        <div className="mt-6 text-center space-y-3">
          <p><b>📅 Fecha:</b> 2 de noviembre, 2025</p>
          <p><b>🕔 Hora:</b> 17:00 hrs</p>
          <p><b>📍 Lugar:</b> Centro de eventos Los Naranjos</p>
          <p><b>📖 Cronograma:</b> Ceremonia, cena y fiesta</p>
        </div>
        <div className="flex justify-center mt-6">
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Matrimonio+Consuelo+y+Sebasti%C3%A1n&dates=20251102T200000Z/20251103T030000Z&details=Celebraci%C3%B3n+de+la+boda&location=Centro+de+eventos+Los+Naranjos"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 text-white px-5 py-3 rounded-full hover:bg-pink-700"
          >
            📅 Agendar en Google Calendar
          </a>
        </div>
      </section>

      {/* Confirmar asistencia */}
      <section id="confirmar" className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold text-pink-700">Confirmar asistencia</h2>
        <p className="mt-4">Por favor confirma tu asistencia llenando el formulario en el siguiente enlace:</p>
        <a
          href="https://forms.gle/xxxxxxxx" // <-- reemplazar con link real
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block bg-pink-600 text-white px-6 py-3 rounded-full hover:bg-pink-700"
        >
          Confirmar aquí
        </a>
      </section>

      <footer className="text-center py-6 bg-white text-gray-500 text-sm">
        Hecho con 💖 para Consu & Seba
      </footer>
    </div>
  );
}
