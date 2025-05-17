'use client';
import { useEffect, useRef } from 'react';

interface EducationEntryProps {
    degree: string;
    university: string;
    universityColorClass: string;
    locationAndDate: string;
    details: string[];
    isLast?: boolean;
    delay: number;
}

const educationData: EducationEntryProps[] = [
    {
        degree: 'Bachelor of Computer Science',
        university: 'Lviv University of Trade and Economics',
        universityColorClass: 'text-cyan-300',
        locationAndDate: 'Lviv, Ukraine | September 2023 – May 2027 (Expected)',
        details: [
            'Currently a 2nd-year student, focusing on software development principles and practices.',
            'Relevant coursework: Data Structures & Algorithms, Web Technologies, Database Management, Object-Oriented Programming.',
            'Actively participating in [mention any relevant university activities, clubs, or projects, if any].',
        ],
        delay: 100,
    },

];

const EducationEntry: React.FC<EducationEntryProps> = ({
                                                           degree,
                                                           university,
                                                           universityColorClass,
                                                           locationAndDate,
                                                           details,
                                                           isLast = false,
                                                           delay,
                                                       }) => {
    const entryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window.anime !== 'undefined' && entryRef.current) {
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
            observer.observe(entryRef.current);
            return () => observer.disconnect();
        } else if (entryRef.current) {
            entryRef.current.style.opacity = '1';
        }
    }, []);


    return (
        <div ref={entryRef} className={`education-entry mt-10 opacity-0`} data-delay={delay}>
            <div className="education-timeline">
                <div className={`timeline-dot ${universityColorClass.replace('text-', 'bg-')}`}></div>
                {!isLast && <div className="timeline-line bg-slate-700"></div>}
            </div>
            <div className="education-content">
                <h3 className="text-2xl font-semibold text-white">{degree}</h3>
                <p className={`${universityColorClass} font-medium my-1`}>{university}</p>
                <p className="text-sm text-gray-400 mb-2">{locationAndDate}</p>
                <ul className="list-disc list-inside text-gray-300 text-sm space-y-1 pl-4">
                    {details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const EducationSection: React.FC = () => {
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
            return () => observer.disconnect();
        } else if (titleRef.current) {
            titleRef.current.style.opacity = '1';
        }
    }, []);


    return (
        <section id="education" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top section-divider-bottom">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Education
                </h2>
                <div className="max-w-3xl mx-auto mt-12">
                    {educationData.map((edu, index) => (
                        <EducationEntry
                            key={index}
                            {...edu}
                            isLast={index === educationData.length - 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
