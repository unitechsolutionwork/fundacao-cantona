"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Contacto() {
    // Variáveis de animação para os elementos irem surgindo aos poucos
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as const } // <- CORRIGIDO
        }
    };

    return (
        <main className="min-h-screen bg-[#f8fafc]">
            {/* Navbar no topo, garantindo que fica sobreposto */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* --- HERO BANNER (Consistente com Impacto e Doações) --- */}
            <div className="relative min-h-[50vh] w-full overflow-hidden flex flex-col items-center justify-center text-center -mt-28 pt-32 pb-20 z-10">
                {/* Imagem de Fundo (Exemplo de uma reunião comunitária ou equipa) */}
                <img
                    src="https://i.imgur.com/GNv4wDa.jpeg"
                    className="absolute inset-0 w-full h-full object-cover -z-20"
                    alt="Contacte a Fundação Cantoná"
                />

                {/* Overlay Escuro */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#113255]/90 via-[#113255]/70 to-[#113255]/95 -z-10" />

                {/* Conteúdo do Hero animado */}
                <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold border border-white/20 shadow-lg mb-6"
                    >
                        <MessageCircle className="w-4 h-4 text-[#d4af37]" /> Estamos Aqui
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl"
                    >
                        Fale <span className="text-[#3a7d44]">Connosco</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md"
                    >
                        Tem alguma dúvida ou deseja colaborar com a Fundação Cantoná?
                        A nossa equipa está pronta para o atender e construir pontes de esperança consigo.
                    </motion.p>
                </div>
            </div>

            {/* --- SECÇÃO DE CONTACTO (Animada) --- */}
            <section className="relative py-20 pb-32 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-16"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* COLUNA ESQUERDA: INFORMAÇÕES DE CONTACTO */}
                        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-8">
                            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-white/60">
                                <div className="space-y-8">

                                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 transition-transform">
                                        <div className="w-14 h-14 bg-blue-50 text-[#113255] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#113255] uppercase tracking-wider text-xs mb-1">Telefone</h4>
                                            <p className="text-gray-600 font-medium text-lg">+258 84 372 3482</p>
                                        </div>
                                    </motion.div>

                                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 transition-transform">
                                        <div className="w-14 h-14 bg-green-50 text-[#3a7d44] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#113255] uppercase tracking-wider text-xs mb-1">E-mail</h4>
                                            <p className="text-gray-600 font-medium">geral@fundacaocantona.org.mz</p>
                                        </div>
                                    </motion.div>

                                    <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 transition-transform">
                                        <div className="w-14 h-14 bg-yellow-50 text-[#d4af37] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div className="pt-1">
                                            <h4 className="font-bold text-[#113255] uppercase tracking-wider text-xs mb-1">Localização</h4>
                                            <p className="text-gray-600 font-medium">Maputo, Moçambique</p>
                                        </div>
                                    </motion.div>
                                </div>

                                <hr className="my-8 border-gray-100" />

                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href="https://wa.me/258843723482"
                                    target="_blank"
                                    className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <MessageCircle className="w-6 h-6" /> Conversar no WhatsApp
                                </motion.a>
                            </div>
                        </motion.div>

                        {/* COLUNA DIREITA: FORMULÁRIO DE MENSAGEM */}
                        <motion.div variants={itemVariants} className="lg:col-span-2">
                            <form className="bg-white/90 backdrop-blur-xl p-10 md:p-12 rounded-[40px] shadow-2xl border border-white/60 space-y-8">
                                <div className="mb-4">
                                    <h3 className="text-3xl font-extrabold text-[#113255] mb-2">Envie-nos uma Mensagem</h3>
                                    <p className="text-gray-500">Preencha o formulário abaixo e responderemos o mais breve possível.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#113255] ml-2">Nome Completo</label>
                                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 outline-none transition-all font-medium" placeholder="O seu nome" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-[#113255] ml-2">E-mail</label>
                                        <input type="email" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 outline-none transition-all font-medium" placeholder="exemplo@mail.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#113255] ml-2">Assunto</label>
                                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 outline-none transition-all font-medium" placeholder="Como podemos ajudar?" />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-[#113255] ml-2">Mensagem</label>
                                    <textarea rows={5} className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-[#3a7d44] focus:ring-4 focus:ring-[#3a7d44]/10 outline-none transition-all resize-none font-medium" placeholder="Escreva aqui a sua mensagem..."></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full md:w-auto px-10 bg-[#113255] text-white py-5 rounded-2xl font-bold text-lg hover:bg-[#1a4b80] shadow-[0_10px_30px_rgba(17,50,85,0.2)] hover:shadow-[0_15px_40px_rgba(17,50,85,0.3)] transition-all flex items-center justify-center gap-3 ml-auto"
                                >
                                    Enviar Mensagem <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>

                    </motion.div>
                </div>
            </section>
        </main>
    );
}