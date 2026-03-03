"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Landmark, UploadCloud, CheckCircle2, Loader2, Lock, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";

// Componente para luzes de fundo dinâmicas na área do formulário
const AnimatedFormBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-[10%] w-[400px] h-[400px] rounded-full bg-green-400/10 blur-[100px]"
        />
        <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]"
        />
    </div>
);

export default function Doacoes() {
    // Estados de controle global
    const [method, setMethod] = useState<"mpesa" | "banco" | null>(null);

    // Estados para o formulário M-Pesa
    const [mpesaAmount, setMpesaAmount] = useState("");
    const [mpesaPhone, setMpesaPhone] = useState("");
    const [mpesaStatus, setMpesaStatus] = useState("idle");
    const [mpesaError, setMpesaError] = useState("");

    // Estados para o formulário Banco
    const [bankFile, setBankFile] = useState<File | null>(null);
    const [bankStatus, setBankStatus] = useState("idle");

    // CHAMADA REAL À API E2PAYMENTS
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
        setTimeout(() => {
            setBankStatus("success");
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-[#f8fafc]">
            {/* Navbar no topo, transparente sobre a imagem */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* --- HERO BANNER (Estilo da página Impacto) --- */}
            <div className="relative min-h-[60vh] w-full overflow-hidden flex flex-col items-center justify-center text-center -mt-28 pt-32 pb-32 z-10">
                {/* Imagem de Fundo (Pode trocar o link pela imagem que preferir) */}
                <img
                    src="https://i.imgur.com/4UBkLJM.jpeg"
                    className="absolute inset-0 w-full h-full object-cover -z-20"
                    alt="Faça a sua doação"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/95 via-[#113255]/85 to-[#113255]/95 -z-10" />

                <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md text-green-300 px-5 py-2 rounded-full text-sm font-semibold border border-green-500/30 shadow-lg mb-8"
                    >
                        <ShieldCheck className="w-4 h-4" /> Pagamento 100% Seguro
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-tight drop-shadow-xl"
                    >
                        Sua Doação <span className="text-[#d4af37]">Transforma</span> Vidas
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md"
                    >
                        Escolha o método de sua preferência. Cada contribuição é um passo rumo à transformação social em Moçambique.
                    </motion.p>
                </div>
            </div>

            {/* --- ÁREA DE SELEÇÃO E FORMULÁRIOS --- */}
            <section className="relative pb-32 z-20">
                <AnimatedFormBackground />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* Cartões de Método (Flutuando sobre a borda do Hero -mt-24) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 -mt-24 mb-16">
                        {/* Cartão M-Pesa */}
                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("mpesa"); setMpesaStatus("idle"); setMpesaError(""); }}
                            className={`p-8 md:p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 bg-white/90 backdrop-blur-xl shadow-2xl ${method === "mpesa"
                                ? "border-green-500 ring-4 ring-green-500/20"
                                : "border-transparent hover:border-green-200"
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 shadow-inner ${method === "mpesa" ? "bg-green-500 text-white" : "bg-green-50 text-green-600"
                                }`}>
                                <Smartphone className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-[#113255]">M-Pesa</h3>
                            <p className="text-gray-500 font-medium">Doação instantânea via telemóvel.</p>

                            {/* Bolinha verde indicadora */}
                            <div className={`w-3 h-3 rounded-full mt-2 transition-colors ${method === "mpesa" ? "bg-green-500" : "bg-gray-200"}`} />
                        </motion.button>

                        {/* Cartão Transferência */}
                        <motion.button
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { setMethod("banco"); setBankStatus("idle"); }}
                            className={`p-8 md:p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center text-center gap-4 bg-white/90 backdrop-blur-xl shadow-2xl ${method === "banco"
                                ? "border-[#113255] ring-4 ring-[#113255]/20"
                                : "border-transparent hover:border-blue-200"
                                }`}
                        >
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-300 shadow-inner ${method === "banco" ? "bg-[#113255] text-white" : "bg-blue-50 text-[#113255]"
                                }`}>
                                <Landmark className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-black text-[#113255]">Transferência</h3>
                            <p className="text-gray-500 font-medium">Envie o comprovativo bancário.</p>

                            {/* Bolinha azul indicadora */}
                            <div className={`w-3 h-3 rounded-full mt-2 transition-colors ${method === "banco" ? "bg-[#113255]" : "bg-gray-200"}`} />
                        </motion.button>
                    </div>

                    {/* Área do Formulário Animada */}
                    <AnimatePresence mode="wait">

                        {/* --- FORMULÁRIO MPESA --- */}
                        {method === "mpesa" && (
                            <motion.div
                                key="mpesa"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                                className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="text-3xl font-black text-[#113255] mb-2">Pagamento M-Pesa</h3>
                                    <p className="text-gray-500">Insira os dados para processar a doação de forma segura.</p>
                                </div>

                                {mpesaStatus === "idle" && (
                                    <form onSubmit={handleMpesaSubmit} className="space-y-6 max-w-lg mx-auto">
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-[#113255] ml-2">Valor da Doação (MT)</label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">MT</span>
                                                <input
                                                    type="number" required min="1" placeholder="Ex: 1000"
                                                    value={mpesaAmount} onChange={(e) => setMpesaAmount(e.target.value)}
                                                    className="w-full pl-16 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-xl font-bold text-[#113255] outline-none shadow-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-[#113255] ml-2">Número de Telemóvel M-Pesa</label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">+258</span>
                                                <input
                                                    type="tel" required placeholder="84 / 85 xxx xxxx"
                                                    value={mpesaPhone} onChange={(e) => setMpesaPhone(e.target.value)}
                                                    className="w-full pl-20 pr-6 py-5 bg-white border-2 border-gray-100 rounded-2xl focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-xl font-bold text-[#113255] outline-none shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {mpesaError && (
                                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-600 bg-red-50 p-5 rounded-2xl text-sm font-bold border border-red-100">
                                                <AlertCircle className="w-6 h-6 flex-shrink-0" /> {mpesaError}
                                            </motion.div>
                                        )}

                                        <button type="submit" className="w-full bg-green-500 text-white py-5 rounded-2xl font-bold text-xl hover:bg-green-600 shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_15px_40px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-3 mt-4 hover:-translate-y-1">
                                            Doar Agora <ArrowRight className="w-6 h-6" />
                                        </button>

                                        <div className="flex items-center justify-center gap-2 mt-6 opacity-60">
                                            <Lock className="w-4 h-4 text-[#113255]" />
                                            <span className="text-xs font-semibold text-[#113255] uppercase tracking-wider">Transação Encriptada e Segura</span>
                                        </div>
                                    </form>
                                )}

                                {mpesaStatus === "loading" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                                        <div className="relative w-24 h-24 mx-auto mb-8">
                                            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75" />
                                            <div className="relative bg-white rounded-full w-full h-full flex items-center justify-center shadow-lg border border-green-100">
                                                <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-black text-[#113255] mb-2">Processando Pedido...</h3>
                                        <p className="text-gray-500 text-lg">A comunicar com a operadora, por favor aguarde.</p>
                                    </motion.div>
                                )}

                                {mpesaStatus === "pin_prompt" && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center max-w-md mx-auto">
                                        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                                            <Smartphone className="w-12 h-12 animate-bounce" />
                                        </div>
                                        <h3 className="text-3xl font-black text-[#113255] mb-6">Verifique o seu Telemóvel</h3>
                                        <div className="bg-[#f8fafc] p-8 rounded-3xl border border-gray-100 mb-8 shadow-inner">
                                            <p className="text-gray-600 leading-relaxed text-lg">
                                                Enviámos um pedido para o número <br /><span className="text-2xl font-black text-[#113255] mt-2 block">{mpesaPhone}</span>
                                            </p>
                                            <div className="w-16 h-1 bg-gray-200 mx-auto my-6 rounded-full" />
                                            <p className="text-gray-600 text-lg">
                                                Introduza o seu <strong>PIN M-Pesa</strong> no telemóvel para autorizar a doação de <strong className="text-green-600">{mpesaAmount} MT</strong>.
                                            </p>
                                        </div>
                                        <button onClick={() => setMpesaStatus("idle")} className="text-gray-400 hover:text-[#113255] font-semibold underline transition-colors">Cancelar ou tentar outro número</button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* --- FORMULÁRIO BANCO --- */}
                        {method === "banco" && (
                            <motion.div
                                key="banco"
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                                className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white"
                            >
                                <div className="text-center mb-10">
                                    <h3 className="text-3xl font-black text-[#113255] mb-2">Transferência Bancária</h3>
                                    <p className="text-gray-500">Utilize os dados abaixo e envie-nos o comprovativo.</p>
                                </div>

                                {bankStatus === "idle" && (
                                    <div className="max-w-2xl mx-auto grid md:grid-cols-2 gap-8">
                                        {/* Cartão de Dados Bancários (Estilo "Bilhete") */}
                                        <div className="bg-gradient-to-br from-[#113255] to-[#1a4b80] p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />
                                            <Landmark className="w-8 h-8 text-[#d4af37] mb-6 opacity-80" />
                                            <h4 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Titular da Conta</h4>
                                            <p className="text-xl font-bold mb-6">Fundação Cantoná</p>

                                            <h4 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">Moza Banco (Conta)</h4>
                                            <p className="text-2xl font-mono mb-6 tracking-wider">3869875910001</p>

                                            <h4 className="font-bold text-white/60 uppercase tracking-widest text-xs mb-2">NIB</h4>
                                            <p className="text-sm font-mono tracking-widest bg-white/10 p-3 rounded-xl border border-white/20">0034 0000 3869 8759 1015 0</p>
                                        </div>

                                        {/* Área de Upload */}
                                        <form onSubmit={handleBankSubmit} className="flex flex-col justify-between space-y-6">
                                            <div className="relative flex-grow border-2 border-dashed border-blue-200 rounded-3xl p-8 hover:bg-blue-50 hover:border-blue-400 text-center cursor-pointer transition-all flex flex-col items-center justify-center group bg-[#f8fafc]">
                                                <input type="file" required accept="image/*,.pdf" onChange={(e) => setBankFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                                    <UploadCloud className="w-8 h-8 text-[#113255]" />
                                                </div>
                                                <p className="text-[#113255] font-bold text-lg mb-2">Anexar Comprovativo</p>
                                                <p className="text-gray-500 text-sm font-medium px-4">
                                                    {bankFile ? <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">{bankFile.name}</span> : "Clique ou arraste o ficheiro (PDF/IMG)"}
                                                </p>
                                            </div>
                                            <button type="submit" className="w-full bg-[#113255] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#1a4b80] shadow-[0_10px_30px_rgba(17,50,85,0.2)] hover:shadow-[0_15px_40px_rgba(17,50,85,0.3)] transition-all flex items-center justify-center gap-3 hover:-translate-y-1">
                                                Enviar Confirmação
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {bankStatus === "loading" && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
                                        <Loader2 className="w-16 h-16 text-[#113255] animate-spin mx-auto mb-6" />
                                        <h3 className="text-2xl font-black text-[#113255]">Enviando documento...</h3>
                                    </motion.div>
                                )}

                                {bankStatus === "success" && (
                                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
                                        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 className="w-16 h-16 text-[#113255]" />
                                        </div>
                                        <h3 className="text-4xl font-black text-[#113255] mb-4">Mundo Melhor!</h3>
                                        <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto">Recebemos o seu comprovativo com sucesso. Muito obrigado por ajudar a Fundação Cantoná.</p>
                                        <button onClick={() => { setMethod(null); setBankFile(null); }} className="text-[#113255] font-bold text-lg hover:underline decoration-2 underline-offset-4">Fazer nova doação</button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </main>
    );
}