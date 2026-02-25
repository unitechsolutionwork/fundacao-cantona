"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Heart } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Verificamos se estamos na página inicial
    const isHome = pathname === "/";

    // Efeito que deteta o scroll da página
    useEffect(() => {
        const handleScroll = () => {
            // Se fizermos scroll mais de 50 pixels para baixo, muda o estado
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Corre uma vez ao carregar para garantir que o estado está certo
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lógica de Cores Dinâmicas:
    // Se estivermos na Home e no topo, a barra é transparente. Caso contrário, é branca.
    const navBackground = isHome && !isScrolled
        ? "bg-transparent py-4"
        : "bg-white shadow-sm border-b border-gray-100 py-0";

    // Os textos ficam brancos com uma ligeira sombra se estiver sobre a foto, ou cinza/azul se a barra estiver branca.
    const linkColor = isHome && !isScrolled
        ? "text-white hover:text-gray-200 drop-shadow-md"
        : "text-gray-600 hover:text-[#3a7d44]";

    const activeLinkColor = isHome && !isScrolled
        ? "text-white hover:text-gray-200 drop-shadow-md"
        : "text-[#113255] hover:text-[#3a7d44]";

    return (
        // Mudámos de 'sticky' para 'fixed' para a barra flutuar por cima da imagem principal
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Oficial da Fundação */}
                    <div className="flex-shrink-0 flex items-center">
                        {/* Adicionei um fundo de vidro muito suave por trás do logo para garantir que as letras azuis não se percam na foto escura */}
                        <Link href="/" className={`flex items-center rounded-xl transition-all ${isHome && !isScrolled ? "bg-white/20 backdrop-blur-md px-3 py-1.5" : ""}`}>
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

                    {/* Links Centrais */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className={`font-semibold transition-colors ${activeLinkColor}`}>Início</Link>
                        <Link href="/sobre" className={`font-medium transition-colors ${linkColor}`}>Sobre Nós</Link>
                        <Link href="/trabalhos" className={`font-medium transition-colors ${linkColor}`}>Impacto</Link>
                        <Link href="/doar" className={`font-medium transition-colors ${linkColor}`}>Doações</Link>
                        <Link href="#contacto" className={`font-medium transition-colors ${linkColor}`}>Contacto</Link>
                    </div>

                    {/* Botão Doar Agora */}
                    <div className="flex items-center">
                        <Link
                            href="/doar"
                            className="inline-flex items-center gap-2 bg-[#3a7d44] text-white px-6 py-2.5 rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md"
                        >
                            Doar Agora
                            <Heart className="w-4 h-4 fill-current" />
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}