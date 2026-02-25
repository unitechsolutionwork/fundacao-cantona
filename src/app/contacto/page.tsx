"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Contacto() {
    return (
        <main className="min-h-screen bg-[#f8fafc] pt-20">
            <Navbar />

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-5xl font-extrabold text-[#113255] mb-6">Fale Connosco</h1>
                        <p className="text-xl text-gray-600">
                            Tem alguma dúvida ou deseja colaborar com a Fundação Cantoná?
                            A nossa equipa está pronta para o atender.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* INFORMAÇÕES DE CONTACTO */}
                        <div className="lg:col-span-1 space-y-8">
                            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-50 text-[#113255] rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#113255]">Telefone</h4>
                                            <p className="text-gray-600">+258 84 372 3482</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-green-50 text-[#3a7d44] rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#113255]">E-mail</h4>
                                            <p className="text-gray-600">geral@fundacaocantona.org.mz</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-yellow-50 text-[#d4af37] rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#113255]">Localização</h4>
                                            <p className="text-gray-600">Maputo, Moçambique</p>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-8 border-gray-100" />

                                <a
                                    href="https://wa.me/258843723482"
                                    target="_blank"
                                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:opacity-90 transition-all"
                                >
                                    <MessageCircle className="w-5 h-5" /> Conversar no WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* FORMULÁRIO DE MENSAGEM */}
                        <div className="lg:col-span-2">
                            <form className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-[#113255] mb-2">Nome Completo</label>
                                        <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#3a7d44] outline-none transition-all" placeholder="Seu nome" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#113255] mb-2">E-mail</label>
                                        <input type="email" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#3a7d44] outline-none transition-all" placeholder="exemplo@mail.com" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#113255] mb-2">Assunto</label>
                                    <input type="text" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#3a7d44] outline-none transition-all" placeholder="Como podemos ajudar?" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#113255] mb-2">Mensagem</label>
                                    <textarea rows={5} className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#3a7d44] outline-none transition-all resize-none" placeholder="Escreva aqui a sua mensagem..."></textarea>
                                </div>
                                <button type="submit" className="w-full bg-[#113255] text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-95 shadow-lg flex items-center justify-center gap-2">
                                    Enviar Mensagem <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}