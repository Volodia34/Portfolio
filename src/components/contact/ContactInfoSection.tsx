'use client';
import { useEffect, useRef } from 'react';

interface ContactInfoItem {
    iconClass: string;
    label: string;
    value: string;
    link?: string;
    delay: number;
}

const contactInfoData: ContactInfoItem[] = [
    {
        iconClass: 'fas fa-envelope',
        label: 'Email',
        value: 'your.email@example.com',
        link: 'mailto:your.email@example.com',
        delay: 200,
    },
    {
        iconClass: 'fas fa-map-marker-alt',
        label: 'Location',
        value: 'Your City, Country',
        delay: 300,
    },
    {
        iconClass: 'fab fa-telegram-plane',
        label: 'Telegram',
        value: '@yourusername',
        link: 'https://t.me/yourusername',
        delay: 400,
    },
];

const ContactInfoSection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
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

            const observerOptions = { threshold: 0.15 };
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToObserve = [titleRef.current, ...itemsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [titleRef.current, ...itemsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="contact-info" className="py-20 md:py-28 section-divider-bottom">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom opacity-0">
                    Contact Information
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {contactInfoData.map((item, index) => (
                        <div
                            key={index}
                            ref={el => { itemsRef.current[index] = el; }}
                            className="bg-slate-800/70 backdrop-blur-md rounded-lg p-6 text-center shadow-lg border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 opacity-0"
                            data-delay={item.delay}
                        >
                            <i className={`${item.iconClass} text-3xl text-cyan-400 mb-3`}></i>
                            {item.link ? (
                                <a href={item.link} className="block text-lg text-gray-300 hover:text-cyan-400 transition-colors">
                                    {item.value}
                                </a>
                            ) : (
                                <p className="text-lg text-gray-300">{item.value}</p>
                            )}
                            <p className="text-gray-500 text-sm mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContactInfoSection;
