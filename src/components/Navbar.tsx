"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, X, Globe } from "lucide-react";
import { useTranslations, useLocale } from 'next-intl';

export default function Navbar() {
    const t = useTranslations('Menu');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLanguageChange = (newLocale: string) => {
        // Remove a língua antiga do link e coloca a nova
        const currentPathname = pathname;
        const newPath = currentPathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
        setIsLangOpen(false);
    };

    const isOverlay = !isScrolled && !isOpen;
    const navBackground = isOverlay ? "bg-transparent py-4" : "bg-white shadow-sm border-b border-gray-100 py-2";
    const linkColor = isOverlay ? "text-white hover:text-gray-200 drop-shadow-md" : "text-gray-600 hover:text-[#3a7d44]";
    const activeLinkColor = isOverlay ? "text-white font-bold drop-shadow-md" : "text-[#113255] font-bold hover:text-[#3a7d44]";

    // Lista de Idiomas Premium
    const languages = [
        { code: 'pt', name: 'Português', flag: '🇲🇿' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
        { code: 'ar', name: 'العربية', flag: '🇦🇪' }
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className={`flex items-center rounded-xl transition-all ${isOverlay ? "bg-white/10 backdrop-blur-md px-3 py-2 shadow-sm" : ""}`}>
                            <Image src="/logo.png" alt="Fundação Cantoná" width={220} height={70} className="h-10 w-auto object-contain" priority />
                        </Link>
                    </div>

                    {/* Links Desktop */}
                    <div className="hidden lg:flex space-x-8">
                        <Link href="/" className={`font-semibold transition-colors ${pathname === `/${locale}` ? activeLinkColor : linkColor}`}>{t('inicio')}</Link>
                        <Link href="/sobre" className={`font-medium transition-colors ${pathname.includes("/sobre") ? activeLinkColor : linkColor}`}>{t('sobre')}</Link>
                        <Link href="/trabalhos" className={`font-medium transition-colors ${pathname.includes("/trabalhos") ? activeLinkColor : linkColor}`}>{t('impacto')}</Link>
                        <Link href="/doar" className={`font-medium transition-colors ${pathname.includes("/doar") ? activeLinkColor : linkColor}`}>{t('doacoes')}</Link>
                        <Link href="/contacto" className={`font-medium transition-colors ${pathname.includes("/contacto") ? activeLinkColor : linkColor}`}>{t('contacto')}</Link>
                    </div>

                    {/* Lado Direito: Idiomas + Botão Doar */}
                    <div className="flex items-center gap-4">

                        {/* NOVO SELETOR DE IDIOMA PREMIUM */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-2 uppercase text-sm font-bold px-4 py-2.5 rounded-full transition-all shadow-sm ${isOverlay ? "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md" : "bg-white text-[#113255] border border-gray-200 hover:border-gray-300 hover:shadow-md"}`}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{locale}</span>
                            </button>

                            {/* Dropdown com Bandeiras */}
                            {isLangOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-2 z-50 flex flex-col gap-1">
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => handleLanguageChange(lang.code)}
                                            className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-bold flex items-center gap-3 transition-colors ${locale === lang.code ? "bg-[#f0f9f4] text-[#3a7d44]" : "text-gray-500 hover:bg-gray-50 hover:text-[#113255]"}`}
                                        >
                                            <span className="text-xl drop-shadow-sm">{lang.flag}</span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Botão Doar */}
                        <Link
                            href="/doar"
                            className={`hidden sm:inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all shadow-md ${isOverlay ? "bg-white text-[#3a7d44] hover:bg-gray-50 hover:scale-105" : "bg-[#3a7d44] text-white hover:bg-opacity-90 hover:shadow-lg hover:-translate-y-0.5"}`}
                        >
                            {t('doar_btn')}
                            <Heart className={`w-4 h-4 ${isOverlay ? "fill-[#3a7d44]" : "fill-white"}`} />
                        </Link>

                        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-lg transition-colors focus:outline-none">
                            {isOpen ? <X className="w-8 h-8 text-[#113255]" /> : <Menu className={`w-8 h-8 ${isOverlay ? "text-white" : "text-[#113255]"}`} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pt-4 pb-8 space-y-3">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('inicio')}</Link>
                    <Link href="/sobre" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('sobre')}</Link>
                    <Link href="/trabalhos" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('impacto')}</Link>
                    <Link href="/doar" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('doacoes')}</Link>
                    <Link href="/contacto" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">{t('contacto')}</Link>
                    <div className="pt-4">
                        <Link href="/doar" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#3a7d44] text-white w-full py-4 rounded-2xl font-bold">
                            {t('doar_btn')} <Heart className="w-5 h-5 fill-current" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}