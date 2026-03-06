"use client";

// AVISO: Se a biblioteca lenis ainda não estiver instalada, por favor execute:
// npm install @studio-freight/react-lenis

import { ReactLenis } from '@studio-freight/react-lenis';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Users, CheckCircle, Quote, MapPin, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";
import { useTranslations } from 'next-intl';

const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#f8fafc]">
    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[#113255]/10 blur-[100px]" />
    <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#3a7d44]/15 blur-[100px]" />
  </div>
);

const heroImages = [
  "https://i.imgur.com/wz6xHwK.jpeg", "https://i.imgur.com/SncAEMv.jpeg", "https://i.imgur.com/7WwYd3z.jpeg",
  "https://i.imgur.com/Rbf1aHI.jpeg", "https://i.imgur.com/JgU5KXO.jpeg", "https://i.imgur.com/YKMx6a4.jpeg",
  "https://i.imgur.com/3StocjA.jpeg", "https://i.imgur.com/4UBkLJM.jpeg", "https://i.imgur.com/GNv4wDa.jpeg",
  "https://i.imgur.com/8YoFRbu.jpeg",
];

// ─── SEQUENCE COMPONENT REUTILIZÁVEL ──────────────────────────────────────────
const NUM_FRAMES = 50;
const FrameSequence = ({ scrollProgress, folderName }: { scrollProgress: any, folderName: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= NUM_FRAMES; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, '0');
      img.src = `/${folderName}/${frameNum}.png`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1 && i === 1 && canvasRef.current) {
          const ctx = canvasRef.current.getContext("2d");
          ctx?.drawImage(img, 0, 0, 1920, 1080);
        }
      };
      img.onerror = () => console.warn(`Failed to load image: ${img.src}`);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [folderName]);

  useMotionValueEvent(scrollProgress, "change", (latest: number) => {
    if (!canvasRef.current || images.length === 0) return;

    const frameIndex = Math.min(NUM_FRAMES - 1, Math.max(0, Math.floor(latest * NUM_FRAMES)));
    const img = images[frameIndex];

    if (img && img.complete && img.naturalHeight !== 0) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, 1920, 1080);
      }
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700"
      style={{ willChange: "transform" }}
    />
  );
};

