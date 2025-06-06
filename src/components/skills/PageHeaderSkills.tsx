'use client';
import { useEffect, useRef } from 'react';

const PageHeaderSkills: React.FC = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (typeof window.anime !== 'undefined') {
            const anime = window.anime;
            const elementsToAnimate = [
                { target: titleRef.current, delay: 200 },
                { target: subtitleRef.current, delay: 300 },
            ];

            elementsToAnimate.forEach(item => {
                if (item.target) {
                    anime({
                        targets: item.target,
                        translateY: [20, 0],
                        opacity: [0, 1],
                        easing: 'easeOutExpo',
                        duration: 800,
                        delay: item.delay,
                    });
                } else {
                    if (item.target) (item.target as HTMLElement).style.opacity = '1';
                }
            });
        } else {
            if (titleRef.current) titleRef.current.style.opacity = '1';
            if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
        }
    }, []);

    return (
        <section className="py-16 md:py-24 bg-slate-800/30 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="absolute top-0 left-1/4 w-2/5 h-3/5 bg-gradient-to-br from-pink-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slower"></div>
                <div className="absolute bottom-0 right-1/4 w-2/5 h-3/5 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow"></div>
            </div>
            <div className="container mx-auto px-6 text-center relative z-10">
                <h1 ref={titleRef} className="text-4xl md:text-6xl font-black text-white opacity-0">
                    My Technical Skills
                </h1>
                <p ref={subtitleRef} className="text-lg md:text-xl text-cyan-300 mt-2 opacity-0">
                    A Showcase of My Expertise & Tools
                </p>
            </div>
        </section>
    );
};

export default PageHeaderSkills;
