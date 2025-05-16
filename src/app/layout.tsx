import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
    title: 'Volodia - Frontend Portfolio',
    description: 'Personal portfolio of Volodia, a Frontend Engineer.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} antialiased`}>
        <head>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js" async></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        </head>
        <body className="bg-slate-900 text-gray-200 selection:bg-cyan-500 selection:text-white">
        <Header />
        <main>{children}</main>
        <Footer />
        </body>
        </html>
    );
}
