"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Truck, Users, CheckCircle, Quote, MapPin, Mail, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImpactSection from "@/components/ImpactSection";
import DonationSection from "@/components/DonationSection";
import { useTranslations } from 'next-intl';

// COMPONENTE DE FUNDO DINÂMICO
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

// Imagens Hero
const heroImages = [
  "https://i.imgur.com/wz6xHwK.jpeg",
  "https://i.imgur.com/SncAEMv.jpeg",
  "https://i.imgur.com/7WwYd3z.jpeg",
  "https://i.imgur.com/Rbf1aHI.jpeg",
  "https://i.imgur.com/JgU5KXO.jpeg",
  "https://i.imgur.com/YKMx6a4.jpeg",
  "https://i.imgur.com/3StocjA.jpeg",
  "https://i.imgur.com/4UBkLJM.jpeg",
  "https://i.imgur.com/GNv4wDa.jpeg",
  "https://i.imgur.com/8YoFRbu.jpeg",
];

export default function Home() {
  const t = useTranslations('Home');
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

      {/* HERO SECTION */}
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
              {t('hero_badge')}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
              {t('hero_title')}
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-md">
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/trabalhos"
                className="flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#113255] transition-all text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                {t('hero_btn')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* --- SECÇÃO MELHORADA: O CAMINHO DA AJUDA --- */}
      <section className="relative py-32 overflow-hidden bg-gray-50 z-20">
        <AnimatedBackground />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-black text-[#113255] tracking-tight">
              {t('how_title')}
            </h2>
            <div className="w-24 h-1.5 bg-[#3a7d44] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: t('step1_title'),
                desc: t('step1_desc'),
                bgImage: "https://i.imgur.com/xriMc5A.jpeg"
              },
              {
                icon: <Truck className="w-8 h-8" />,
                title: t('step2_title'),
                desc: t('step2_desc'),
                bgImage: "https://i.imgur.com/wz6xHwK.jpeg"
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: t('step3_title'),
                desc: t('step3_desc'),
                bgImage: "https://i.imgur.com/GNv4wDa.jpeg"
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-[400px] flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0">
                  <img src={step.bgImage} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#113255] via-[#113255]/80 to-transparent opacity-95 group-hover:opacity-85 transition-opacity" />
                </div>

                <div className="relative z-10 p-8 pt-0">
                  <div className="w-16 h-16 bg-[#3a7d44] text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg transform -translate-y-4 group-hover:-translate-y-6 transition-transform">
                    {step.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-100 leading-relaxed text-base">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO & DOAÇÕES */}
      <ImpactSection />

      <section className="relative py-32 bg-[#113255] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#3a7d44] rounded-full mix-blend-multiply filter blur-[100px] opacity-40" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-20" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Quote className="w-16 h-16 text-[#d4af37] mx-auto mb-10 opacity-80" />
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif italic text-white leading-tight md:leading-snug px-4">
            "{t('quote_text')}"
          </motion.h2>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.8 }}>
            <div className="w-16 h-0.5 bg-[#d4af37] mx-auto mt-12 mb-6 opacity-50" />
            <p className="font-bold text-[#d4af37] tracking-[0.2em] uppercase text-sm md:text-base">
              Alcides Viegas <span className="text-gray-400 font-normal ml-2 tracking-normal capitalize">{t('quote_role')}</span>
            </p>
          </motion.div>
        </div>
      </section>

      <DonationSection />

      {/* --- FOOTER ATUALIZADO --- */}
      <footer className="bg-[#113255] text-white pt-24 pb-12 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">

            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-24 w-auto object-contain" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                {t('footer_desc')}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{t('footer_links_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">{t('footer_link1')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link2')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{t('footer_link3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{t('footer_link4')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{t('footer_involved_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv1')}</Link></li>
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{t('footer_inv2')}</Link></li>
                <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">{t('footer_inv3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{t('footer_inv4')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{t('footer_contact_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#d4af37]" /> {t('footer_location')}</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#d4af37]" /> info@fundacaocantona.org</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#d4af37]" /> +258 84 372 3482</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs">{t('footer_copyright')}</p>
            <div className="flex items-center gap-6">
              {/* Ícones das Redes Sociais */}
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}