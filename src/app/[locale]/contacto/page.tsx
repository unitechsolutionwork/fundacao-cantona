"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Mail, Phone, MapPin, Send, MessageCircle,
    Heart, CheckCircle2, Loader2, ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';

// ─── FORM SUBMIT STATES ─────────────────────────────────────────────────────
type FormStatus = "idle" | "loading" | "success";

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function Contacto() {
    const t = useTranslations('Contacto');
    const tFooter = useTranslations('Home'); // Reaproveitamos o Footer da Home!

    const [formStatus, setFormStatus] = useState<FormStatus>("idle");

    // ─── CONTACT CARDS DATA (Dentro da função para traduzir) ───────────────
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6" />,
            label: t('lbl_phone'),
            value: "+258 84 372 3482",
            bg: "bg-blue-50",
            color: "text-[#113255]",
            accent: "bg-[#113255]",
        },
        {
            icon: <Mail className="w-6 h-6" />,
            label: t('lbl_email'),
            value: "geral@fundacaocantona.org.mz",
            bg: "bg-green-50",
            color: "text-[#3a7d44]",
            accent: "bg-[#3a7d44]",
        },
        {
            icon: <MapPin className="w-6 h-6" />,
            label: t('lbl_location'),
            value: t('val_location'),
            bg: "bg-yellow-50",
            color: "text-[#d4af37]",
            accent: "bg-[#d4af37]",
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        setTimeout(() => setFormStatus("success"), 1800);
    };

    return (
        <main className="min-h-screen bg-[#f0f4f8]">
            <Navbar />

            {/* ── HERO ── */}
            <div className="relative min-h-[75vh] w-full overflow-hidden flex flex-col items-center justify-center">
                <img
                    src="https://i.imgur.com/GNv4wDa.jpeg"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    alt="Contacte a Fundação Cantoná"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f33]/95 via-[#113255]/85 to-[#1a4b80]/70" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#3a7d44]/15 blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-32 pb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-5 py-2 rounded-full text-sm font-semibold border border-white/20 mb-8"
                    >
                        <MessageCircle className="w-4 h-4 text-[#d4af37]" />
                        {t('hero_badge')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl"
                    >
                        {t('hero_title_1')} <span className="text-[#3a7d44]">{t('hero_title_2')}</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('hero_subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* ── CONTACT SECTION ── */}
            <section className="relative z-20 -mt-36 pb-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-7">

                        {/* ── LEFT COLUMN: Info cards ── */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="lg:col-span-2 flex flex-col gap-5">
                            {contactInfo.map((item, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.1 }} whileHover={{ x: 4 }} className="bg-white rounded-[1.75rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 flex items-center gap-5 overflow-hidden relative">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.accent} rounded-l-[1.75rem]`} />
                                    <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                        <p className="text-[#113255] font-bold text-base leading-snug">{item.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            <motion.a href="https://wa.me/258843723482" target="_blank" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }} whileHover={{ scale: 1.02, y: -3 }} whileTap={{ scale: 0.98 }} className="relative bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white p-7 rounded-[1.75rem] flex items-center gap-5 shadow-[0_12px_40px_rgba(37,211,102,0.25)] overflow-hidden">
                                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
                                <div className="absolute -bottom-4 right-8 w-16 h-16 rounded-full bg-white/10" />
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                                    <MessageCircle className="w-7 h-7" />
                                </div>
                                <div className="relative z-10">
                                    <p className="font-black text-lg leading-tight">{t('whatsapp_title')}</p>
                                    <p className="text-white/75 text-sm font-medium mt-0.5">{t('whatsapp_desc')}</p>
                                </div>
                                <ArrowRight className="w-5 h-5 ml-auto relative z-10 opacity-80" />
                            </motion.a>

                            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }} className="bg-gradient-to-br from-[#0a1f33] to-[#1a4b80] text-white p-7 rounded-[1.75rem] relative overflow-hidden shadow-[0_12px_40px_rgba(17,50,85,0.2)]">
                                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37] to-[#d4af37]/60" />
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
                                <Heart className="w-7 h-7 text-[#d4af37] mb-4" />
                                <p className="font-black text-lg leading-tight mb-2">Fundação Cantoná</p>
                                <p className="text-white/65 text-sm leading-relaxed">{t('mini_about_desc')}</p>
                            </motion.div>
                        </motion.div>

                        {/* ── RIGHT COLUMN: Form ── */}
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="lg:col-span-3">
                            <div className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden">
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#113255] via-[#3a7d44] to-[#d4af37]" />
                                <div className="p-8 md:p-12">
                                    <AnimatePresence mode="wait">
                                        {(formStatus === "idle" || formStatus === "loading") && (
                                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <div className="flex items-center gap-4 mb-10">
                                                    <div className="w-14 h-14 bg-gradient-to-br from-[#113255] to-[#1a4b80] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(17,50,85,0.25)]">
                                                        <Send className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-black text-[#113255]">{t('form_title')}</h3>
                                                        <p className="text-gray-500 text-sm">{t('form_desc')}</p>
                                                    </div>
                                                </div>

                                                <form onSubmit={handleSubmit} className="space-y-6">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-bold text-[#113255]">{t('form_name')}</label>
                                                            <input type="text" required placeholder={t('form_name_ph')} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all font-medium text-[#113255] placeholder:text-gray-400" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="block text-sm font-bold text-[#113255]">{t('form_email')}</label>
                                                            <input type="email" required placeholder="exemplo@mail.com" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all font-medium text-[#113255] placeholder:text-gray-400" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-bold text-[#113255]">{t('form_phone')} <span className="text-gray-400 font-normal">{t('form_optional')}</span></label>
                                                        <input type="tel" placeholder="+258 84 xxx xxxx" className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-bold text-[#113255]">{t('form_subject')}</label>
                                                        <input type="text" required placeholder={t('form_subject_ph')} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="block text-sm font-bold text-[#113255]">{t('form_message')}</label>
                                                        <textarea rows={5} required placeholder={t('form_message_ph')} className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white outline-none transition-all resize-none font-medium text-[#113255] placeholder:text-gray-400" />
                                                    </div>
                                                    <button type="submit" disabled={formStatus === "loading"} className="w-full bg-[#113255] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0a2540] shadow-[0_10px_30px_rgba(17,50,85,0.2)] hover:shadow-[0_15px_40px_rgba(17,50,85,0.3)] transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0">
                                                        {formStatus === "loading" ? (
                                                            <><Loader2 className="w-5 h-5 animate-spin" /> {t('form_sending')}</>
                                                        ) : (
                                                            <>{t('form_btn')} <Send className="w-5 h-5" /></>
                                                        )}
                                                    </button>
                                                </form>
                                            </motion.div>
                                        )}

                                        {formStatus === "success" && (
                                            <motion.div key="success" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                                                <div className="w-24 h-24 bg-gradient-to-br from-[#3a7d44] to-green-400 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_12px_40px_rgba(58,125,68,0.35)] rotate-3">
                                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                                </div>
                                                <h3 className="text-3xl font-black text-[#113255] mb-3">{t('success_title')}</h3>
                                                <p className="text-gray-500 text-lg max-w-sm mx-auto leading-relaxed mb-8">{t('success_desc')}</p>
                                                <button onClick={() => setFormStatus("idle")} className="text-[#113255] font-bold text-base hover:underline decoration-2 underline-offset-4">
                                                    {t('success_btn')}
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-[#113255] text-white pt-24 pb-12 border-t border-white/10 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
                        <div className="md:col-span-1 space-y-6">
                            <img src="https://i.imgur.com/DT0pAf7.png" alt="Fundação Cantoná" className="h-24 w-auto object-contain" />
                            <p className="text-gray-300 text-sm leading-relaxed max-w-sm">{tFooter('footer_desc')}</p>
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