'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface SkillCardData {
    iconClass: string;
    iconColorClass: string;
    title: string;
    description: string | React.ReactNode;
    delay: number;
}

const skillsOverviewData: SkillCardData[] = [
    {
        iconClass: 'fas fa-cogs',
        iconColorClass: 'text-cyan-400',
        title: 'Technical Skills (Hard Skills)',
        description: (
            <>
                Proficient in a stack of modern web technologies for creating frontend applications.
                You can find a detailed list of technologies on the{' '}
                <Link href="/skills" className="text-cyan-300 hover:underline font-semibold">
                    dedicated page
                </Link>.
            </>
        ),
        delay: 200,
    },
    {
        iconClass: 'fas fa-comments',
        iconColorClass: 'text-purple-400',
        title: 'Soft Skills',
        description: 'Communication, quick information absorption, rapid learning ability, teamwork, and attention to detail.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-tools',
        iconColorClass: 'text-orange-400',
        title: 'Tools & Platforms',
        description: 'Experienced with various development tools, version control systems (Git), and deployment platforms like Vercel/Netlify.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-project-diagram',
        iconColorClass: 'text-green-400',
        title: 'Methodologies & Principles',
        description: 'Familiar with Agile development practices and a strong believer in writing clean, maintainable, and well-documented code.',
        delay: 500,
    },
];

const SkillsOverviewSection: React.FC = () => {
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
        <section ref={sectionRef} id="skills-overview" className="py-20 md:py-28 bg-slate-900 section-divider-bottom patterned-bg">
            <div className="container mx-auto px-6 text-center">
                <h2 ref={titleRef} className="section-title-custom opacity-0">
                    Key Skills
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    A brief overview of my strengths. More details on the &quot;Skills&quot; page.
                </p>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {skillsOverviewData.map((skill, index) => (
                        <div
                            key={index}
                            ref={el => { cardsRef.current[index] = el; }} // No return value
                            className="skill-overview-card opacity-0"
                            data-delay={skill.delay}
                        >
                            <i className={`${skill.iconClass} text-3xl ${skill.iconColorClass} mb-3`}></i>
                            <h3 className="text-xl font-semibold text-white mb-2">{skill.title}</h3>
                            <p className="text-sm text-gray-400">{skill.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsOverviewSection;
