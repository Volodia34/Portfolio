'use client'

import { useEffect, useRef } from 'react';

interface HobbyCardData {
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string;
    delay: number;
}

const hobbiesData: HobbyCardData[] = [
    {
        iconClass: 'fas fa-book-reader',
        iconColorClass: 'text-cyan-400',
        title: 'Sci-Fi Reader',
        description: 'Exploring futuristic worlds and mind-bending concepts through books.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-coffee',
        iconColorClass: 'text-purple-400',
        title: 'Coffee Enthusiast',
        description: 'Always on the hunt for the perfect brew to kickstart my day.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-hiking',
        iconColorClass: 'text-green-400',
        title: 'Nature Explorer',
        description: 'Recharging by hiking and discovering the beauty of the great outdoors.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-dumbbell',
        iconColorClass: 'text-orange-400',
        title: 'Active Lifestyle',
        description: 'Staying active with regular workouts and enjoying various sports.',
        delay: 500,
    },
];

const BeyondCodeSection: React.FC = () => {
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
        <section ref={sectionRef} id="beyond-code" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Beyond The Code
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    When I&apos;m not immersed in lines of code, I enjoy...
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {hobbiesData.map((hobby, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="beyond-code-card opacity-0"
                            data-delay={hobby.delay}
                        >
                            <i className={`${hobby.iconClass} text-3xl ${hobby.iconColorClass} mb-4`}></i>
                            <h3 className="text-xl font-semibold text-white mb-2">{hobby.title}</h3>
                            <p className="text-sm text-gray-400">{hobby.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BeyondCodeSection;
