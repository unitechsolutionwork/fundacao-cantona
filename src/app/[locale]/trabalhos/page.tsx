"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight, ChevronLeft, ChevronRight, Heart, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';

// ─── FUNDO COM IMAGENS EM OPACIDADE ────────────────────────────────────────
const bgImages = [
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "2%", left: "1%", w: "18vw", rot: -3 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "5%", left: "30%", w: "15vw", rot: 2 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "3%", left: "58%", w: "16vw", rot: -2 },
    { src: "https://i.imgur.com/SncAEMv.jpeg", top: "3%", left: "80%", w: "15vw", rot: 3 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "35%", left: "0%", w: "17vw", rot: 2 },
    { src: "https://i.imgur.com/JgU5KXO.jpeg", top: "38%", left: "24%", w: "15vw", rot: -3 },
    { src: "https://i.imgur.com/cDvcu8b.jpeg", top: "36%", left: "52%", w: "18vw", rot: 2 },
    { src: "https://i.imgur.com/wz6xHwK.jpeg", top: "37%", left: "78%", w: "17vw", rot: -2 },
    { src: "https://i.imgur.com/xriMc5A.jpeg", top: "70%", left: "5%", w: "16vw", rot: -1 },
    { src: "https://i.imgur.com/8sbJgNy.jpeg", top: "72%", left: "35%", w: "14vw", rot: 3 },
    { src: "https://i.imgur.com/u2wjQGD.jpeg", top: "71%", left: "62%", w: "17vw", rot: -2 },
    { src: "https://i.imgur.com/iKNHyzJ.jpeg", top: "70%", left: "83%", w: "13vw", rot: 2 },
];

