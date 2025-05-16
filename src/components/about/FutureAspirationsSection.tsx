'use client';
import { useEffect, useRef } from 'react';

interface AspirationItemData {
    iconClass: string;
    iconColorClass: string;
    text: string;
    delay: number;
}

const aspirationsData: AspirationItemData[] = [
    {
        iconClass: 'fas fa-cogs',
        iconColorClass: 'text-cyan-400',
        text: 'Create something truly cool that people will use.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-layer-group',
        iconColorClass: 'text-purple-400',
        text: 'Learn many more technologies to become a Full Stack and Software Engineer.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-chart-line',
        iconColorClass: 'text-green-400',
        text: 'Develop in various IT directions and implement many exciting projects.',
        delay: 400,
    },
];

const FutureAspirationsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

            const elementsToObserve = [titleRef.current, descriptionRef.current, ...itemsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, descriptionRef.current, ...itemsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="future-aspirations" className="py-20 md:py-28 bg-slate-900 section-divider-top patterned-bg">
            <div className="container mx-auto px-6 text-center">
                <h2 ref={titleRef} className="section-title-custom opacity-0">
                    Future Aspirations
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    My ambitions and plans for the near future.
                </p>
                <div className="max-w-3xl mx-auto space-y-6">
                    {aspirationsData.map((aspiration, index) => (
                        <div
                            key={index}
                            ref={el => { itemsRef.current[index] = el; }}
                            className="aspiration-item opacity-0"
                            data-delay={aspiration.delay}
                        >
                            <i className={`${aspiration.iconClass} text-2xl ${aspiration.iconColorClass} mr-3`}></i>
                            <span className="text-xl text-white">{aspiration.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FutureAspirationsSection;
