'use client';
import { useEffect, useRef } from 'react';


interface ExperienceItemProps {
    title: string;
    period: string;
    description: string;
    delay: number;
}

const experienceData: ExperienceItemProps[] = [
    {
        title: 'Personal Projects (Pet Projects)',
        period: 'Ongoing',
        description: 'I gain most of my experience through developing my own projects. This allows me to experiment with new technologies, deepen my knowledge, and bring my own ideas to life by solving real or fictional problems.',
        delay: 100,
    },
    {
        title: 'Open Source Contribution (RS School)',
        period: 'Active',
        description: 'I was accepted into the open-source development team at RS School. I am glad for the opportunity to contribute to the development of a platform that has given me so much and to collaborate with other developers on common goals.',
        delay: 200,
    }
    ]


const ExperienceItem: React.FC<ExperienceItemProps> = ({ title, period, description, delay }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window.anime !== 'undefined' && itemRef.current) {
            const anime = window.anime;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            anime({
                                targets: entry.target,
                                opacity: [0, 1],
                                translateY: [20, 0],
                                scale: [0.98, 1],
                                easing: 'easeOutExpo',
                                duration: 800,
                                delay: parseInt(entry.target.getAttribute('data-delay') || '0'),
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );
            observer.observe(itemRef.current);
            return () => observer.disconnect();
        } else if (itemRef.current) {
            itemRef.current.style.opacity = '1';
        }
    }, []);

    return (
        <div ref={itemRef} className="experience-card opacity-0" data-delay={delay}>
            <h3 className="text-2xl font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-purple-300 mb-3">{period}</p>
            <p className="section-text-block">{description}</p>
        </div>
    );
};


const ExperienceSection: React.FC = () => {
    const titleRef = useRef<HTMLHeadingElement>(null);


    useEffect(() => {
        if (typeof window.anime !== 'undefined' && titleRef.current) {
            const anime = window.anime;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            anime({
                                targets: entry.target,
                                opacity: [0, 1],
                                translateY: [20, 0],
                                easing: 'easeOutExpo',
                                duration: 800,
                            });
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.15 }
            );
            observer.observe(titleRef.current);
            return () => {
                if (titleRef.current && observer) observer.unobserve(titleRef.current);
            };
        } else {
            if (titleRef.current) titleRef.current.style.opacity = '1';
        }
    }, []);

    return (
        <section id="experience" className="py-20 md:py-28 bg-slate-900 section-divider-bottom patterned-bg">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Experience
                </h2>
                <div className="max-w-3xl mx-auto grid md:grid-cols-1 gap-8 mt-12">
                    {experienceData.map((exp, index) => (
                        <ExperienceItem key={index} {...exp} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExperienceSection;
