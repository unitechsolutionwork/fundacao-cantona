"use client";

import { motion } from "framer-motion";
import { Target, Eye, Shield } from "lucide-react";
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

export default function Sobre() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <Navbar />

      {/* SECÇÃO HISTÓRIA */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-[#f8fafc] rounded-bl-[120px] opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Coluna de Texto */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#fdf8e7] text-[#d4af37] px-5 py-2 rounded-full text-sm font-bold border border-[#d4af37]/20">
                ★ Nossa História
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[#113255]">Transformando Vidas Através da Filantropia Estratégica</h1>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>A Fundação Cantoná nasceu da visão do empresário moçambicano <strong>Alcides Viegas</strong>. Com um compromisso inabalável com as comunidades mais vulneráveis, representamos uma nova era de solidariedade organizada.</p>
              </div>
              <div className="relative p-8 bg-white border-l-4 border-[#d4af37] shadow-xl rounded-r-2xl italic text-xl text-[#113255]">
                "A verdadeira filantropia é sobre construir pontes, não apenas oferecer ajuda temporária." - Alcides Viegas
              </div>
            </motion.div>

            {/* Coluna da Imagem Corrigida para Mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full h-auto min-h-[300px] md:h-[500px] rounded-[40px] overflow-hidden shadow-2xl bg-gray-50"
            >
              <img
                src="https://i.imgur.com/DT0pAf7.png"
                className="w-full h-full object-contain md:object-cover"
                alt="Alcides Viegas"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSÃO, VISÃO E VALORES */}
      <section className="py-24 bg-[#113255] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

            <motion.div whileHover={{ y: -10 }} className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-16 h-16 bg-[#3a7d44] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-3">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Missão</h3>
              <p className="text-gray-300 leading-relaxed">Eliminar barreiras no acesso a recursos essenciais e promover o desenvolvimento sustentável das comunidades vulneráveis.</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-16 h-16 bg-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg -rotate-3">
                <Eye className="w-8 h-8 text-[#113255]" />
              </div>
              <h3 className="text-2xl font-bold">Visão</h3>
              <p className="text-gray-300 leading-relaxed">Ser a referência nacional em filantropia estratégica, capacitando indivíduos para a autonomia e dignidade plena.</p>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="space-y-4 p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg rotate-6">
                <Shield className="w-8 h-8 text-[#113255]" />
              </div>
              <h3 className="text-2xl font-bold">Valores</h3>
              <p className="text-gray-300 leading-relaxed">Transparência, inovação social, respeito pela dignidade humana e compromisso com resultados duradouros.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CONSELHO DE ADMINISTRAÇÃO */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-[#113255] mb-4">Conselho de Administração</h2>
            <div className="w-24 h-1 bg-[#3a7d44] mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {boardMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-8 text-center">
                  <h4 className="text-xl font-bold text-[#113255] mb-1">{member.name}</h4>
                  <p className="text-[#3a7d44] font-medium text-sm uppercase tracking-wider">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}