"use client";

import { motion } from "framer-motion";
import { Target, Eye, Shield, Users, Heart, Lightbulb, Award, Quote, MapPin, Mail, Phone, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useTranslations } from 'next-intl';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

export default function Sobre() {
  // Chamamos o tradutor para a página Sobre, e também reaproveitamos o do Footer (Home)
  const t = useTranslations('Sobre');
  const tFooter = useTranslations('Home');

  // ─── BOARD MEMBERS ──────────────────────────────────────────────────────────
  const boardMembers = [
    {
      name: t('team1_name'),
      role: t('team1_role'),
      image: "https://i.imgur.com/a0f1U8d.png",
      accent: "from-[#113255] to-[#1a4b80]",
    },
    {
      name: t('team2_name'),
      role: t('team2_role'),
      image: "https://i.imgur.com/OLgB5QD.png",
      accent: "from-[#3a7d44] to-green-500",
    },
    {
      name: t('team3_name'),
      role: t('team3_role'),
      image: "https://i.imgur.com/Q3okLx3.png",
      accent: "from-[#d4af37] to-yellow-400",
    },
  ];

  // ─── STATS ──────────────────────────────────────────────────────────────────
  const stats = [
    { value: t('stat1_val'), label: t('stat1_label') },
    { value: t('stat2_val'), label: t('stat2_label') },
    { value: t('stat3_val'), label: t('stat3_label') },
    { value: t('stat4_val'), label: t('stat4_label') },
  ];

  // ─── PILLARS ────────────────────────────────────────────────────────────────
  const pillars = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t('pillar1_title'),
      desc: t('pillar1_desc'),
      bg: "bg-[#113255]",
      glow: "rgba(17,50,85,0.3)",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('pillar2_title'),
      desc: t('pillar2_desc'),
      bg: "bg-[#3a7d44]",
      glow: "rgba(58,125,68,0.3)",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('pillar3_title'),
      desc: t('pillar3_desc'),
      bg: "bg-[#d4af37]",
      glow: "rgba(212,175,55,0.3)",
      textDark: true,
    },
  ];

  // ─── MVV ────────────────────────────────────────────────────────────────────
  const mvv = [
    {
      icon: <Target className="w-10 h-10" />,
      title: t('mvv1_title'),
      text: t('mvv1_desc'),
      iconBg: "bg-[#f0f9f4]",
      iconColor: "text-[#3a7d44]",
      accent: "bg-[#3a7d44]",
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: t('mvv2_title'),
      text: t('mvv2_desc'),
      iconBg: "bg-[#fdfaf0]",
      iconColor: "text-[#d4af37]",
      accent: "bg-[#d4af37]",
    },
    {
      icon: <Shield className="w-10 h-10" />,
      title: t('mvv3_title'),
      text: t('mvv3_desc'),
      iconBg: "bg-[#f0f4f8]",
      iconColor: "text-[#113255]",
      accent: "bg-[#113255]",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f0f4f8]">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative min-h-[75vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <img
          src="https://i.imgur.com/GNv4wDa.jpeg"
          className="absolute inset-0 w-full h-full object-cover object-center"
          alt="Equipa da Fundação Cantoná"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f33]/95 via-[#113255]/85 to-[#1a4b80]/70" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#3a7d44]/15 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-36 pb-52">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold border border-white/20 mb-8"
          >
            <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
            {t('hero_badge')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl"
          >
            {t('hero_title_1')} <br />
            <span className="text-[#3a7d44]">{t('hero_title_2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero_subtitle')}
          </motion.p>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="relative z-20 -mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden"
        >
          <div className="h-1 w-full bg-gradient-to-r from-[#113255] via-[#3a7d44] to-[#d4af37]" />
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <div key={i} className="text-center py-8 px-4">
                <p className="text-3xl md:text-4xl font-black text-[#113255] mb-1">{s.value}</p>
                <p className="text-xs font-bold text-[#3a7d44] uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── NOSSA HISTÓRIA ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-sm font-bold text-[#3a7d44] uppercase tracking-widest mb-3">{t('hist_badge')}</p>
                <h2 className="text-4xl font-black text-[#113255] mb-4 leading-tight">
                  {t('hist_title_1')} <span className="text-[#3a7d44]">{t('hist_title_2')}</span>
                </h2>
                <div className="w-16 h-1.5 bg-[#3a7d44] rounded-full" />
              </div>

              <p className="text-xl font-semibold text-[#113255] leading-relaxed">
                {t('hist_p1_1')} <strong>Alcides Viegas</strong>.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                {t('hist_p2')}
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                {t('hist_p3_1')} <strong className="text-[#113255]">{t('hist_p3_strong')}</strong>{t('hist_p3_2')}
              </p>

              <div className="relative bg-gradient-to-br from-[#0a1f33] to-[#1a4b80] p-8 rounded-3xl text-white overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37] to-[#d4af37]/60" />
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                <Quote className="w-10 h-10 text-[#d4af37] mb-5 opacity-70" />
                <p className="italic text-xl font-serif leading-relaxed mb-5 relative z-10">
                  "{t('hist_quote')}"
                </p>
                <p className="text-[#d4af37] font-bold uppercase tracking-widest text-xs">{t('hist_quote_author')}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="mb-8">
                <p className="text-sm font-bold text-[#3a7d44] uppercase tracking-widest mb-3">{t('pillars_badge')}</p>
                <h3 className="text-3xl font-black text-[#113255]">{t('pillars_title')}</h3>
              </div>

              {pillars.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  whileHover={{ x: 5 }}
                  className="flex gap-6 bg-[#f8fafc] p-7 rounded-2xl border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className={`w-16 h-16 ${p.bg} ${p.textDark ? "text-[#113255]" : "text-white"} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform`}
                    style={{ boxShadow: `0 8px 20px ${p.glow}` }}>
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#113255] mb-2">{p.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MVV SECTION ── */}
      <section className="py-28 bg-[#f0f4f8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-[#3a7d44] uppercase tracking-widest mb-3">{t('mvv_badge')}</p>
            <h2 className="text-4xl font-black text-[#113255]">{t('mvv_title')}</h2>
            <div className="w-24 h-1.5 bg-[#3a7d44] mx-auto mt-6 rounded-full" />
          </div>

          <div className="space-y-5">
            {mvv.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col md:flex-row items-stretch group"
              >
                <div className={`${item.accent} w-full md:w-1.5 h-1.5 md:h-auto flex-shrink-0`} />
                <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10 flex-1">
                  <div className={`w-20 h-20 ${item.iconBg} ${item.iconColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm`}>
                    {item.icon}
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-[#113255] mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM / LEADERSHIP ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className="text-sm font-bold text-[#3a7d44] uppercase tracking-widest mb-3">{t('team_badge')}</p>
            <h2 className="text-4xl md:text-5xl font-black text-[#113255] tracking-tight">{t('team_title')}</h2>
            <p className="mt-5 text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {t('team_desc')}
            </p>
            <div className="w-24 h-1.5 bg-[#3a7d44] mx-auto mt-8 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {boardMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 transition-all duration-500 flex flex-col"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    style={{ background: `linear-gradient(to top, rgba(17,50,85,0.6), transparent)` }} />
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.accent}`} />
                </div>
                <div className="p-8 text-center flex-grow flex flex-col justify-center bg-white relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.5)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <h4 className="text-xl font-extrabold text-[#113255] mb-2">{member.name}</h4>
                  <p className="text-[#3a7d44] font-bold text-xs uppercase tracking-widest leading-relaxed">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-[#113255] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3a7d44] rounded-full mix-blend-multiply filter blur-[150px] opacity-30" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d4af37] rounded-full mix-blend-multiply filter blur-[120px] opacity-15" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              {t('cta_title_1')} <span className="text-[#d4af37]">{t('cta_title_2')}</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              {t('cta_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/doar" className="flex items-center justify-center gap-2 bg-[#3a7d44] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-[0_8px_30px_rgba(58,125,68,0.35)] hover:-translate-y-0.5">
                {t('cta_btn1')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contacto" className="flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm">
                {t('cta_btn2')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER REAPROVEITADO ── */}
      <footer className="bg-[#113255] text-white pt-24 pb-12 border-t border-white/10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">

            <div className="md:col-span-1 space-y-6">
              <div className="flex items-center gap-3">
                <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-24 w-auto object-contain" />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
                {tFooter('footer_desc')}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{tFooter('footer_links_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><Link href="/sobre" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link1')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link2')}</Link></li>
                <li><Link href="/trabalhos" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_link4')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{tFooter('footer_involved_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv1')}</Link></li>
                <li><Link href="/contacto" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv2')}</Link></li>
                <li><Link href="/doar" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv3')}</Link></li>
                <li><Link href="#" className="hover:text-[#d4af37] transition-colors">{tFooter('footer_inv4')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 tracking-wider uppercase text-sm">{tFooter('footer_contact_title')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#d4af37]" /> {tFooter('footer_location')}</li>
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#d4af37]" /> info@fundacaocantona.org</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#d4af37]" /> +258 84 372 3482</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-xs">{tFooter('footer_copyright')}</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg></Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#d4af37] hover:text-[#113255] transition-all"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}