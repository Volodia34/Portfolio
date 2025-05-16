'use client';

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        anime: typeof import('animejs');
    }
}

interface WorkflowStep {
    iconClass: string;
    title: string;
    description: string;
    delay: number;
}

const workflowStepsData: WorkflowStep[] = [
    {
        iconClass: 'fas fa-search',
        title: 'Discovery',
        description: 'Understanding requirements, defining scope, and project planning.',
        delay: 200,
    },
    {
        iconClass: 'fas fa-palette',
        title: 'Design',
        description: 'Crafting user-centric designs and interactive prototypes.',
        delay: 300,
    },
    {
        iconClass: 'fas fa-code',
        title: 'Development',
        description: 'Building robust solutions with clean code and thorough testing.',
        delay: 400,
    },
    {
        iconClass: 'fas fa-rocket',
        title: 'Deployment',
        description: 'Launching the project and gathering feedback for improvements.',
        delay: 500,
    },
];

const MyWorkflowSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

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

            const elementsToObserve = [titleRef.current, descriptionRef.current, ...stepsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, descriptionRef.current, ...stepsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="my-workflow" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-bottom">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    My Workflow
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    A structured yet flexible process ensures quality and efficiency in every project I undertake.
                </p>
                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -translate-y-1/2 -z-10 opacity-50"></div>
                    <div className="grid md:grid-cols-4 gap-8 relative">
                        {workflowStepsData.map((step, index) => (
                            <div
                                key={index}
                                ref={el => { stepsRef.current[index] = el; }}
                                className="workflow-step-card opacity-0"
                                data-delay={step.delay}
                            >
                                <div className="workflow-step-number-wrapper">
                                    <i className={`${step.iconClass} workflow-step-icon`}></i>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2 mt-3">{step.title}</h3>
                                <p className="text-sm text-gray-400">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyWorkflowSection;
