"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Volume2, VolumeX } from "lucide-react";
import { useTranslations } from 'next-intl';

// Mini-componente inteligente para controlar o vídeo e o som
const VideoPlayer = ({ src }: { src: string }) => {
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleMute = (e: React.MouseEvent) => {
        e.preventDefault();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                loop
                muted={true}
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={src}
            />
            <button
                onClick={toggleMute}
                className="absolute top-6 right-6 z-20 bg-black/40 hover:bg-[#3a7d44] text-white p-2.5 rounded-full backdrop-blur-sm transition-all shadow-lg border border-white/20"
                aria-label="Ligar/Desligar som"
            >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
        </>
    );
};

export default function ImpactSection() {
    const t = useTranslations('Impact');

    // Movemos os dados para DENTRO da função para o tradutor conseguir ler
    const impactData = [
        {
            id: 1,
            tag: t('item1_tag'),
            title: t('item1_title'),
            desc: t('item1_desc'),
            date: t('item1_date'),
            video: "/doacao.mp4",
            size: "md:col-span-2 md:row-span-2",
        },
        {
            id: 2,
            tag: t('item2_tag'),
            title: t('item2_title'),
            desc: t('item2_desc'),
            date: t('item2_date'),
            image: "https://i.imgur.com/BQ4K045.jpeg",
            size: "col-span-1",
        },
        {
            id: 3,
            tag: t('item3_tag'),
            title: t('item3_title'),
            desc: t('item3_desc'),
            date: t('item3_date'),
            image: "https://i.imgur.com/kmk0eh0.jpeg",
            size: "col-span-1",
        },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-[#f8fafc] text-[#113255] px-4 py-2 rounded-full text-sm font-semibold border border-gray-100 shadow-sm"
                    >
                        <span className="text-[#3a7d44]">⚡</span> {t('badge')}
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-extrabold text-[#113255]"
                    >
                        {t('title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600"
                    >
                        {t('subtitle')}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
                    {impactData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${item.size}`}
                        >
                            {item.video ? (
                                <VideoPlayer src={item.video} />
                            ) : (
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-[#113255]/95 via-[#113255]/50 to-transparent" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 pointer-events-none">
                                <div className="self-start bg-white/95 text-[#113255] px-3 py-1.5 rounded-lg text-xs font-bold mb-auto mt-2 shadow-sm pointer-events-auto">
                                    {item.tag}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                                    {item.title}
                                </h3>

                                <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                                    {item.desc}
                                </p>

                                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/20 pointer-events-auto">
                                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium">
                                        <Calendar className="w-4 h-4" />
                                        {item.date}
                                    </div>
                                    <div className="flex items-center gap-1 text-white text-sm font-semibold group-hover:text-[#d4af37] transition-colors cursor-pointer">
                                        {t('read_more')} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}