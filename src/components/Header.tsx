'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/skills', label: 'Skills' },
    { href: '/projects', label: 'Projects' },
    { href: '/certificates', label: 'Certificates' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Закриття мобільного меню при зміні маршруту
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header className="sticky top-0 z-50 shadow-lg bg-slate-900 bg-opacity-70 backdrop-blur-lg border-b border-slate-700/50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-3xl font-black text-cyan-400 tracking-tight logo-text hover:text-cyan-300 transition-colors duration-300">
                    Volodia
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all duration-300 ease-in-out relative ${isActive ? 'text-cyan-400 font-semibold active-link-style' : ''}`}
                            >
                                {link.label}
                                {isActive && <span className="absolute w-[60%] h-[2px] bg-cyan-400 bottom-[-4px] left-1/2 transform -translate-x-1/2 rounded-sm"></span>}
                            </Link>
                        );
                    })}
                </div>
                <div className="md:hidden">
                    <button
                        id="mobile-menu-button"
                        aria-label="Open Menu"
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMobileMenu}
                        className="text-gray-300 hover:text-cyan-400 focus:outline-none"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>
            </nav>
            <div id="mobile-menu" className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-slate-800 bg-opacity-95`}>
                {navLinks.map((link) => {
                    const isActive = pathname === link.href || (pathname === '/' && link.href === '/');
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)} // Закриваємо меню при кліку
                            className={`block px-4 py-3 text-base font-medium text-gray-200 hover:bg-slate-700 hover:text-cyan-300 transition-colors ${isActive ? 'bg-cyan-600 text-white' : ''}`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <style jsx>{`
        .active-link-style::after {
        }
      `}</style>
        </header>
    );
}
