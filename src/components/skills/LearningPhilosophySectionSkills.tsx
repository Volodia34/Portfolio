'use client';
import { useEffect, useRef } from 'react';


interface PhilosophyCardData {
    iconClass: string;
    iconColorClass: string;
    iconBgClass: string;
    title: string;
    description: string;
    delay: number;
}

const philosophyData: PhilosophyCardData[] = [
    {
        iconClass: 'fas fa-tools',
        iconColorClass: 'text-cyan-400',
        iconBgClass: '!bg-cyan-500/10',
        title: 'Hands-On Practice',
        description: 'Belief in learning by doing; actively building pet projects and applying concepts in real-world scenarios.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-book-open',
        iconColorClass: 'text-purple-400',
        iconBgClass: '!bg-purple-500/10',
        title: 'Deep Dive into Fundamentals',
        description: "Striving to understand the 'why' behind technologies, not just the 'how', by studying documentation and core principles.",
        delay: 300,
    },
    {
        iconClass: 'fas fa-users-cog',
        iconColorClass: 'text-green-400',
        iconBgClass: '!bg-green-500/10',
        title: 'Community & Collaboration',
        description: 'Engaging with developer communities (like RS School) and learning from peers and mentors.',
        delay: 400,
    },
];

const LearningPhilosophySectionSkills: React.FC = () => {
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
        <section ref={sectionRef} id="learning-philosophy" className="mt-16 pt-16 border-t border-slate-700/50 pb-20 md:pb-28 bg-slate-900 patterned-bg"> {/* Додано patterned-bg */}
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="text-3xl font-bold text-white text-center mb-12 opacity-0" data-delay="100"> {/* Використовуємо звичайний заголовок, не section-title-custom */}
                    My Learning & Development Philosophy
                </h2>
                <p ref={descriptionRef} className="section-description !mb-12 opacity-0" data-delay="150">
                    My approach to acquiring and mastering new skills is built on these core tenets:
                </p>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {philosophyData.map((item, index) => (
                        <div
                            key={item.title}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="learning-philosophy-card opacity-0"
                            data-delay={item.delay}
                        >
                            <div className={`card-icon-bg ${item.iconBgClass}`}>
                                <i className={`${item.iconClass} fa-2x ${item.iconColorClass}`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mt-4 mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LearningPhilosophySectionSkills;
