'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// declare global { // Вже оголошено
//   interface Window {
//     anime: any;
//   }
// }

interface TechItem {
    type: 'icon' | 'text' | 'image';
    content: string;
    label: string;
    hoverColorClass?: string;
    delay: number;
}

const techStackData: TechItem[] = [
    { type: 'icon', content: 'fab fa-react', label: 'React', hoverColorClass: 'group-hover:text-cyan-400', delay: 200 },
    { type: 'icon', content: 'fab fa-angular', label: 'Angular', hoverColorClass: 'group-hover:text-red-500', delay: 250 },
    { type: 'icon', content: 'fab fa-js-square', label: 'JavaScript', hoverColorClass: 'group-hover:text-yellow-400', delay: 300 },
    { type: 'image', content: 'https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo-mark.svg', label: 'Tailwind CSS', delay: 350 },
    { type: 'icon', content: 'fab fa-node-js', label: 'Node.js', hoverColorClass: 'group-hover:text-green-400', delay: 400 },
    { type: 'icon', content: 'fab fa-git-alt', label: 'Git', hoverColorClass: 'group-hover:text-orange-500', delay: 450 },
    { type: 'text', content: 'TS', label: 'TypeScript', hoverColorClass: 'group-hover:text-blue-400', delay: 500 },
];

const TechStackSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const techItemsRef = useRef<(HTMLDivElement | null)[]>([]);
    const moreLinkRef = useRef<HTMLParagraphElement>(null);


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

            const elementsToObserve = [titleRef.current, descriptionRef.current, ...techItemsRef.current, moreLinkRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, descriptionRef.current, ...techItemsRef.current, moreLinkRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="tech-stack" className="py-20 md:py-28 bg-slate-900 section-divider-top section-divider-bottom patterned-bg">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    My Go-To Technologies
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    I work with a variety of modern tools and technologies to bring ideas to life. Here are some of my favorites:
                </p>
                <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 md:gap-x-16 md:gap-y-12">
                    {techStackData.map((tech, index) => (
                        <div
                            key={tech.label}
                            ref={el => { techItemsRef.current[index] = el; }}
                            className="tech-icon-item group opacity-0"
                            data-delay={tech.delay}
                        >
                            <div className="tech-icon-bg">
                                {tech.type === 'icon' && <i className={`${tech.content} text-4xl md:text-5xl text-gray-400 ${tech.hoverColorClass} transition-colors duration-300`}></i>}
                                {tech.type === 'text' && <span className={`text-3xl md:text-4xl font-bold text-gray-400 ${tech.hoverColorClass} transition-colors duration-300`}>{tech.content}</span>}
                                {tech.type === 'image' && (
                                    <Image
                                        src={tech.content}
                                        alt={`${tech.label} Logo`}
                                        width={48}
                                        height={48}
                                        className="h-10 md:h-11 w-auto filter grayscale group-hover:filter-none transition-all duration-300"
                                    />
                                )}
                            </div>
                            <span className="tech-icon-label">{tech.label}</span>
                        </div>
                    ))}
                </div>
                <p ref={moreLinkRef} className="text-center text-gray-400 mt-16 opacity-0" data-delay="550">
                    ...and constantly exploring more! Check out my{' '}
                    <Link href="/skills" className="text-cyan-400 hover:underline font-semibold">
                        full skills list
                    </Link>.
                </p>
            </div>
        </section>
    );
};

export default TechStackSection;
