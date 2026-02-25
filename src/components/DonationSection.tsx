"use client";

import { motion } from "framer-motion";
import { Smartphone, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DonationSection() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Cabeçalho da Secção */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#fdf8e7] text-[#d4af37] px-4 py-2 rounded-full text-sm font-bold shadow-sm"
                    >
                        <span>♥</span> Sua Ajuda é Fundamental
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#113255]"
                    >
                        Formas de Contribuir
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        Escolha o método mais conveniente para si. Todo o processo é seguro e transparente.
                    </motion.p>
                </div>

                {/* Grelha com apenas 2 Métodos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Cartão M-Pesa Interativo */}
                    <Link href="/doar">
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white rounded-[40px] p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center cursor-pointer group transition-all"
                        >
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                <Smartphone className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#113255] mb-2">M-Pesa</h3>
                            <p className="text-gray-500 mb-8">Faça a sua doação instantânea inserindo o seu número e valor.</p>

                            <div className="flex items-center gap-2 text-green-600 font-bold group-hover:gap-4 transition-all">
                                Doar Agora <ArrowRight className="w-5 h-5" />
                            </div>
                        </motion.div>
                    </Link>

                    {/* Cartão Transferência Bancária Interativo */}
                    <Link href="/doar">
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-white rounded-[40px] p-10 shadow-lg border border-gray-100 flex flex-col items-center text-center cursor-pointer group transition-all"
                        >
                            <div className="w-20 h-20 bg-blue-50 text-[#113255] rounded-3xl flex items-center justify-center mb-6 group-hover:bg-[#113255] group-hover:text-white transition-colors">
                                <Landmark className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#113255] mb-2">Transferência</h3>
                            <p className="text-gray-500 mb-8">Acesse os dados bancários e envie o comprovativo para validação.</p>

                            <div className="flex items-center gap-2 text-[#113255] font-bold group-hover:gap-4 transition-all">
                                Ver Dados <ArrowRight className="w-5 h-5" />
                            </div>
                        </motion.div>
                    </Link>

                </div>
            </div>
        </section>
    );
}