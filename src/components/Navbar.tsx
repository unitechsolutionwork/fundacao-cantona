"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart, Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu mobile
    const pathname = usePathname();

    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lógica de fundo: fica branco se o menu estiver aberto ou se houver scroll
    const navBackground = (isHome && !isScrolled && !isOpen)
        ? "bg-transparent py-4"
        : "bg-white shadow-sm border-b border-gray-100 py-2";

    const linkColor = (isHome && !isScrolled && !isOpen)
        ? "text-white hover:text-gray-200 drop-shadow-md"
        : "text-gray-600 hover:text-[#3a7d44]";

    const activeLinkColor = (isHome && !isScrolled && !isOpen)
        ? "text-white hover:text-gray-200 drop-shadow-md"
        : "text-[#113255] hover:text-[#3a7d44]";

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Oficial */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className={`flex items-center rounded-xl transition-all ${isHome && !isScrolled && !isOpen ? "bg-white/20 backdrop-blur-md px-3 py-1.5" : ""}`}>
                            <Image
                                src="/logo.png"
                                alt="Logótipo Fundação Cantoná"
                                width={220}
                                height={70}
                                className="h-12 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Links Centrais (Desktop) */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className={`font-semibold transition-colors ${pathname === "/" ? activeLinkColor : linkColor}`}>Início</Link>
                        <Link href="/sobre" className={`font-medium transition-colors ${pathname === "/sobre" ? activeLinkColor : linkColor}`}>Sobre Nós</Link>
                        <Link href="/trabalhos" className={`font-medium transition-colors ${pathname === "/trabalhos" ? activeLinkColor : linkColor}`}>Impacto</Link>
                        <Link href="/doar" className={`font-medium transition-colors ${pathname === "/doar" ? activeLinkColor : linkColor}`}>Doações</Link>
                        <Link href="/contacto" className={`font-medium transition-colors ${pathname === "/contacto" ? activeLinkColor : linkColor}`}>Contacto</Link>
                    </div>

                    {/* Botão Doar e Botão Menu (Mobile) */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/doar"
                            className="hidden sm:inline-flex items-center gap-2 bg-[#3a7d44] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md"
                        >
                            Doar Agora
                            <Heart className="w-4 h-4 fill-current" />
                        </Link>

                        {/* Ícone Hamburger apenas para Mobile */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 rounded-lg transition-colors focus:outline-none"
                        >
                            {isOpen ? (
                                <X className="w-8 h-8 text-[#113255]" />
                            ) : (
                                <Menu className={`w-8 h-8 ${linkColor}`} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menu Mobile (Dropdown) */}
            <div className={`md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-4 pt-4 pb-8 space-y-3">
                    <Link href="/" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">Início</Link>
                    <Link href="/sobre" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">Sobre Nós</Link>
                    <Link href="/trabalhos" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">Impacto</Link>
                    <Link href="/doar" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">Doações</Link>
                    <Link href="/contacto" onClick={() => setIsOpen(false)} className="block p-3 text-lg font-bold text-[#113255] hover:bg-gray-50 rounded-xl">Contacto</Link>
                    <div className="pt-4">
                        <Link href="/doar" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#3a7d44] text-white w-full py-4 rounded-2xl font-bold">
                            Doar Agora <Heart className="w-5 h-5 fill-current" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}