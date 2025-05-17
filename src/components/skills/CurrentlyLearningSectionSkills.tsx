'use client';
import { useEffect, useRef } from 'react';

interface LearningItemData {
    iconClass: string;
    iconColorClass: string;
    iconBgClass: string;
    title: string;
    description: string;
    delay: number;
}

const learningData: LearningItemData[] = [
    {
        iconClass: 'fas fa-server',
        iconColorClass: 'text-sky-400',
        iconBgClass: '!bg-sky-500/10',
        title: 'Backend Development',
        description: 'Deepening knowledge in Node.js, Express to build full-stack applications.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-cloud-upload-alt',
        iconColorClass: 'text-emerald-400',
        iconBgClass: '!bg-emerald-500/10',
        title: 'Advanced DevOps & CI/CD',
        description: 'Exploring more advanced concepts in Docker, Kubernetes, and setting up robust CI/CD pipelines.',
        delay: 250,
    },
    {
        iconClass: 'fas fa-shield-virus',
        iconColorClass: 'text-rose-400',
        iconBgClass: '!bg-rose-500/10',
        title: 'Cybersecurity Fundamentals',
        description: 'Gaining a foundational understanding of web security principles and best practices.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-database',
        iconColorClass: 'text-amber-400',
        iconBgClass: '!bg-amber-500/10',
        title: 'Relational Databases',
        description: 'Expanding knowledge with SQL databases like PostgreSQL, alongside NoSQL experience.',
        delay: 350,
    },
    {
        iconClass: 'fab fa-aws',
        iconColorClass: 'text-indigo-400',
        iconBgClass: '!bg-indigo-500/10',
        title: 'Cloud Platforms (AWS Basics)',
        description: 'Getting started with cloud services, focusing on core AWS offerings like EC2, S3, and Lambda.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-brain',
        iconColorClass: 'text-teal-400',
        iconBgClass: '!bg-teal-500/10',
        title: 'Machine Learning / AI Basics',
        description: 'Exploring the fundamentals of ML/AI for developers and how they can be applied in web projects.',
        delay: 450,
    },
];

const CurrentlyLearningSectionSkills: React.FC = () => {
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
        <section ref={sectionRef} id="currently-learning" className="mt-16 pt-16 border-t border-slate-700/50 pb-20 md:pb-28">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="text-3xl font-bold text-white text-center mb-12 opacity-0" data-delay="100">
                    Currently Learning / Exploring Next
                </h2>
                <p ref={descriptionRef} className="section-description !mb-12 opacity-0" data-delay="150">
                    I&rsquo;m always eager to learn and grow. Here are a few areas I&rsquo;m currently focusing on or plan to explore soon:
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {learningData.map((item, index) => (
                        <div
                            key={item.title}
                            ref={el => { cardsRef.current[index] = el; }}
                            className="learning-item-card opacity-0"
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

export default CurrentlyLearningSectionSkills;
