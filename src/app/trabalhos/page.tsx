"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";

// ─── FUNDO COM IMAGENS EM OPACIDADE ────────────────────────────────────────
// Collage flutuante de fotos reais da fundação, com drift suave
const bgImages = [
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "2%", left: "1%", w: "22vw", rot: -3 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "5%", left: "30%", w: "18vw", rot: 2 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "3%", left: "58%", w: "20vw", rot: -2 },
    { src: "https://i.imgur.com/SncAEMv.jpeg", top: "3%", left: "80%", w: "19vw", rot: 3 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "35%", left: "0%", w: "21vw", rot: 2 },
    { src: "https://i.imgur.com/JgU5KXO.jpeg", top: "38%", left: "24%", w: "19vw", rot: -3 },
    { src: "https://i.imgur.com/cDvcu8b.jpeg", top: "36%", left: "52%", w: "22vw", rot: 2 },
    { src: "https://i.imgur.com/wz6xHwK.jpeg", top: "37%", left: "78%", w: "21vw", rot: -2 },
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "70%", left: "5%", w: "20vw", rot: -1 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "72%", left: "35%", w: "18vw", rot: 3 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "71%", left: "62%", w: "21vw", rot: -2 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "70%", left: "83%", w: "17vw", rot: 2 },
];

const FloatingImages = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Warm tinted base */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f8f6f1 0%, #f2ede3 50%, #f5f2ea 100%)" }} />

        {bgImages.map((img, i) => (
            <motion.div
                key={i}
                className="absolute rounded-2xl overflow-hidden shadow-md"
                style={{
                    top: img.top,
                    left: img.left,
                    width: img.w,
                    aspectRatio: "4/3",
                    rotate: img.rot,
                    opacity: 0.13,
                }}
                animate={{
                    y: [0, i % 2 === 0 ? -10 : 10, 0],
                    rotate: [img.rot, img.rot + (i % 2 === 0 ? 1 : -1), img.rot],
                }}
                transition={{
                    duration: 6 + (i % 4),
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4,
                }}
            >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
        ))}

        {/* Soft vignette so edges don't distract */}
        <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(248,246,241,0.85) 100%)"
        }} />
    </div>
);

