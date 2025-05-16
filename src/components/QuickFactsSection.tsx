'use client';

import { useEffect, useRef } from 'react';

// declare global { // Вже оголошено
//   interface Window {
//     anime: any;
//   }
// }

interface FactCardData {
    iconClass: string;
    iconColorClass: string;
    value: string;
    label: string;
    delay: number;
}

const factsData: FactCardData[] = [
    {
        iconClass: 'fas fa-graduation-cap',
        iconColorClass: 'text-cyan-400',
        value: '3+',
        label: 'Years of Learning',
        delay: 100,
    },
    {
        iconClass: 'fas fa-code-branch',
        iconColorClass: 'text-purple-400',
        value: '10+',
        label: 'Personal Projects',
        delay: 200,
    },
    {
        iconClass: 'fas fa-mug-hot',
        iconColorClass: 'text-pink-400',
        value: '∞',
        label: 'Cups of Coffee',
        delay: 300,
    },
];

const QuickFactsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const factsRef = useRef<(HTMLDivElement | null)[]>([]);

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

            const elementsToObserve = [titleRef.current, descriptionRef.current, ...factsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, descriptionRef.current, ...factsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="quick-facts" className="py-20 md:py-28 bg-slate-900 section-divider-top section-divider-bottom patterned-bg">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Quick Facts
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    A few numbers that paint a part of my journey.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 justify-center">
                    {factsData.map((fact, index) => (
                        <div
                            key={index}
                            ref={el => { factsRef.current[index] = el; }}
                            className="fact-card opacity-0"
                            data-delay={fact.delay}
                        >
                            <i className={`${fact.iconClass} text-3xl ${fact.iconColorClass} mb-3`}></i>
                            <p className="text-4xl font-extrabold text-white">{fact.value}</p>
                            <p className="text-gray-400">{fact.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickFactsSection;