const FloatingImages = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #f8f6f1 0%, #f2ede3 50%, #f5f2ea 100%)" }} />
        {bgImages.map((img, i) => (
            <motion.div key={i} className="absolute rounded-xl overflow-hidden shadow-md"
                style={{ top: img.top, left: img.left, width: img.w, aspectRatio: "4/3", rotate: img.rot, opacity: 0.13 }}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0], rotate: [img.rot, img.rot + (i % 2 === 0 ? 1 : -1), img.rot] }}
                transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
            </motion.div>
        ))}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 30%, rgba(248,246,241,0.85) 100%)" }} />
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
                <motion.img key={currentIndex} src={media[currentIndex]}
                    initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }} className="w-full h-full object-cover" alt={`Mídia ${currentIndex + 1}`} />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/60 via-transparent to-transparent pointer-events-none" />
            {media.length > 1 && (
                <>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + media.length) % media.length); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-md">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % media.length); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full text-[#113255] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10 shadow-md">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                        {media.map((_, idx) => (
                            <button key={idx} onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-5" : "bg-white/50 w-1.5 hover:bg-white/80"}`} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Impacto() {
    const t = useTranslations('ImpactoPage');
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    const whiteOpacity = useTransform(scrollY, [0, 500], [0, 1]);

    const stats = [
        { value: t('stat1_val'), label: t('stat1_label') },
        { value: t('stat2_val'), label: t('stat2_label') },
        { value: t('stat3_val'), label: t('stat3_label') },
        { value: t('stat4_val'), label: t('stat4_label') },
    ];

    const timelineData = [
        {
            year: t('g1_year'),
            phases: [
                { phaseNum: 15, title: t('g1_p15_title'), desc: t('g1_p15_desc'), location: t('g1_p15_loc'), media: ["https://i.imgur.com/xriMc5A.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Vacinação+Foto+2"] },
                { phaseNum: 14, title: t('g1_p14_title'), desc: t('g1_p14_desc'), location: t('g1_p14_loc'), media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Bolsas+Foto+2"] },
                { phaseNum: 13, title: t('g1_p13_title'), desc: t('g1_p13_desc'), location: t('g1_p13_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Casas+Malembuane+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Casas+Malembuane+2"] },
                { phaseNum: 12, title: t('g1_p12_title'), desc: t('g1_p12_desc'), location: t('g1_p12_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Mercado+Tofo+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Barra+Casas+2"] },
                { phaseNum: 11, title: t('g1_p11_title'), desc: t('g1_p11_desc'), location: t('g1_p11_loc'), media: ["https://via.placeholder.com/800x600/113255/FFFFFF?text=Ciclone+Foto+1", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Ciclone+Foto+2"] },
            ],
        },
        {
            year: t('g2_year'),
            phases: [
                { phaseNum: 10, title: t('g2_p10_title'), desc: t('g2_p10_desc'), location: t('g2_p10_loc'), media: ["https://i.imgur.com/8sbJgNy.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Xai-Xai+Foto+2"] },
                { phaseNum: 9, title: t('g2_p9_title'), desc: t('g2_p9_desc'), location: t('g2_p9_loc'), media: ["https://i.imgur.com/u2wjQGD.jpeg", "https://via.placeholder.com/800x600/3a7d44/FFFFFF?text=Chokwe+Gado"] },
                { phaseNum: 8, title: t('g2_p8_title'), desc: t('g2_p8_desc'), location: t('g2_p8_loc'), media: ["https://i.imgur.com/iKNHyzJ.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Macia+Kits"] },
                { phaseNum: 7, title: t('g2_p7_title'), desc: t('g2_p7_desc'), location: t('g2_p7_loc'), media: ["https://i.imgur.com/EFxTdXC.jpeg", "https://i.imgur.com/7o7paMA.jpeg", "https://i.imgur.com/F2xcikf.jpeg", "https://i.imgur.com/Jty3Lpa.jpeg", "https://i.imgur.com/X11tmKR.jpeg", "https://i.imgur.com/pTOsaDX.jpeg", "https://i.imgur.com/8y2W6xZ.jpeg", "https://i.imgur.com/NJloOol.jpeg", "https://i.imgur.com/W2sj9jM.jpeg"] },
                { phaseNum: 6, title: t('g2_p6_title'), desc: t('g2_p6_desc'), location: t('g2_p6_loc'), media: ["https://i.imgur.com/dOnicpr.jpeg", "https://i.imgur.com/vvxcgF2.jpeg", "https://i.imgur.com/3StocjA.jpeg", "https://i.imgur.com/wAcKvXQ.jpeg", "https://i.imgur.com/8YoFRbu.jpeg", "https://i.imgur.com/xriMc5A.jpeg", "https://i.imgur.com/4BeRuOX.jpeg", "https://i.imgur.com/8sbJgNy.jpeg", "https://i.imgur.com/heqp6rc.jpeg"] },
                { phaseNum: 5, title: t('g2_p5_title'), desc: t('g2_p5_desc'), location: t('g2_p5_loc'), media: ["https://i.imgur.com/7DV7KqS.jpeg", "https://i.imgur.com/gFNg8uS.jpeg", "https://i.imgur.com/vR0osa9.jpeg", "https://i.imgur.com/LmgjC7L.jpeg", "https://i.imgur.com/HY14XDa.jpeg", "https://i.imgur.com/gfTshdJ.jpeg", "https://i.imgur.com/YUTkOTr.jpeg"] },
            ],
        },
        {
            year: t('g3_year'),
            phases: [
                { phaseNum: 4, title: t('g3_p4_title'), desc: t('g3_p4_desc'), location: t('g3_p4_loc'), media: ["https://i.imgur.com/JgU5KXO.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Torneio+Dez+2"] },
                { phaseNum: 3, title: t('g3_p3_title'), desc: t('g3_p3_desc'), location: t('g3_p3_loc'), media: ["https://i.imgur.com/gWN9XQP.jpeg", "https://i.imgur.com/SDPRWdn.jpeg", "https://i.imgur.com/mZ9M9JT.jpeg", "https://i.imgur.com/N9z9hey.jpeg", "https://i.imgur.com/55o2RLG.jpeg", "https://i.imgur.com/ELdTtrV.jpeg", "https://i.imgur.com/tyM8yLT.jpeg", "https://i.imgur.com/9d9Hdyf.jpeg"] },
            ],
        },
        {
            year: t('g4_year'),
            phases: [
                { phaseNum: 2, title: t('g4_p2_title'), desc: t('g4_p2_desc'), location: t('g4_p2_loc'), media: ["https://i.imgur.com/cDvcu8b.jpeg", "https://via.placeholder.com/800x600/113255/FFFFFF?text=Hixikanwe+Foto+2"] },
                { phaseNum: 1, title: t('g4_p1_title'), desc: t('g4_p1_desc'), location: t('g4_p1_loc'), media: ["https://i.imgur.com/UBPWOUe.jpeg", "https://i.imgur.com/QwNKEf2.jpeg", "https://i.imgur.com/q9H352p.jpeg", "https://i.imgur.com/5Rb99pR.jpeg", "https://i.imgur.com/zQwFMRP.jpeg", "https://i.imgur.com/0Ar8YEt.jpeg", "https://i.imgur.com/wbOLnUQ.jpeg", "https://i.imgur.com/xumNWeS.jpeg", "https://i.imgur.com/G97RaKE.jpeg", "https://i.imgur.com/W1LWDPq.jpeg", "https://i.imgur.com/UXqHvXR.jpeg"] },
            ],
        },
    ];

    return (
        <main className="min-h-screen" style={{ background: "#f8f6f1" }}>
            <Navbar />

            {/* ── HERO ── */}
            <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <img src="https://i.imgur.com/SncAEMv.jpeg" className="absolute inset-0 w-full h-full object-cover object-center" alt="Fundação Cantoná" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/70 via-[#113255]/50 to-[#0a1f33]/80 z-10" />
                <motion.div style={{ opacity: whiteOpacity, background: "#f8f6f1" }} className="absolute inset-0 z-20 pointer-events-none" />

                <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="flex flex-col items-center gap-4 pt-16 sm:pt-0"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-semibold border border-white/25 shadow-md">
                            <Heart className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
                            {t('hero_badge')}
                        </div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight"
                        >
                            {t('hero_title_1')}{" "}<br className="hidden sm:block" />
                            <span className="text-[#3a7d44]">{t('hero_title_2')}</span> {t('hero_title_3')}{" "}
                            <span className="text-[#d4af37]">{t('hero_title_4')}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed"
                        >
                            {t('hero_subtitle')}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-xl"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-center">
                                    <p className="text-xl font-black text-white">{stat.value}</p>
                                    <p className="text-[10px] text-gray-300 mt-0.5 font-medium uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
                    >
                        <p className="text-white/60 text-[10px] uppercase tracking-widest">{t('scroll_hint')}</p>
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
                            className="w-4 h-7 border-2 border-white/40 rounded-full flex items-start justify-center pt-1">
                            <div className="w-0.5 h-1.5 bg-white/60 rounded-full" />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* ── TIMELINE ── */}
            <section className="relative py-16">
                <div className="absolute inset-0 overflow-hidden"><FloatingImages /></div>
                <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-20">
                        {timelineData.map((group, groupIdx) => (
                            <div key={groupIdx} className="relative">
                                <div className="sticky top-16 z-20 mb-10">
                                    <div className="inline-block bg-white/70 backdrop-blur-xl py-3 px-6 rounded-2xl border border-white/60 shadow-md">
                                        <h2 className="text-2xl md:text-3xl font-black text-[#113255]">{group.year}</h2>
                                    </div>
                                </div>
                                <div className="space-y-20">
                                    {group.phases.map((phase, phaseIdx) => {
                                        const isEven = phaseIdx % 2 === 0;
                                        return (
                                            <div key={phase.phaseNum} className={`flex flex-col gap-8 lg:gap-12 items-center relative ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                                                <div className="hidden lg:block absolute left-1/2 top-0 bottom-[-80px] w-px bg-[#113255]/15 -translate-x-1/2 z-0" />

                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-80px" }}
                                                    transition={{ duration: 0.7 }}
                                                    className="w-full lg:w-5/12 z-10"
                                                >
                                                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-white p-1.5">
                                                        <div className="w-full h-full rounded-2xl overflow-hidden">
                                                            <MediaCarousel media={phase.media} />
                                                        </div>
                                                    </div>
                                                </motion.div>

                                                <div className="hidden lg:flex w-2/12 justify-center z-10">
                                                    <div className="w-10 h-10 bg-[#113255] rounded-full border-4 border-white/80 flex items-center justify-center shadow-lg">
                                                        <span className="text-white font-bold text-sm">{phase.phaseNum}</span>
                                                    </div>
                                                </div>

                                                <motion.div
                                                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-80px" }}
                                                    transition={{ duration: 0.7, delay: 0.15 }}
                                                    className="w-full lg:w-5/12 z-10 relative"
                                                >
                                                    <div className="lg:hidden absolute -top-4 left-6 bg-[#113255] text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-md z-10">
                                                        {t('phase_label')} {phase.phaseNum}
                                                    </div>
                                                    <div className="bg-white/75 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-white/60">
                                                        <h3 className="text-base md:text-lg font-extrabold text-[#113255] leading-tight pt-3 lg:pt-0 mb-2">
                                                            {phase.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 leading-relaxed">{phase.desc}</p>
                                                        <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-3">
                                                            <div className="inline-flex items-center gap-1.5 text-[#3a7d44] font-medium bg-[#3a7d44]/10 px-3 py-1 rounded-full text-xs">
                                                                <MapPin className="w-3 h-3" />
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

            {/* ── CTA ── */}
            <section className="py-16 bg-[#113255] relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-[#3a7d44]/20 blur-3xl" />
                <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
                        {t('cta_title_1')} <br /><span className="text-[#d4af37]">{t('cta_title_2')}</span>
                    </h2>
                    <p className="text-sm text-gray-300 mb-6 max-w-xl mx-auto">{t('cta_desc')}</p>
                    <Link href="/doar"
                        className="inline-flex items-center gap-2 bg-[#3a7d44] text-white px-7 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:-translate-y-0.5 text-sm">
                        {t('cta_btn')} <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-[#113255] text-white pt-14 pb-8 border-t border-white/10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
                        <div className="space-y-4">
                            <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-14 w-auto object-contain" />
                            <p className="text-gray-300 text-xs leading-relaxed max-w-xs">
                                Comprometidos com a dignidade e o futuro do povo moçambicano. Juntos, transformamos realidades.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">Links Rápidos</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">Quem Somos</Link></li>
                                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">Projectos Actuais</Link></li>
                                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">Relatórios de Impacto</Link></li>
                                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">Transparência</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">Envolva-se</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">Ser Voluntário</Link></li>
                                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">Parcerias Corporativas</Link></li>
                                <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">Doações</Link></li>
                                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">Campanhas</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">Contacto</h4>
                            <ul className="space-y-3 text-gray-300 text-xs">
                                <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> Maputo, Moçambique</li>
                                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> info@fundacaocantona.org</li>
                                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> +258 84 372 3482</li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-xs">© 2026 Fundação Cantoná. Todos os direitos reservados.</p>
                        <div className="flex items-center gap-3">
                            <Link href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                            </Link>
                            <Link href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                            </Link>
                            <Link href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}