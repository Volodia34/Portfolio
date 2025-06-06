'use client';
import { useEffect, useRef } from 'react';

interface AdditionalSkillItem {
    text: string;
    iconClass: string;
    iconColorClass: string;
    delay: number;
}

const additionalSkillsData: AdditionalSkillItem[] = [
    { text: 'Algorithm & Data Structures', iconClass: 'fas fa-sitemap', iconColorClass: 'text-cyan-400', delay: 600 },
    { text: 'Clean Code Principles', iconClass: 'fas fa-brush', iconColorClass: 'text-purple-400', delay: 630 },
    { text: 'Design Patterns (SOLID, GRASP, KISS, DRY)', iconClass: 'fas fa-layer-group', iconColorClass: 'text-pink-400', delay: 660 },
    { text: 'Software Architecture Fundamentals', iconClass: 'fas fa-project-diagram', iconColorClass: 'text-indigo-400', delay: 690 },
    { text: 'Basic Security Principles', iconClass: 'fas fa-shield-alt', iconColorClass: 'text-red-400', delay: 720 },
    { text: 'Operating Systems & Networks Basics', iconClass: 'fas fa-network-wired', iconColorClass: 'text-lime-400', delay: 750 },
    { text: 'Programming Paradigms (OOP, FP)', iconClass: 'fas fa-brain', iconColorClass: 'text-sky-400', delay: 780 },
    { text: 'Agile/Scrum Methodologies', iconClass: 'fas fa-users-cog', iconColorClass: 'text-blue-400', delay: 810 },
    { text: 'Code Review Practices', iconClass: 'fas fa-glasses', iconColorClass: 'text-teal-400', delay: 840 },
    { text: 'Problem-Solving & Analytical Thinking', iconClass: 'fas fa-lightbulb', iconColorClass: 'text-yellow-400', delay: 870 },
    { text: 'Continuous Learning & Adaptability', iconClass: 'fas fa-seedling', iconColorClass: 'text-green-400', delay: 900 },
    { text: 'English (Technical & Communication)', iconClass: 'fas fa-language', iconColorClass: 'text-rose-400', delay: 930 },
];

const AdditionalSkillsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
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

            const observerOptions = { threshold: 0.1 };
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToObserve = [titleRef.current, ...itemsRef.current].filter(Boolean);
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, ...itemsRef.current].filter(Boolean);
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="additional-skills" className="mt-16 pt-16 border-t border-slate-700/50 pb-20 md:pb-28">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="text-3xl font-bold text-white text-center mb-12 opacity-0" data-delay="550">
                    Additional Skills & Knowledge
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                    {additionalSkillsData.map((skill, index) => (
                        <div
                            key={skill.text}
                            ref={el => { itemsRef.current[index] = el; }}
                            className="additional-skill-item opacity-0"
                            data-delay={skill.delay}
                        >
                            <i className={`${skill.iconClass} ${skill.iconColorClass} mr-3`}></i>
                            {skill.text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdditionalSkillsSection;
