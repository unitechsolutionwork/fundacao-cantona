"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Smartphone, Landmark, UploadCloud, CheckCircle2,
    Loader2, Lock, ArrowRight, AlertCircle, ShieldCheck,
    Heart, MapPin, Mail, Phone, Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useTranslations } from 'next-intl';

// ─── HERO BACKGROUND ───────────────────────────────────────────────────────
const heroImages = [
    "https://i.imgur.com/3nUvMBL.jpeg",
];

// ─── PRESET AMOUNTS ────────────────────────────────────────────────────────
const presets = ["500", "1000", "2500", "5000"];

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function Doacoes() {
    const t = useTranslations('Doar');
    const tFooter = useTranslations('Home'); // Reaproveitamos o Footer da Home!

    const [method, setMethod] = useState<"mpesa" | "banco" | null>(null);
    const [mpesaAmount, setMpesaAmount] = useState("");
    const [mpesaPhone, setMpesaPhone] = useState("");
    const [mpesaStatus, setMpesaStatus] = useState("idle");
    const [mpesaError, setMpesaError] = useState("");
    const [bankFile, setBankFile] = useState<File | null>(null);
    const [bankStatus, setBankStatus] = useState("idle");

    // Trazemos os badges para dentro para traduzir
    const trustBadges = [
        { icon: <ShieldCheck className="w-5 h-5" />, label: t('badge_secure') },
        { icon: <Lock className="w-5 h-5" />, label: t('badge_encrypted') },
        { icon: <Heart className="w-5 h-5" />, label: t('badge_impact') },
    ];

    const handleMpesaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMpesaStatus("loading");
        setMpesaError("");
        try {
            const res = await fetch("/api/mpesa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone: mpesaPhone, amount: mpesaAmount }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error?.message || "Falha ao iniciar pagamento.");
            setMpesaStatus("pin_prompt");
        } catch (err: any) {
            setMpesaStatus("idle");
            setMpesaError(err.message || "Ocorreu um erro ao processar o pagamento.");
        }
    };

    const handleBankSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBankStatus("loading");
        setTimeout(() => setBankStatus("success"), 1500);
    };

    return (
        <main className="min-h-screen bg-[#f0f4f8]">
            <Navbar />

            {/* ── HERO ── */}
            <div className="relative min-h-[75vh] w-full overflow-hidden flex flex-col items-center justify-center">
                <img
                    src={heroImages[0]}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    alt="Doação"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f33]/95 via-[#113255]/85 to-[#1a4b80]/70" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-[#d4af37]/10 blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#3a7d44]/15 blur-[100px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center pt-32 pb-48">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap items-center justify-center gap-3 mb-10"
                    >
                        {trustBadges.map((b, i) => (
                            <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20">
                                <span className="text-[#d4af37]">{b.icon}</span>
                                {b.label}
                            </span>
                        ))}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl"
                    >
                        {t('hero_title_1')} <br />
                        <span className="text-[#d4af37]">{t('hero_title_2')}</span> {t('hero_title_3')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('hero_subtitle')}
                    </motion.p>
                </div>
            </div>

            {/* ── FORM SECTION ── */}
            <section className="relative z-20 -mt-36 pb-32">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

                        {/* M-Pesa card */}
                        <motion.button
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                            whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("mpesa"); setMpesaStatus("idle"); setMpesaError(""); }}
                            className={`relative group p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 overflow-hidden
                                ${method === "mpesa" ? "bg-white border-[#3a7d44] ring-4 ring-[#3a7d44]/20 shadow-[0_20px_60px_rgba(58,125,68,0.18)]" : "bg-white/95 backdrop-blur-xl border-transparent shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-[#3a7d44]/40"}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[5rem] transition-all duration-500 ${method === "mpesa" ? "bg-[#3a7d44]/8" : "bg-gray-50"}`} />
                            {method === "mpesa" && (
                                <span className="absolute top-5 right-5 bg-[#3a7d44] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> {t('method_selected')}
                                </span>
                            )}
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                                ${method === "mpesa" ? "bg-[#3a7d44] text-white shadow-[0_8px_20px_rgba(58,125,68,0.35)]" : "bg-green-50 text-[#3a7d44] group-hover:bg-[#3a7d44] group-hover:text-white"}`}>
                                <Smartphone className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#113255] mb-1">{t('method_mpesa')}</h3>
                                <p className="text-gray-500 font-medium text-sm">{t('method_mpesa_desc')}</p>
                            </div>
                            <div className="flex gap-1 mt-1">
                                {[0, 1, 2].map(i => <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${method === "mpesa" ? "w-6 bg-[#3a7d44]" : "w-2 bg-gray-200"}`} />)}
                            </div>
                        </motion.button>

                        {/* Bank transfer card */}
                        <motion.button
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                            whileHover={{ y: -6, scale: 1.01 }} whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("banco"); setBankStatus("idle"); }}
                            className={`relative group p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 overflow-hidden
                                ${method === "banco" ? "bg-white border-[#113255] ring-4 ring-[#113255]/15 shadow-[0_20px_60px_rgba(17,50,85,0.18)]" : "bg-white/95 backdrop-blur-xl border-transparent shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-[#113255]/30"}`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[5rem] transition-all duration-500 ${method === "banco" ? "bg-[#113255]/6" : "bg-gray-50"}`} />
                            {method === "banco" && (
                                <span className="absolute top-5 right-5 bg-[#113255] text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> {t('method_selected')}
                                </span>
                            )}
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
                                ${method === "banco" ? "bg-[#113255] text-white shadow-[0_8px_20px_rgba(17,50,85,0.3)]" : "bg-blue-50 text-[#113255] group-hover:bg-[#113255] group-hover:text-white"}`}>
                                <Landmark className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#113255] mb-1">{t('method_bank')}</h3>
                                <p className="text-gray-500 font-medium text-sm">{t('method_bank_desc')}</p>
                            </div>
                            <div className="flex gap-1 mt-1">
                                {[0, 1, 2].map(i => <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${method === "banco" ? "w-6 bg-[#113255]" : "w-2 bg-gray-200"}`} />)}
                            </div>
                        </motion.button>
                    </div>

                    {/* ── FORM PANELS ── */}
                    <AnimatePresence mode="wait">

                        {/* M-PESA FORM */}
                        {method === "mpesa" && (
                            <motion.div
                                key="mpesa"
                                initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.97 }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                                className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
                            >
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#3a7d44] via-green-400 to-[#3a7d44]" />

                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 bg-[#3a7d44] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(58,125,68,0.3)]">
                                            <Smartphone className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-[#113255]">{t('mpesa_form_title')}</h3>
                                            <p className="text-gray-500 text-sm">{t('mpesa_form_desc')}</p>
                                        </div>
                                    </div>

                                    {mpesaStatus === "idle" && (
                                        <form onSubmit={handleMpesaSubmit} className="space-y-7 max-w-lg">
                                            <div className="space-y-3">
                                                <label className="block text-sm font-bold text-[#113255]">{t('mpesa_amount_label')}</label>
                                                <div className="grid grid-cols-4 gap-2 mb-3">
                                                    {presets.map(p => (
                                                        <button
                                                            key={p} type="button" onClick={() => setMpesaAmount(p)}
                                                            className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${mpesaAmount === p ? "bg-[#3a7d44] text-white border-[#3a7d44] shadow-md" : "bg-gray-50 text-gray-600 border-gray-100 hover:border-[#3a7d44]/40 hover:bg-green-50"}`}
                                                        >
                                                            {p} MT
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base select-none">MT</span>
                                                    <input
                                                        type="number" required min="1" placeholder={t('mpesa_amount_placeholder')}
                                                        value={mpesaAmount} onChange={(e) => setMpesaAmount(e.target.value)}
                                                        className="w-full pl-14 pr-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white transition-all text-lg font-bold text-[#113255] outline-none"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="block text-sm font-bold text-[#113255]">{t('mpesa_phone_label')}</label>
                                                <div className="relative">
                                                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-base select-none">+258</span>
                                                    <input
                                                        type="tel" required placeholder="84 / 85 xxx xxxx"
                                                        value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)}
                                                        className="w-full pl-20 pr-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 focus:bg-white transition-all text-lg font-bold text-[#113255] outline-none"
                                                    />
                                                </div>
                                            </div>

                                            {mpesaError && (
                                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-2xl text-sm font-semibold border border-red-100">
                                                    <AlertCircle className="w-5 h-5 flex-shrink-0" /> {mpesaError}
                                                </motion.div>
                                            )}

                                            <button type="submit" className="w-full bg-[#3a7d44] text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-[0_10px_30px_rgba(58,125,68,0.3)] hover:shadow-[0_15px_40px_rgba(58,125,68,0.4)] transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5">
                                                {t('mpesa_btn')} <ArrowRight className="w-5 h-5" />
                                            </button>

                                            <p className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                                                <Lock className="w-3.5 h-3.5" /> {t('mpesa_secure_text')}
                                            </p>
                                        </form>
                                    )}

                                    {mpesaStatus === "loading" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                                            <div className="relative w-20 h-20 mx-auto mb-6">
                                                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-60" />
                                                <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg border border-green-100">
                                                    <Loader2 className="w-9 h-9 text-[#3a7d44] animate-spin" />
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-black text-[#113255] mb-2">{t('mpesa_loading_title')}</h3>
                                            <p className="text-gray-500">{t('mpesa_loading_desc')}</p>
                                        </motion.div>
                                    )}

                                    {mpesaStatus === "pin_prompt" && (
                                        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center max-w-md mx-auto">
                                            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-[#3a7d44] text-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_12px_40px_rgba(58,125,68,0.35)] rotate-3">
                                                <Smartphone className="w-12 h-12 animate-bounce" />
                                            </div>
                                            <h3 className="text-3xl font-black text-[#113255] mb-2">{t('mpesa_pin_title')}</h3>
                                            <p className="text-gray-500 mb-6">{t('mpesa_pin_desc')}</p>
                                            <div className="bg-gray-50 border-2 border-gray-100 p-6 rounded-3xl mb-8">
                                                <p className="text-2xl font-black text-[#113255] mb-1">{mpesaPhone}</p>
                                                <div className="w-10 h-0.5 bg-gray-200 mx-auto my-4" />
                                                <p className="text-gray-600">
                                                    {t('mpesa_pin_inst_1')} <strong>{t('mpesa_pin_inst_strong')}</strong> {t('mpesa_pin_inst_2')}{" "}
                                                    <strong className="text-[#3a7d44]">{mpesaAmount} MT</strong>
                                                </p>
                                            </div>
                                            <button onClick={() => setMpesaStatus("idle")} className="text-gray-400 hover:text-[#113255] font-semibold text-sm underline transition-colors">
                                                {t('mpesa_cancel')}
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* BANK FORM */}
                        {method === "banco" && (
                            <motion.div
                                key="banco"
                                initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -16, scale: 0.97 }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
                                className="bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden"
                            >
                                <div className="h-1.5 w-full bg-gradient-to-r from-[#113255] via-blue-400 to-[#1a4b80]" />

                                <div className="p-8 md:p-12">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-14 h-14 bg-[#113255] rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(17,50,85,0.25)]">
                                            <Landmark className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-[#113255]">{t('bank_form_title')}</h3>
                                            <p className="text-gray-500 text-sm">{t('bank_form_desc')}</p>
                                        </div>
                                    </div>

                                    {bankStatus === "idle" && (
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="relative bg-gradient-to-br from-[#0a1f33] to-[#1a4b80] p-8 rounded-3xl text-white overflow-hidden">
                                                <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
                                                <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-[#d4af37]/10" />
                                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37]/60 via-[#d4af37] to-[#d4af37]/60" />
                                                <Landmark className="w-8 h-8 text-[#d4af37] mb-6 opacity-90 relative z-10" />
                                                <div className="relative z-10 space-y-5">
                                                    <div>
                                                        <p className="text-white/50 uppercase tracking-widest text-xs font-bold mb-1">{t('bank_holder')}</p>
                                                        <p className="text-lg font-bold">Fundação Cantoná</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-white/50 uppercase tracking-widest text-xs font-bold mb-1">{t('bank_name')}</p>
                                                        <p className="text-2xl font-mono font-bold tracking-wider">3869875910001</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-white/50 uppercase tracking-widest text-xs font-bold mb-1.5">{t('bank_nib')}</p>
                                                        <p className="text-xs font-mono tracking-widest bg-white/10 px-4 py-3 rounded-xl border border-white/15 leading-relaxed">
                                                            0034 0000 3869 8759 1015 0
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <form onSubmit={handleBankSubmit} className="flex flex-col gap-5">
                                                <label className="relative flex-grow border-2 border-dashed border-blue-200 rounded-3xl p-8 hover:bg-blue-50/50 hover:border-[#113255]/40 text-center cursor-pointer transition-all flex flex-col items-center justify-center group bg-gray-50/50 min-h-[180px]">
                                                    <input type="file" required accept="image/*,.pdf" onChange={(e) => setBankFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:bg-[#113255]">
                                                        <UploadCloud className="w-7 h-7 text-[#113255] group-hover:text-white transition-colors" />
                                                    </div>
                                                    <p className="text-[#113255] font-bold text-base mb-1">{t('bank_attach')}</p>
                                                    <p className="text-gray-400 text-sm">
                                                        {bankFile ? <span className="text-[#3a7d44] bg-green-50 px-3 py-1 rounded-full font-semibold">{bankFile.name}</span> : t('bank_file_hint')}
                                                    </p>
                                                </label>
                                                <button type="submit" className="w-full bg-[#113255] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#0a2540] shadow-[0_10px_30px_rgba(17,50,85,0.2)] hover:shadow-[0_15px_40px_rgba(17,50,85,0.3)] transition-all flex items-center justify-center gap-3 hover:-translate-y-0.5">
                                                    {t('bank_btn')} <ArrowRight className="w-5 h-5" />
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    {bankStatus === "loading" && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                                            <Loader2 className="w-14 h-14 text-[#113255] animate-spin mx-auto mb-5" />
                                            <h3 className="text-xl font-black text-[#113255]">{t('bank_loading')}</h3>
                                        </motion.div>
                                    )}

                                    {bankStatus === "success" && (
                                        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                            <div className="w-24 h-24 bg-gradient-to-br from-[#113255] to-[#1a4b80] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_12px_40px_rgba(17,50,85,0.3)] -rotate-3">
                                                <CheckCircle2 className="w-12 h-12 text-white" />
                                            </div>
                                            <h3 className="text-4xl font-black text-[#113255] mb-3">{t('bank_success_title')}</h3>
                                            <p className="text-gray-500 text-lg mb-8 max-w-sm mx-auto leading-relaxed">{t('bank_success_desc')}</p>
                                            <button onClick={() => { setMethod(null); setBankFile(null); setBankStatus("idle"); }} className="text-[#113255] font-bold text-base hover:underline decoration-2 underline-offset-4">
                                                {t('bank_new_donation')}
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* EMPTY STATE */}
                        {!method && (
                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                                <p className="text-gray-400 font-medium flex items-center justify-center gap-2 text-base">
                                    <Sparkles className="w-4 h-4" /> {t('empty_state')}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
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