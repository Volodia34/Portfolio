'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        anime: typeof import('animejs');
    }
}

interface ApproachCardData {
    iconClass: string;
    iconWrapperBg: string;
    iconColor: string;
    hoverIconWrapperBg: string;
    hoverShadowColor: string;
    title: string;
    hoverTitleColor: string;
    description: string;
    delay: number;
}

const approachCardsData: ApproachCardData[] = [
    {
        iconClass: 'fas fa-lightbulb',
        iconWrapperBg: 'bg-yellow-500/10',
        iconColor: 'text-yellow-400',
        hoverIconWrapperBg: 'group-hover:bg-yellow-500/20',
        hoverShadowColor: 'group-hover:shadow-yellow-500/30',
        title: 'Problem Solving',
        hoverTitleColor: 'group-hover:text-yellow-300',
        description: 'Tackling complex challenges with elegant, efficient solutions. Every problem is an opportunity to learn and innovate.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-users',
        iconWrapperBg: 'bg-green-500/10',
        iconColor: 'text-green-400',
        hoverIconWrapperBg: 'group-hover:bg-green-500/20',
        hoverShadowColor: 'group-hover:shadow-green-500/30',
        title: 'Team Collaboration',
        hoverTitleColor: 'group-hover:text-green-300',
        description: 'Thriving in team environments, valuing open communication and shared goals to achieve collective success.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-glasses',
        iconWrapperBg: 'bg-blue-500/10',
        iconColor: 'text-blue-400',
        hoverIconWrapperBg: 'group-hover:bg-blue-500/20',
        hoverShadowColor: 'group-hover:shadow-blue-500/30',
        title: 'Detail Orientation',
        hoverTitleColor: 'group-hover:text-blue-300',
        description: 'Precision matters. Paying close attention to details, ensuring high-quality, polished end products.',
        delay: 400,
    },
];

const MyApproachSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (typeof window.anime !== 'undefined') {
            const anime = window.anime;
            const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const target = entry.target as HTMLElement; // Type assertion
                        anime({
                            targets: target,
                            translateY: [target.dataset.translateY || 20, 0],
                            opacity: [0, 1],
                            scale: [parseFloat(target.dataset.scaleStart || '0.95'), 1],
                            easing: 'easeOutExpo',
                            duration: 800,
                            delay: target.dataset.delay ? parseInt(target.dataset.delay) : 0,
                        });
                        observer.unobserve(target);
                    }
                });
            };

            const observerOptions = { threshold: 0.15 };
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToObserve = [titleRef.current, descriptionRef.current, ...cardsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            // Fallback
            const elements = [titleRef.current, descriptionRef.current, ...cardsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="my-approach" className="py-20 md:py-28 bg-slate-900 section-divider-bottom section-divider-top patterned-bg">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    My Approach
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    My work is driven by a commitment to quality, collaboration, and continuous improvement. I believe in:
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {approachCardsData.map((card, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="approach-card group opacity-0"
                            data-delay={card.delay}
                        >
                            <div className={`approach-card-icon-wrapper ${card.iconWrapperBg} ${card.iconColor} ${card.hoverIconWrapperBg} ${card.hoverShadowColor}`}>
                                <i className={`${card.iconClass} fa-2x`}></i>
                            </div>
                            <h3 className={`text-2xl font-bold text-white mb-3 mt-4 ${card.hoverTitleColor} transition-colors`}>
                                {card.title}
                            </h3>
                            <p className="text-gray-400">{card.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyApproachSection;
