"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowRight, Truck, Users, CheckCircle, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";

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
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-white/30">
              Desde 2024 • Transformando Vidas
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Acolher, Promover, <br /> Capacitar e Transformar
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
              Eliminando barreiras no apoio às comunidades vulneráveis de Moçambique através da filantropia estratégica e humanizada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <Link
                href="/trabalhos"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#113255] transition-all text-lg"
              >
                Conheça o Impacto <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- NOVA SECÇÃO: O CAMINHO DA AJUDA --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-[#113255]">Como a sua ajuda chega ao destino</h2>
            <div className="w-24 h-2 bg-[#3a7d44] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Users className="w-10 h-10" />, title: "Identificação", desc: "Mapeamos as necessidades críticas de cada família e comunidade vulnerável." },
              { icon: <Truck className="w-10 h-10" />, title: "Logística Real", desc: "Garantimos o transporte seguro de todos os mantimentos até às zonas mais remotas." },
              { icon: <CheckCircle className="w-10 h-10" />, title: "Entrega Pessoal", desc: "A nossa equipa entrega pessoalmente, garantindo transparência e dignidade." }
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[32px] shadow-lg border border-gray-100 text-center space-y-4"
              >
                <div className="w-20 h-20 bg-[#f8fafc] text-[#3a7d44] rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-[#113255]">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO (GRELHA DE VÍDEOS/FOTOS) */}
      <ImpactSection />

      {/* --- NOVA SECÇÃO: CITAÇÃO DO FUNDADOR --- */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Globe className="w-12 h-12 text-[#d4af37] mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl md:text-5xl font-serif italic text-[#113255] leading-relaxed">
            "A verdadeira filantropia não é apenas dar, mas criar condições para que as pessoas possam prosperar com autonomia."
          </h2>
          <p className="mt-8 font-bold text-[#3a7d44] tracking-widest uppercase text-sm">— Alcides Viegas, Fundador</p>
        </div>
      </section>

      {/* DOAÇÕES (M-PESA / BANCO) */}
      <DonationSection />

      {/* --- FOOTER FINAL --- */}
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