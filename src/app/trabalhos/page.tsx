"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

// A SUA LISTA DE PROJETOS REAIS (Cole os seus links nas imagens)
const allProjects = [
    {
        id: 1,
        tag: "Ação Emergencial",
        title: "Apoio às Vítimas das Cheias em Gaza",
        desc: "Uma resposta rápida e coordenada para apoiar as famílias afetadas pelas cheias. Procedemos à doação de mais de 3 mil kits de produtos alimentares e de primeira necessidade, garantindo abrigo e segurança para a população dos Distritos de Chókwè e Xai-Xai.",
        date: "Fevereiro 2026",
        location: "Gaza, Moçambique",
        image: "https://i.imgur.com/8sbJgNy.jpeg", // <-- COLE O SEU PRIMEIRO LINK AQUI
    },
    {
        id: 2,
        tag: "Saúde & Bem-Estar",
        title: "Campanha de Vacinação Comunitária",
        desc: "Levamos cuidados de saúde essenciais a zonas de difícil acesso. Esta campanha proporcionou vacinação, consultas de rotina e acompanhamento médico gratuito a mais de 1.200 pessoas, com foco especial em crianças e idosos.",
        date: "Dezembro 2025",
        location: "Zambézia",
        image: "https://i.imgur.com/xriMc5A.jpeg", // <-- COLE O SEU SEGUNDO LINK AQUI
    },
    {
        id: 3,
        tag: "Educação",
        title: "Programa de Bolsas Escolares",
        desc: "Acreditamos que a educação é a maior ferramenta de transformação. Distribuímos material escolar, uniformes e bolsas de estudo para 500 crianças em comunidades rurais, combatendo o abandono escolar e construindo pontes para o futuro.",
        date: "Janeiro 2026",
        location: "Maputo Província",
        image: "https://i.imgur.com/JgU5KXO.jpeg", // <-- COLE O SEU TERCEIRO LINK AQUI
    },
];

export default function Impacto() {
    return (
        <main className="min-h-screen bg-white pt-20">
            <Navbar />

            {/* Cabeçalho da Página (Clean e Minimalista) */}
            <section className="py-20 bg-[#f8fafc] border-b border-gray-100">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white text-[#113255] px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 shadow-sm mb-6"
                    >
                        <span className="text-[#3a7d44]">🌍</span> O Nosso Terreno
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-[#113255] mb-6 tracking-tight"
                    >
                        A Solidariedade em <span className="text-[#3a7d44]">Ação</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-600 leading-relaxed"
                    >
                        Conheça ao detalhe as iniciativas e projetos da Fundação Cantoná.
                        Mais do que números, são vidas transformadas pelo poder da união.
                    </motion.p>
                </div>
            </section>

            {/* Lista de Projetos (Layout Zig-Zag Premium) */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
                    {allProjects.map((project, index) => {
                        // Lógica para alternar a imagem entre a esquerda e a direita
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={project.id}
                                className={`flex flex-col gap-12 lg:gap-20 items-center ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                                    }`}
                            >
                                {/* Coluna da Imagem */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl group">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>
                                </motion.div>

                                {/* Coluna do Texto */}
                                <motion.div
                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-full lg:w-1/2 space-y-8"
                                >
                                    <div className="inline-block bg-[#f8fafc] text-[#113255] px-4 py-1.5 rounded-lg text-sm font-bold border border-gray-100">
                                        {project.tag}
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#113255] leading-tight">
                                        {project.title}
                                    </h2>

                                    <p className="text-lg text-gray-600 leading-relaxed">
                                        {project.desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-gray-100">
                                        <div className="flex items-center gap-2 text-gray-500 font-medium bg-gray-50 px-4 py-2 rounded-full">
                                            <Calendar className="w-5 h-5 text-[#3a7d44]" />
                                            {project.date}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-500 font-medium bg-gray-50 px-4 py-2 rounded-full">
                                            <MapPin className="w-5 h-5 text-[#113255]" />
                                            {project.location}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Banner CTA Final */}
            <section className="py-24 bg-[#113255] relative overflow-hidden">
                {/* Círculos decorativos de fundo */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#3a7d44]/20 blur-3xl" />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Cada doação escreve uma <br /><span className="text-[#d4af37]">nova história de impacto.</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Junte-se à Fundação Cantoná e ajude-nos a levar dignidade e esperança a quem mais precisa.
                    </p>
                    <Link
                        href="/doar"
                        className="inline-flex items-center justify-center gap-3 bg-[#3a7d44] text-white px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-xl hover:-translate-y-1 text-lg"
                    >
                        Fazer uma Doação Agora <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}