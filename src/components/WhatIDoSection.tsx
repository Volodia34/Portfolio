'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        anime: typeof import('animejs');
    }
}

interface CardData {
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string;
    delay: number;
}

const cardsData: CardData[] = [
    {
        iconClass: 'fas fa-drafting-compass',
        iconColorClass: 'text-cyan-400',
        title: 'UI/UX Design Integration',
        description: 'Translating designs into pixel-perfect, interactive user interfaces.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-tablet-alt',
        iconColorClass: 'text-purple-400',
        title: 'Responsive Development',
        description: 'Building applications that adapt seamlessly to any screen size.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-tachometer-alt',
        iconColorClass: 'text-pink-400',
        title: 'Performance Optimization',
        description: 'Focusing on fast load times and smooth interactions for user engagement.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-brain',
        iconColorClass: 'text-green-400',
        title: 'Continuous Learning',
        description: 'Actively exploring new technologies and methodologies to stay current.',
        delay: 500,
    },
];

const WhatIDoSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window.anime !== 'undefined') {
            const anime = window.anime;

            const observerCallback = (
                entries: IntersectionObserverEntry[],
                observer: IntersectionObserver
            ) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target === titleRef.current) {
                            anime({
                                targets: titleRef.current,
                                translateY: [20, 0],
                                opacity: [0, 1],
                                easing: 'easeOutExpo',
                                duration: 800,
                            });
                        }

                        if (entry.target === descriptionRef.current) {
                            anime({
                                targets: descriptionRef.current,
                                translateY: [20, 0],
                                opacity: [0, 1],
                                easing: 'easeOutExpo',
                                duration: 800,
                                delay: 100,
                            });
                        }

                        cardsRef.current.forEach(card => {
                            if (card && entry.target === card) {
                                anime({
                                    targets: card,
                                    translateY: [30, 0],
                                    opacity: [0, 1],
                                    scale: [0.95, 1],
                                    easing: 'easeOutExpo',
                                    duration: 700,
                                    delay: card.dataset.delay ? parseInt(card.dataset.delay) : 0,
                                });
                            }
                        });

                        observer.unobserve(entry.target);
                    }
                });
            };

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.15,
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            if (titleRef.current) observer.observe(titleRef.current);
            if (descriptionRef.current) observer.observe(descriptionRef.current);
            cardsRef.current.forEach(card => {
                if (card) observer.observe(card);
            });

            return () => {
                if (titleRef.current) observer.unobserve(titleRef.current);
                if (descriptionRef.current) observer.unobserve(descriptionRef.current);
                cardsRef.current.forEach(card => {
                    if (card) observer.unobserve(card);
                });
            };
        } else {
            if (titleRef.current) titleRef.current.style.opacity = '1';
            if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
            cardsRef.current.forEach(card => {
                if (card) card.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            id="what-i-do"
            className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top"
        >
            <div className="container mx-auto px-6 text-center">
                <h2 ref={titleRef} className="section-title-custom opacity-0">
                    What I Excel At
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0">
                    I specialize in crafting modern web solutions with a strong focus on user experience,
                    performance, and clean, maintainable code.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {cardsData.map((card, index) => (
                        <div
                            key={index}
                            ref={el => {
                                cardsRef.current[index] = el;
                            }}
                            className="what-i-do-card opacity-0"
                            data-delay={card.delay}
                        >
                            <div className="card-icon-bg">
                                <i className={`${card.iconClass} fa-2x ${card.iconColorClass}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mt-5 mb-2">{card.title}</h3>
                            <p className="text-gray-400 text-sm">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhatIDoSection;
