"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Landmark, UploadCloud, CheckCircle2, Loader2, Lock, ArrowRight, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Doacoes() {
    // Estados de controle global
    const [method, setMethod] = useState<"mpesa" | "banco" | null>(null);

    // Estados para o formulário M-Pesa
    const [mpesaAmount, setMpesaAmount] = useState("");
    const [mpesaPhone, setMpesaPhone] = useState("");
    const [mpesaStatus, setMpesaStatus] = useState<"idle" | "loading" | "pin_prompt">("idle");
    const [mpesaError, setMpesaError] = useState("");

    // Estados para o formulário Banco
    const [bankFile, setBankFile] = useState<File | null>(null);
    const [bankStatus, setBankStatus] = useState<"idle" | "loading" | "success">("idle");

    // CHAMADA REAL À API E2PAYMENTS (Via nossa Route Handler segura)
    const handleMpesaSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMpesaStatus("loading");
        setMpesaError("");

        try {
            const res = await fetch('/api/mpesa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: mpesaPhone,
                    amount: mpesaAmount
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error?.message || "Falha ao iniciar pagamento. Verifique o número e tente novamente.");
            }

            // Sucesso na API: Mostra instrução para digitar o PIN no telemóvel
            setMpesaStatus("pin_prompt");

        } catch (err: any) {
            setMpesaStatus("idle");
            setMpesaError(err.message || "Ocorreu um erro ao processar o pagamento.");
        }
    };

    // Simulação do Envio do Comprovativo Bancário
    const handleBankSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setBankStatus("loading");

        // Simula upload para o servidor
        setTimeout(() => {
            setBankStatus("success");
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc] pt-20">
            <Navbar />

            {/* Cabeçalho */}
            <section className="py-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-[#fdf8e7] text-[#d4af37] px-4 py-2 rounded-full text-sm font-bold shadow-sm mb-6"
                    >
                        <Lock className="w-4 h-4" /> Pagamento 100% Seguro
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#113255] mb-6 tracking-tight"
                    >
                        Sua Doação Transforma Vidas
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Escolha o método de sua preferência. Cada contribuição é um passo rumo à transformação social em Moçambique.
                    </motion.p>
                </div>
            </section>

            {/* Área de Seleção e Formulários */}
            <section className="py-16 pb-32">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Métodos de Pagamento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("mpesa"); setMpesaStatus("idle"); setMpesaError(""); }}
                            className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-4 ${method === "mpesa"
                                    ? "border-green-500 bg-green-50/30 shadow-lg"
                                    : "border-gray-200 bg-white hover:border-green-200"
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${method === "mpesa" ? "bg-green-500 text-white" : "bg-green-50 text-green-600"}`}>
                                <Smartphone className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#113255]">M-Pesa</h3>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("banco"); setBankStatus("idle"); }}
                            className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-4 ${method === "banco"
                                    ? "border-[#113255] bg-blue-50/30 shadow-lg"
                                    : "border-gray-200 bg-white hover:border-blue-200"
                                }`}
                        >
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${method === "banco" ? "bg-[#113255] text-white" : "bg-blue-50 text-[#113255]"}`}>
                                <Landmark className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-[#113255]">Transferência</h3>
                        </motion.button>
                    </div>

                    <AnimatePresence mode="wait">
                        {/* FORMULÁRIO MPESA */}
                        {method === "mpesa" && (
                            <motion.div
                                key="mpesa"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-gray-100"
                            >
                                {mpesaStatus === "idle" && (
                                    <form onSubmit={handleMpesaSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[#113255] mb-2">Valor (MT)</label>
                                            <input
                                                type="number" required min="1" placeholder="Ex: 1000"
                                                value={mpesaAmount} onChange={(e) => setMpesaAmount(e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-lg"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#113255] mb-2">Número M-Pesa</label>
                                            <input
                                                type="tel" required placeholder="84/85 xxxxxxx"
                                                value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)}
                                                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all text-lg"
                                            />
                                        </div>
                                        {mpesaError && (
                                            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl text-sm font-medium">
                                                <AlertCircle className="w-5 h-5" /> {mpesaError}
                                            </div>
                                        )}
                                        <button type="submit" className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-700 shadow-lg flex items-center justify-center gap-2">
                                            Confirmar Doação <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </form>
                                )}

                                {mpesaStatus === "loading" && (
                                    <div className="py-12 text-center">
                                        <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-[#113255]">Processando Pedido...</h3>
                                        <p className="text-gray-500">Aguarde a resposta da operadora</p>
                                    </div>
                                )}

                                {mpesaStatus === "pin_prompt" && (
                                    <div className="py-8 text-center">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Smartphone className="w-10 h-10 animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#113255] mb-4">Verifique seu Telemóvel</h3>
                                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 mb-6">
                                            <p className="text-gray-600 leading-relaxed">
                                                Enviámos um pedido para o número <strong>{mpesaPhone}</strong>. <br />
                                                Introduza o seu <strong>PIN M-Pesa</strong> para autorizar o pagamento de <strong>{mpesaAmount} MT</strong>.
                                            </p>
                                        </div>
                                        <button onClick={() => setMpesaStatus("idle")} className="text-gray-400 hover:text-[#113255] underline text-sm">Tentar outro número</button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* FORMULÁRIO BANCO */}
                        {method === "banco" && (
                            <motion.div
                                key="banco"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-gray-100"
                            >
                                {bankStatus === "idle" && (
                                    <div className="space-y-8">
                                        <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200">
                                            <h4 className="font-bold text-[#113255] mb-4 flex items-center gap-2"><Landmark className="w-5 h-5 text-[#3a7d44]" /> Dados Moza Banco</h4>
                                            <p className="text-sm text-gray-600"><strong>Titular:</strong> Fundação Cantoná</p>
                                            <p className="text-sm text-gray-600"><strong>Conta:</strong> 3869875910001</p>
                                            <p className="text-sm text-gray-600"><strong>NIB:</strong> 0034 0000 3869 8759 1015 0</p>
                                        </div>
                                        <form onSubmit={handleBankSubmit} className="space-y-6">
                                            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:bg-gray-50 text-center cursor-pointer">
                                                <input type="file" required accept="image/*,.pdf" onChange={(e) => setBankFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                                <UploadCloud className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                                                <p className="text-gray-500 font-medium">{bankFile ? bankFile.name : "Anexe o Comprovativo (PDF ou Imagem)"}</p>
                                            </div>
                                            <button type="submit" className="w-full bg-[#113255] text-white py-4 rounded-2xl font-bold hover:bg-opacity-90 shadow-lg">Enviar Comprovativo</button>
                                        </form>
                                    </div>
                                )}

                                {bankStatus === "success" && (
                                    <div className="py-12 text-center">
                                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
                                        <h3 className="text-3xl font-black text-[#113255] mb-2">Obrigado!</h3>
                                        <p className="text-gray-500">Recebemos o seu comprovativo com sucesso.</p>
                                        <button onClick={() => setMethod(null)} className="mt-8 text-[#3a7d44] font-bold">Voltar ao Início</button>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}