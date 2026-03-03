"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Users, CheckCircle, Quote } from "lucide-react"; // Troquei o Globe por Quote para a citação
import Navbar from "@/components/Navbar";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";

// COMPONENTE DE FUNDO DINÂMICO (Para dar vida às secções de fundo claro)
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc]">
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#113255]/10 blur-[120px]"
    />
    <motion.div
      animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#3a7d44]/15 blur-[120px]"
    />
  </div>
);

// As suas imagens reais do Imgur
const heroImages = [
  "https://i.imgur.com/wz6xHwK.jpeg",
  "https://i.imgur.com/JgU5KXO.jpeg",
  "https://i.imgur.com/YKMx6a4.jpeg",
  "https://i.imgur.com/3StocjA.jpeg",
  "https://i.imgur.com/4UBkLJM.jpeg",
  "https://i.imgur.com/GNv4wDa.jpeg",
  "https://i.imgur.com/8YoFRbu.jpeg",
];

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO SECTION COM CARROSSEL */}
      <div className="relative min-h-screen w-full overflow-hidden flex items-center">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Fundação Cantoná Impacto"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#113255]/90 via-[#113255]/50 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-white/30 shadow-lg">
              Desde 2024 • Transformando Vidas
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
              Acolher, Promover, <br /> Capacitar e Transformar
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
              Eliminando barreiras no apoio às comunidades vulneráveis de Moçambique através da filantropia estratégica e humanizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/trabalhos"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#113255] transition-all text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Conheça o Impacto <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- SECÇÃO MELHORADA: O CAMINHO DA AJUDA (Com Fundo Dinâmico e Glassmorphism) --- */}
      <section className="relative py-32 overflow-hidden">
        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#113255] tracking-tight">
              Como a sua ajuda chega ao destino
            </h2>
            <div className="w-24 h-1.5 bg-[#3a7d44] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Users className="w-10 h-10" />, title: "Identificação", desc: "Mapeamos as necessidades críticas de cada família e comunidade vulnerável." },
              { icon: <Truck className="w-10 h-10" />, title: "Logística Real", desc: "Garantimos o transporte seguro de todos os mantimentos até às zonas mais remotas." },
              { icon: <CheckCircle className="w-10 h-10" />, title: "Entrega Pessoal", desc: "A nossa equipa entrega pessoalmente, garantindo transparência e dignidade." }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="flex flex-col items-center text-center p-10 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/80 hover:shadow-[0_20px_40px_rgba(17,50,85,0.08)] transition-all group"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 text-[#3a7d44] rounded-3xl flex items-center justify-center mb-8 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] group-hover:scale-110 transition-transform duration-500">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#113255] mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO (GRELHA DE VÍDEOS/FOTOS) */}
      <ImpactSection />

      {/* --- SECÇÃO MELHORADA: CITAÇÃO DO FUNDADOR --- */}
      <section className="relative py-32 bg-[#113255] overflow-hidden">
        {/* Elementos decorativos de fundo para a citação */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3a7d44] rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-blob animation-delay-2000" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Quote className="w-16 h-16 text-[#d4af37] mx-auto mb-10 opacity-80" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight md:leading-snug px-4"
          >
            "A verdadeira filantropia não é apenas dar, mas criar condições para que as pessoas possam prosperar com autonomia."
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-12 mb-6 opacity-50" />
            <p className="font-bold text-[#d4af37] tracking-[0.2em] uppercase text-sm md:text-base">
              Alcides Viegas <span className="text-gray-400 font-normal ml-2 tracking-normal capitalize">— Fundador</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* DOAÇÕES (M-PESA / BANCO) */}
      <DonationSection />

      {/* --- FOOTER FINAL (Mantido como estava) --- */}
      <footer className="bg-[#113255] text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold">Fundação Cantoná</h3>
            <p className="text-gray-400 max-w-sm">
              Instituição moçambicana focada na transformação social através da filantropia estratégica e humanizada.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/sobre" className="hover:text-white">Sobre Nós</Link></li>
              <li><Link href="/trabalhos" className="hover:text-white">Impacto</Link></li>
              <li><Link href="/doar" className="hover:text-white">Doações</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contactos</h4>
            <p className="text-gray-400 text-sm">Maputo, Moçambique</p>
            <p className="text-gray-400 text-sm">+258 84 372 3482</p>
          </div>
        </div>
        <div className="mt-10 text-center text-gray-500 text-xs">
          © 2026 Fundação Cantoná. Todos os direitos reservados.
        </div>
      </footer>
    </main>
  );
}