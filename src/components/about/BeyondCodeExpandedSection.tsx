'use client';
import { useEffect, useRef } from 'react';


interface HobbyCardData {
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string;
    delay: number;
}


const BeyondCodeExpandedSection: React.FC = () => {
    const hobbiesData: HobbyCardData[] = [
        {
            iconClass: 'fas fa-brain',
            iconColorClass: 'text-yellow-400',
            title: 'Self-Development',
            description: 'I love learning new things in various fields, whether it&rsquo;s science, mathematics, or new concepts in technology.',
            delay: 200,
        },
        {
            iconClass: 'fas fa-music',
            iconColorClass: 'text-cyan-400',
            title: 'Music Enthusiast',
            description: 'Exploring diverse genres and finding inspiration in melodies and rhythms. Music is a great companion for coding sessions.',
            delay: 300,
        },
        {
            iconClass: 'fas fa-running',
            iconColorClass: 'text-green-400',
            title: 'Sports & Activity',
            description: 'Sports have been an integral part since childhood: athletics, biathlon, horizontal bars, calisthenics, street workout, volleyball, gym, and occasional running (with Garmin!).',
            delay: 400,
        },
        {
            iconClass: 'fas fa-lightbulb',
            iconColorClass: 'text-purple-400',
            title: 'New Ideas',
            description: 'Always open to new ideas, projects, and opportunities for creativity and innovation.',
            delay: 500,
        },
    ];


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
        <section ref={sectionRef} id="beyond-code-expanded" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top section-divider-bottom">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Beyond The Code
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    Life isn&rsquo;t just about programming. Here&rsquo;s what inspires me and helps me grow.
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

export default BeyondCodeExpandedSection;