// ─── MEDIA CAROUSEL ────────────────────────────────────────────────────────
const MediaCarousel = ({ media }: { media: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!media || media.length <= 1) return;
        const id = setInterval(() => setCurrentIndex((p) => (p + 1) % media.length), 4000);
        return () => clearInterval(id);
    }, [media, currentIndex]);

    if (!media || media.length === 0) return null;

    return (
        <div className="relative w-full h-full group">
            <AnimatePresence mode="wait">
                <motion.img
                    key={currentIndex}
                    src={media[currentIndex]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover"
                    alt={`Mídia ${currentIndex + 1}`}
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/60 via-transparent to-transparent pointer-events-none" />
            {media.length > 1 && (
                <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + media.length) % media.length); }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-lg">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % media.length); }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-lg">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {media.map((_, idx) => (
                            <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-8" : "bg-white/50 w-2.5 hover:bg-white/80"}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// ─── TIMELINE DATA ──────────────────────────────────────────────────────────
const timelineData = [
    {
        year: "2026: O Ano da Resiliência e do Cuidado",
        phases: [
            { phaseNum: 15, title: "O Escudo da Vida: Vacinação Comunitária", desc: "O futuro de Moçambique mora na saúde das nossas crianças. Fomos ao encontro das comunidades para garantir a vacinação infantil, criando um escudo de proteção para que os nossos pequenos possam crescer fortes, saudáveis e prontos para conquistar o mundo.", location: "Comunidades Locais", media: ["https://i.imgur.com/xriMc5A.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Vacinação+Foto+2"] },
            { phaseNum: 14, title: "Asas para Voar: 5 Bolsas de Estudo", desc: "Acreditamos que a educação é a maior ferramenta de transformação social. Este ano, apadrinhámos o futuro de cinco crianças com bolsas de estudo.", location: "Comunidades Locais", media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Bolsas+Foto+2"] },
            { phaseNum: 13, title: "Um Novo Lar: Centro de Acolhimento de Malembuane", desc: "Doámos material para a construção de 10 casas sólidas, permitindo que o Governo local realojasse estas famílias em zonas seguras.", location: "Malembuane", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Casas+Malembuane+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Casas+Malembuane+2"] },
            { phaseNum: 12, title: "Reerguer a Vida e o Sustento: Barra e Mercado do Tofo", desc: "No Tofo, socorremos 200 bancas de vendedores com alimentos e materiais de construção. Na Barra, doámos material e pagámos a equipa técnica para erguer 40 novas casas.", location: "Inhambane (Barra e Tofo)", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Mercado+Tofo+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Barra+Casas+2"] },
            { phaseNum: 11, title: "O Abraço que Venceu o Ciclone Guezani", desc: "No Centro de Reassentamento da Mesquita, amparámos mais de 2.000 pessoas. Entregámos 200 chapas de zinco e 35 toneladas de bens de primeira necessidade.", location: "Inhambane (Mesquita)", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Ciclone+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Ciclone+Foto+2"] },
        ]
    },
    {
        year: "A Luta Contra as Cheias: A Força da Nossa Solidariedade",
        intro: "Quando as águas subiram, a nossa compaixão falou mais alto. Atravessámos as províncias de Gaza e Maputo para garantir que ninguém ficava para trás.",
        phases: [
            { phaseNum: 10, title: "A Força em Xai-Xai (Tavene)", desc: "Chegámos a Tavene com 30 toneladas de produtos alimentares e diversos. Cada pacote entregue foi uma mensagem silenciosa: \"Vocês não estão sozinhos.\"", location: "Gaza", media: ["https://i.imgur.com/8sbJgNy.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Xai-Xai+Foto+2"] },
            { phaseNum: 9, title: "Nutrir a Esperança no Chókwè", desc: "Distribuímos 50 toneladas de bens de primeira necessidade e doámos 3 cabeças de gado bovino.", location: "Gaza", media: ["https://i.imgur.com/u2wjQGD.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Chokwe+Gado"] },
            { phaseNum: 8, title: "O Alívio na Macia", desc: "Descarregámos 35 toneladas de alimentos e entregámos 3.000 kits de sobrevivência essenciais.", location: "Gaza", media: ["https://i.imgur.com/iKNHyzJ.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Macia+Kits"] },
            { phaseNum: 7, title: "Mãos Estendidas à Manhiça", desc: "Levámos 30 toneladas de produtos alimentares e artigos diversos às famílias ameaçadas pelas inundações.", location: "Maputo Província", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Manhiça+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Manhiça+Foto+2"] },
            { phaseNum: 6, title: "O Renascer de Boane", desc: "Com 15 toneladas de comida, vestuário e produtos diversos, ajudámos as famílias de Boane a recomeçar.", location: "Maputo Província", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Boane+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Boane+Foto+2"] },
            { phaseNum: 5, title: "A Semente da Reconstrução na Moamba", desc: "No distrito da Moamba, deixámos 10 toneladas de alimentos e bens variados para a comunidade recomeçar.", location: "Maputo Província", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Moamba+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Moamba+Foto+2"] },
        ]
    },
    {
        year: "2025: O Desporto como Força de Transformação",
        phases: [
            { phaseNum: 4, title: "A Coroação da Juventude: Torneio de Dezembro", desc: "Encerramos o ano com um torneio épico de um mês, com prémio de 100 mil meticais e a presença honrosa do Ministro da Juventude e Desporto.", location: "Maputo", media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Torneio+Dez+2"] },
            { phaseNum: 3, title: "O Palco das Estrelas: Liga Canton 7", desc: "Patrocinámos a Liga Canton 7 com um prémio de 100 mil meticais, celebrando o talento dos nossos jovens atletas.", location: "Maputo", media: ["https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Liga+Canton+1", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Liga+Canton+2"] },
        ]
    },
    {
        year: "2024: As Nossas Raízes e Fundações",
        phases: [
            { phaseNum: 2, title: "Caminhar Lado a Lado: Associação Hixikanwe", desc: "Através da Associação Hixikanwe, doámos produtos alimentares e bens de primeira necessidade, fortalecendo a rede de apoio aos mais vulneráveis.", location: "Maputo", media: ["https://i.imgur.com/cDvcu8b.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Hixikanwe+Foto+2"] },
            { phaseNum: 1, title: "Honrar a Nossa Sabedoria: Lar de Idosos", desc: "A nossa jornada começou junto dos nossos mais velhos. Apoiámos o Lar de Idosos com bens alimentares e essenciais — não apenas comida, mas respeito e gratidão.", location: "Maputo", media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Lar+Idosos+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Lar+Idosos+2"] },
        ]
    }
];

const stats = [
    { value: "15", label: "Fases de Impacto" },
    { value: "2.000+", label: "Pessoas Amparadas" },
    { value: "200+", label: "Toneladas Doadas" },
    { value: "4", label: "Províncias Alcançadas" },
];

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Impacto() {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const whiteOpacity = useTransform(scrollY, [0, 600], [0, 1]);

    return (
        <main className="min-h-screen" style={{ background: "#f8f6f1" }}>
            <Navbar />

            {/* ── FULLSCREEN HERO — imagem com fade para branco ao fazer scroll ── */}
            <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <img src="https://i.imgur.com/SncAEMv.jpeg" className="absolute inset-0 w-full h-full object-cover object-center" alt="Fundação Cantoná" />

                <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/70 via-[#113255]/50 to-[#0a1f33]/80 z-10" />

                {/* Overlay branco que aparece ao fazer scroll */}
                <motion.div
                    style={{ opacity: whiteOpacity, background: "#f8f6f1" }}
                    className="absolute inset-0 z-20 pointer-events-none"
                />

                <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/25 shadow-lg mb-6">
                        <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                        O Nosso Legado · Desde 2024
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                        15 Fases de{" "}<br className="hidden sm:block" />
                        <span className="text-[#3a7d44]">Amor</span> e{" "}
                        <span className="text-[#d4af37]">Transformação</span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mb-10">
                        A verdadeira missão da Fundação Cantoná não se escreve com números, mas com os batimentos cardíacos de cada vida que tocamos.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4 text-center">
                                <p className="text-3xl font-black text-white">{stat.value}</p>
                                <p className="text-xs text-gray-300 mt-1 font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                        <p className="text-white/60 text-xs uppercase tracking-widest">Descubra o impacto</p>
                        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-5 h-8 border-2 border-white/40 rounded-full flex items-start justify-center pt-1.5">
                            <div className="w-1 h-2 bg-white/60 rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── TIMELINE with animated background ── */}
            <section className="relative py-24">
                {/* Full-bleed floating images behind the timeline */}
                <div className="absolute inset-0 overflow-hidden">
                    <FloatingImages />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-32">
                        {timelineData.map((group, groupIdx) => (
                            <div key={groupIdx} className="relative">

                                {/* Sticky group header — glass card over the animated bg */}
                                <div className="sticky top-20 z-20 mb-16">
                                    <div className="inline-block bg-white/70 backdrop-blur-xl py-5 px-8 rounded-3xl border border-white/60 shadow-lg">
                                        <h2 className="text-3xl md:text-4xl font-black text-[#113255]">{group.year}</h2>
                                        {group.intro && (
                                            <p className="mt-3 text-lg text-gray-600 max-w-3xl">{group.intro}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-32">
                                    {group.phases.map((phase, phaseIdx) => {
                                        const isEven = phaseIdx % 2 === 0;
                                        return (
                                            <div key={phase.phaseNum}
                                                className={`flex flex-col gap-12 lg:gap-20 items-center relative ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>

                                                <div className="hidden lg:block absolute left-1/2 top-0 bottom-[-128px] w-px bg-[#113255]/15 -translate-x-1/2 z-0" />

                                                {/* Image */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8 }}
                                                    className="w-full lg:w-5/12 z-10"
                                                >
                                                    <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden shadow-2xl bg-white p-2">
                                                        <div className="w-full h-full rounded-[32px] overflow-hidden">
                                                            <MediaCarousel media={phase.media} />
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                {/* Center circle */}
                                                <div className="hidden lg:flex w-2/12 justify-center z-10">
                                                    <div className="w-16 h-16 bg-[#113255] rounded-full border-4 border-white/80 flex items-center justify-center shadow-xl">
                                                        <span className="text-white font-bold text-xl">{phase.phaseNum}</span>
                                                    </div>
                                                </div>

                                                {/* Text card — glass over the animated bg */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8, delay: 0.2 }}
                                                    className="w-full lg:w-5/12 space-y-6 z-10 relative"
                                                >
                                                    {/* Mobile phase badge */}
                                                    <div className="lg:hidden absolute -top-5 left-8 bg-[#113255] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md z-10">
                                                        Fase {phase.phaseNum}
                                                    </div>

                                                    <div className="bg-white/75 backdrop-blur-xl p-8 rounded-[32px] shadow-xl border border-white/60">
                                                        <h3 className="text-2xl md:text-3xl font-extrabold text-[#113255] leading-tight pt-4 lg:pt-0 mb-4">
                                                            {phase.title}
                                                        </h3>
                                                        <p className="text-lg text-gray-600 leading-relaxed">
                                                            {phase.desc}
                                                        </p>
                                                        <div className="flex items-center gap-2 pt-6 border-t border-gray-100 mt-6">
                                                            <div className="flex items-center gap-2 text-[#3a7d44] font-medium bg-[#3a7d44]/10 px-4 py-2 rounded-full text-sm">
                                                                <MapPin className="w-4 h-4" />
                                                                {phase.location}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA FINAL ── */}
            <section className="py-24 bg-[#113255] relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#3a7d44]/20 blur-3xl" />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                        Cada doação escreve uma <br /><span className="text-[#d4af37]">nova história de impacto.</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Junte-se à Fundação Cantoná e ajude-nos a levar dignidade e esperança a quem mais precisa.
                    </p>
                    <Link href="/doar"
                        className="inline-flex items-center justify-center gap-3 bg-[#3a7d44] text-white px-10 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-xl hover:-translate-y-1 text-lg">
                        Fazer uma Doação Agora <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}