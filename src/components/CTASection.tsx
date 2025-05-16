'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

// declare global { // Вже оголошено
//   interface Window {
//     anime: any;
//   }
// }

const CTASection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLAnchorElement>(null); // Ref для кнопки

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

            const elementsToObserve = [titleRef.current, descriptionRef.current, buttonRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, descriptionRef.current, buttonRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="cta" className="py-20 md:py-28 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 ref={titleRef} className="text-3xl md:text-4xl font-black mb-6 opacity-0">
                    Have a Project in Mind?
                </h2>
                <p ref={descriptionRef} className="text-lg md:text-xl text-slate-100 mb-10 max-w-2xl mx-auto opacity-0" data-delay="100">
                    I'm always excited to discuss new projects and innovative ideas. Whether you have a question or just want to say hi, feel free to reach out.
                </p>
                <Link
                    href="/contact"
                    ref={buttonRef}
                    className="btn bg-white text-slate-800 hover:bg-slate-100 text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-white/50 opacity-0"
                    data-delay="200"
                >
                    Let's Create Together!
                </Link>
            </div>
        </section>
    );
};

export default CTASection;
