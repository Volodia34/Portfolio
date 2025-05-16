'use client';
import { useEffect, useRef } from 'react';

interface ValueCardData {
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string;
    delay: number;
}

const valuesData: ValueCardData[] = [
    {
        iconClass: 'fas fa-rocket',
        iconColorClass: 'text-green-400',
        title: 'Continuous Growth & Learning',
        description: "Technology doesn't stand still, and neither do I. I believe in constantly evolving, learning new things, and honing my skills.",
        delay: 200,
    },
    {
        iconClass: 'fas fa-microscope',
        iconColorClass: 'text-blue-400',
        title: 'Deep Understanding',
        description: 'To truly understand how something works, you need to try building it from scratch. I strive not just to use abstractions but to understand what\'s "under the hood."',
        delay: 300,
    },
    {
        iconClass: 'fas fa-users',
        iconColorClass: 'text-yellow-400',
        title: 'Collaboration & Communication',
        description: 'Believing that the best results come from open communication and effective teamwork.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-bullseye',
        iconColorClass: 'text-pink-400',
        title: 'User-Centricity',
        description: 'Placing the user at the heart of every design and development decision to create truly valuable and enjoyable experiences.',
        delay: 500,
    },
];

const MyPhilosophySectionAbout: React.FC = () => {
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
                        const target = entry.target as HTMLElement;
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
            const elements = [titleRef.current, descriptionRef.current, ...cardsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="my-philosophy" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top section-divider-bottom">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    My Philosophy
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    These principles guide my work, learning, and interactions.
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                    {valuesData.map((value, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="value-card opacity-0"
                            data-delay={value.delay}
                        >
                            <i className={`${value.iconClass} text-3xl ${value.iconColorClass} mb-4`}></i>
                            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-sm text-gray-400">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyPhilosophySectionAbout;
