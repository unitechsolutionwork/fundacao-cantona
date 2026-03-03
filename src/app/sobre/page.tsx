"use client";

import { motion } from "framer-motion";
import { Target, Eye, Shield, Users } from "lucide-react";
import Navbar from "@/components/Navbar";

// Dados do Conselho de Administração
const boardMembers = [
  {
    name: "Alcides Viegas",
    role: "Presidente do Conselho de Administração",
    image: "https://i.imgur.com/a0f1U8d.png",
  },
  {
    name: "Nome do Administrador",
    role: "Administrador Executivo",
    image: "https://i.imgur.com/OLgB5QD.png",
  },
  {
    name: "Nome do Administrador",
    role: "Administrador Não-Executivo",
    image: "https://i.imgur.com/Q3okLx3.png",
  },
];

// Dados Completos dos Parceiros
const partners = [
  { name: "RUR Energia", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=RUR+Energia" },
  { name: "Noble Group SA", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Noble+Group" },
  { name: "Auaga", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Auaga" },
  { name: "Investimentos Imobiliários", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Investimentos" },
  { name: "WS Holding, Lda.", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=WS+Holding" },
  { name: "Agrico Marketing", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Agrico" },
  { name: "1 Segurança", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=1+Segurança" },
  { name: "CLM (Corredor Logístico)", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=CLM" },
  { name: "One Million Holding", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=One+Million" },
  { name: "Fast Group", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Fast+Group" },
  { name: "Microbanco Sólido", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Sólido" },
  { name: "AM Creative Studios", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=AM+Creative" },
  { name: "Cacos", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Cacos" },
  { name: "Alex", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Alex" },
  { name: "Horizonte", logo: "https://via.placeholder.com/200x100/ffffff/000000?text=Horizonte" }
];

export default function Sobre() {
  // Variáveis de animação
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut" as const, // <- CORRIGIDO
      },
    }),
  };

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Navbar sobreposto */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* --- HERO BANNER DA HISTÓRIA --- */}
      <div className="relative min-h-[75vh] w-full overflow-hidden flex flex-col items-center justify-center text-center -mt-28 pt-32 pb-20 z-10">
        <img
          src="https://i.imgur.com/GNv4wDa.jpeg"
          className="absolute inset-0 w-full h-full object-cover -z-20"
          alt="Equipa da Fundação Cantoná"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/90 via-[#113255]/75 to-[#113255]/95 -z-10" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/20 shadow-lg mb-8"
          >
            <Users className="w-4 h-4 text-[#d4af37]" /> Nossa História
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-xl"
          >
            Transformando Vidas <br className="hidden md:block" />
            <span className="text-[#3a7d44]">Através da Filantropia</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto drop-shadow-md"
          >
            <p>
              A Fundação Cantoná nasceu da visão do empresário moçambicano <strong className="text-white">Alcides Viegas</strong>. Com um compromisso inabalável com as comunidades mais vulneráveis, representamos uma nova era de solidariedade organizada.
            </p>
            <div className="pt-6">
              <p className="italic text-2xl text-[#d4af37] font-serif font-light leading-relaxed">
                "A verdadeira filantropia é sobre construir pontes, não apenas oferecer ajuda temporária."
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- SECÇÃO MISSÃO, VISÃO E VALORES --- */}
      <section className="relative py-24 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center -mt-32">

            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[32px] shadow-xl border border-gray-100 flex flex-col items-center transition-transform"
            >
              <div className="w-20 h-20 bg-[#f8fafc] text-[#3a7d44] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-gray-50">
                <Target className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#113255] mb-4">Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Eliminar barreiras no acesso a recursos essenciais e promover o desenvolvimento sustentável das comunidades vulneráveis.
              </p>
            </motion.div>

            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-[#113255] p-10 rounded-[32px] shadow-xl border border-[#1a4b80] flex flex-col items-center transition-transform"
            >
              <div className="w-20 h-20 bg-white/10 text-[#d4af37] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white/5">
                <Eye className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Visão</h3>
              <p className="text-gray-300 leading-relaxed">
                Ser a referência nacional em filantropia estratégica, capacitando indivíduos para a autonomia e dignidade plena.
              </p>
            </motion.div>

            <motion.div
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
              className="bg-white p-10 rounded-[32px] shadow-xl border border-gray-100 flex flex-col items-center transition-transform"
            >
              <div className="w-20 h-20 bg-[#f8fafc] text-[#113255] rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-gray-50">
                <Shield className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-[#113255] mb-4">Valores</h3>
              <p className="text-gray-600 leading-relaxed">
                Transparência, inovação social, respeito pela dignidade humana e compromisso com resultados duradouros.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECÇÃO PARCEIROS (COM SCROLL ANIMADO) --- */}
      <section className="py-20 bg-[#f8fafc] overflow-hidden border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-black text-[#113255] tracking-tight mb-4">
              Juntos Somos Mais Fortes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto italic font-medium">
              "Onde existem irmãos a necessitar por ajuda, é nossa obrigação e dever sermos solidários. Vamos trabalhar."
            </p>
          </motion.div>
        </div>

        {/* Carrossel de Parceiros Animado via Framer Motion */}
        <div className="relative w-full flex overflow-hidden">
          {/* Sombras laterais para o efeito de entrada e saída suave */}
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#f8fafc] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#f8fafc] to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-8 whitespace-nowrap px-4 cursor-grab active:cursor-grabbing"
            animate={{
              x: [0, -1920], // Ajuste este valor negativo dependendo da largura total
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35, // Velocidade do scroll (maior = mais lento)
                ease: "linear",
              },
            }}
          >
            {/* Renderizamos a lista 3 vezes seguidas para garantir que o scroll infinito nunca fique vazio */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex items-center justify-center w-48 h-28 p-4 relative group"
              >
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100"
                />
                {/* Fallback de texto caso a imagem quebre */}
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity text-center px-2">
                  <span className="text-[#113255] font-bold text-sm whitespace-normal leading-tight">{partner.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- SECÇÃO CONSELHO DE ADMINISTRAÇÃO --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#113255] tracking-tight">
              Conselho de Administração
            </h2>
            <div className="w-24 h-1.5 bg-[#3a7d44] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-[#e2e8f0]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-8 text-center flex-grow flex flex-col justify-center">
                  <h4 className="text-2xl font-extrabold text-[#113255] mb-2">{member.name}</h4>
                  <p className="text-[#3a7d44] font-bold text-sm uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}