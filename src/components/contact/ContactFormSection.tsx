'use client';
import { useEffect, useRef, useState } from 'react';

const ContactFormSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [submitted, setSubmitted] = useState(false);

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

            const elementsToObserve = [titleRef.current, formRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, formRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section ref={sectionRef} id="contact-form" className="py-20 md:py-28 bg-slate-900 section-divider-top section-divider-bottom patterned-bg">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom opacity-0">
                    Send a Message
                </h2>
                {submitted ? (
                    <p className="text-center text-lg text-cyan-400 mt-8">Thank you! I will get back to you soon.</p>
                ) : (
                    <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto grid gap-6 opacity-0" data-delay="100">
                        <input type="text" placeholder="Your Name" required className="bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500" />
                        <input type="email" placeholder="Your Email" required className="bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-cyan-500" />
                        <textarea placeholder="Your Message" required className="bg-slate-800 border border-slate-700 rounded-lg p-3 h-32 resize-none focus:outline-none focus:border-cyan-500"></textarea>
                        <button type="submit" className="btn btn-primary w-full">Send</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default ContactFormSection;