export default function Home() {
  const t = useTranslations('Home');
  const [currentImage, setCurrentImage] = useState(0);

  // 1. SCROLL DA HERO SECTION PARA FUSÃO SUAVE
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 0.95]);

  // 2. SCROLL DA SECÇÃO "COMO FUNCIONA"
  const howSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: howScrollProgress } = useScroll({
    target: howSectionRef,
    offset: ["start start", "end end"]
  });

  const [activeStep, setActiveStep] = useState(0);

  useMotionValueEvent(howScrollProgress, "change", (latest) => {
    if (latest < 0.33) setActiveStep(0);
    else if (latest < 0.66) setActiveStep(1);
    else setActiveStep(2);
  });

  const step0Progress = useTransform(howScrollProgress, [0, 0.33], [0, 1]);
  const step1Progress = useTransform(howScrollProgress, [0.33, 0.66], [0, 1]);
  const step2Progress = useTransform(howScrollProgress, [0.66, 1], [0, 1]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentImage((prev) => (prev + 1) % heroImages.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const stepsInfo = [
    {
      title: "Identificação",
      desc: "Mapeamos as necessidades críticas de cada família e comunidade vulnerável.",
      icon: <Users className="w-5 h-5 lg:w-8 lg:h-8" />,
      folder: "identificacao",
      progress: step0Progress
    },
    {
      title: "Logística Real",
      desc: "Garantimos o transporte seguro de todos os mantimentos até às zonas mais remotas.",
      icon: <Truck className="w-5 h-5 lg:w-8 lg:h-8" />,
      folder: "logistica",
      progress: step1Progress
    },
    {
      title: "Entrega Pessoal",
      desc: "A nossa equipa entrega pessoalmente, garantindo transparência e dignidade.",
      icon: <CheckCircle className="w-5 h-5 lg:w-8 lg:h-8" />,
      folder: "entrega",
      progress: step2Progress
    }
  ];

  return (
    <ReactLenis root>
      <main className="min-h-screen bg-white">
        <Navbar />

        {/* ── HERO INICIAL ── */}
        <div ref={heroRef} className="relative min-h-screen w-full overflow-hidden flex items-center bg-black">
          <AnimatePresence mode="popLayout">
            <motion.img key={currentImage} src={heroImages[currentImage]}
              initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover" alt="Fundação Cantoná" />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-[#113255]/90 via-[#113255]/50 to-transparent z-10" />

          {/* ZONA DE FUSÃO INVISÍVEL (Bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/80 to-transparent z-20 pointer-events-none" />

          {/* Conteúdo animado (desaparece ao rolar para baixo) */}
          <motion.div
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16"
          >
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.5 }} className="max-w-2xl space-y-5">
              <div className="inline-block bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/30 shadow-md">
                {t('hero_badge')}
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
                {t('hero_title')}
              </h1>
              <p className="text-sm md:text-base text-gray-200 max-w-xl leading-relaxed drop-shadow-md">
                {t('hero_subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link href="/trabalhos"
                  className="flex items-center justify-center gap-2 border-2 border-white text-white px-7 py-3 rounded-full font-bold hover:bg-white hover:text-[#113255] transition-all text-sm shadow-[0_0_16px_rgba(255,255,255,0.25)]">
                  {t('hero_btn')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── COMO FUNCIONA (AMBIENT GLASSMORPHISM) ── */}
        <section ref={howSectionRef} className="relative h-[300vh] w-full bg-[#0a192f]">
          {/* Contentor Fixo na Tela */}
          <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center">

            {/* 1. FUNDO AMBIENTE: A mesma sequência, mas com blur e escurecida */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${activeStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full z-0"
              >
                <FrameSequence folderName={stepsInfo[activeStep].folder} scrollProgress={stepsInfo[activeStep].progress} />
              </motion.div>
            </AnimatePresence>

            {/* Vidro Fosco sobre o Fundo */}
            <div className="absolute inset-0 bg-[#0a192f]/85 backdrop-blur-xl z-10" />

            {/* ZONA DE FUSÃO INVISÍVEL (Top) */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a192f] to-transparent z-30 pointer-events-none" />

            {/* Interface de Textos e O Quadrado */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-16 pt-20 pb-10 lg:py-0">

              {/* Lado Esquerdo: Textos */}
              <div className="w-full lg:w-1/2 flex flex-col shrink-0">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 lg:mb-14">
                  <h2 className="text-[10px] lg:text-sm font-bold text-[#d4af37] tracking-widest uppercase mb-1 lg:mb-4">Metodologia</h2>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    Como a sua ajuda<br className="hidden lg:block" /> chega ao destino
                  </h3>
                  <div className="w-12 lg:w-16 h-1 lg:h-1.5 bg-[#3a7d44] mt-3 lg:mt-6 rounded-full" />
                </motion.div>

                <div className="space-y-5 lg:space-y-12 pl-4 lg:pl-6 border-l-2 border-white/10">
                  {stepsInfo.map((step, i) => {
                    const isActive = activeStep === i;
                    return (
                      <div
                        key={i}
                        className={`relative transition-all duration-700 ease-in-out ${isActive ? "opacity-100 scale-100 translate-x-2 lg:translate-x-4" : "opacity-30 scale-95 translate-x-0"}`}
                      >
                        {/* Ponto indicador na linha */}
                        <div className={`absolute -left-[21px] lg:-left-[31px] top-3 lg:top-4 w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full transition-colors duration-500 ${isActive ? "bg-[#d4af37] shadow-[0_0_15px_#d4af37]" : "bg-white/20"}`} />

                        <div className="flex items-start gap-4 lg:gap-6">
                          <div className={`w-10 h-10 lg:w-14 lg:h-14 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-500 shadow-lg ${isActive ? "bg-[#3a7d44] text-white" : "bg-white/5 text-white/40"}`}>
                            {step.icon}
                          </div>
                          <div className="pt-1 lg:pt-2">
                            <h4 className="text-lg lg:text-2xl font-bold text-white mb-1 lg:mb-3 leading-tight">{step.title}</h4>

                            {/* Magia do Mobile: O texto só aparece se estiver ativo, poupando espaço! */}
                            <p className={`text-gray-300 leading-relaxed text-sm lg:text-lg max-w-md transition-all duration-500 ${isActive ? "block" : "hidden lg:block"}`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Lado Direito: O Quadrado (Cartão Nítido) OTIMIZADO PARA MOBILE */}
              <div className="w-full lg:w-1/2 relative z-30 flex justify-center mt-2 lg:mt-0">
                <div className="relative w-11/12 sm:w-4/5 lg:w-full aspect-video lg:aspect-[4/3] rounded-3xl lg:rounded-[3rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] border-[3px] lg:border-[8px] border-white/90 bg-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`card-${activeStep}`}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <FrameSequence folderName={stepsInfo[activeStep].folder} scrollProgress={stepsInfo[activeStep].progress} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </div>
        </section>

        <ImpactSection />

        {/* ── QUOTE ── */}
        <section className="relative py-24 bg-[#113255] overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#3a7d44] rounded-full mix-blend-multiply filter blur-[100px] opacity-40" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <Quote className="w-12 h-12 text-[#d4af37] mx-auto mb-8 opacity-80" />
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white leading-tight md:leading-snug px-4">
              "{t('quote_text')}"
            </motion.h2>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
              <div className="w-12 h-0.5 bg-[#d4af37] mx-auto mt-10 mb-5 opacity-50" />
              <p className="font-bold text-[#d4af37] tracking-[0.2em] uppercase text-xs md:text-sm">
                Alcides Viegas <span className="text-gray-400 font-normal ml-2 tracking-normal capitalize">{t('quote_role')}</span>
              </p>
            </motion.div>
          </div>
        </section>

        <DonationSection />

        {/* ── FOOTER ── */}
        <footer className="bg-[#113255] text-white pt-14 pb-8 border-t border-white/10 relative z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-white/10">
              <div className="space-y-4">
                <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-14 w-auto object-contain" />
                <p className="text-gray-300 text-xs leading-relaxed max-w-xs">{t('footer_desc')}</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_links_title')}</h4>
                <ul className="space-y-3 text-gray-300 text-xs">
                  <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">{t('footer_link1')}</Link></li>
                  <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link2')}</Link></li>
                  <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link3')}</Link></li>
                  <li><Link href="/noticias" className="hover:text-[#d4af37] transition-colors">Notícias</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_involved_title')}</h4>
                <ul className="space-y-3 text-gray-300 text-xs">
                  <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv1')}</Link></li>
                  <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv2')}</Link></li>
                  <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">{t('footer_inv3')}</Link></li>
                  <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{t('footer_inv4')}</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4 tracking-wider uppercase text-xs">{t('footer_contact_title')}</h4>
                <ul className="space-y-3 text-gray-300 text-xs">
                  <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> {t('footer_location')}</li>
                  <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> info@fundacaocantona.org</li>
                  <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" /> +258 84 372 3482</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-xs">{t('footer_copyright')}</p>
              <div className="flex items-center gap-3">
                <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></Link>
                <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></Link>
                <Link href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </ReactLenis>
  );
}