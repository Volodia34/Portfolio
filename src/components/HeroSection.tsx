'use client';

import {useEffect, useRef} from 'react';
import Link from 'next/link';
import Image from 'next/image';

declare global {
    interface Window {
        anime: any;
    }
}

const HeroSection: React.FC = () => {
    const heroSubtitleRef = useRef<HTMLSpanElement>(null);
    const heroTitleRef = useRef<HTMLHeadingElement>(null);
    const heroDescriptionRef = useRef<HTMLParagraphElement>(null);
    const heroAspirationRef = useRef<HTMLParagraphElement>(null);
    const heroButtonsRef = useRef<HTMLDivElement>(null);
    const heroImageWrapperRef = useRef<HTMLDivElement>(null);
    const scrollDownHintRef = useRef<HTMLDivElement>(null);

    const dynamicTextPlaceholderRef = useRef<HTMLSpanElement>(null);
    const dynamicTexts = ["Web Interfaces.", "Digital Solutions.", "Creative Designs.", "User Experiences."];
    let textIndex = 0;
    let charIndex = 0;
    let currentText = '';
    let isDeleting = false;

    useEffect(() => {
        const type = () => {
            if (!dynamicTextPlaceholderRef.current) return;
            currentText = dynamicTexts[textIndex];

            if (isDeleting) {
                dynamicTextPlaceholderRef.current.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % dynamicTexts.length;
                    setTimeout(type, 500);
                } else {
                    setTimeout(type, 50);
                }
            } else {
                dynamicTextPlaceholderRef.current.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                if (charIndex === currentText.length) {
                    isDeleting = true;
                    setTimeout(type, 1500);
                } else {
                    setTimeout(type, 100);
                }
            }
        };

        if (dynamicTextPlaceholderRef.current) {
            dynamicTextPlaceholderRef.current.style.borderRightColor = '#67e8f9';
            setTimeout(type, 500);
        }


        if (typeof window.anime !== 'undefined') {
            const anime = window.anime;
            const heroTimeline = anime.timeline({
                easing: 'easeOutExpo',
                duration: 1000,
            });

            heroTimeline
                .add({
                    targets: heroSubtitleRef.current,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: 200
                })
                .add({targets: heroTitleRef.current, translateY: [20, 0], opacity: [0, 1], duration: 700}, '-=400')
                .add({
                    targets: heroDescriptionRef.current,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 700
                }, '-=500')
                .add({targets: heroAspirationRef.current, translateY: [20, 0], opacity: [0, 1], duration: 700}, '-=500')
                .add({
                    targets: heroButtonsRef.current?.children,
                    translateY: [20, 0],
                    opacity: [0, 1],
                    duration: 500,
                    delay: anime.stagger(100)
                }, '-=500')
                .add({
                    targets: heroImageWrapperRef.current,
                    translateX: [30, 0],
                    opacity: [0, 1],
                    duration: 900
                }, '-=800')
                .add({
                    targets: scrollDownHintRef.current,
                    translateY: [10, 0],
                    opacity: [0, 1],
                    duration: 600
                }, '-=400');
        } else {
            const elements = [
                heroSubtitleRef.current, heroTitleRef.current, heroDescriptionRef.current,
                heroAspirationRef.current, heroButtonsRef.current, heroImageWrapperRef.current,
                scrollDownHintRef.current
            ];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }

        const tiltContainer = heroImageWrapperRef.current?.querySelector('.hero-image-container[data-tilt]') as HTMLElement;
        if (tiltContainer) {
            const handleMouseMove = (e: MouseEvent) => {
                const rect = tiltContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;

                const rotateX = deltaY * -7;
                const rotateY = deltaX * 7;

                tiltContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`; // Зменшено scale
            };

            const handleMouseLeave = () => {
                tiltContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            };

            tiltContainer.addEventListener('mousemove', handleMouseMove);
            tiltContainer.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                tiltContainer.removeEventListener('mousemove', handleMouseMove);
                tiltContainer.removeEventListener('mouseleave', handleMouseLeave);
            };
        }

    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 md:pt-0">
            <div className="absolute inset-0 z-0 opacity-70">
                <div
                    className="absolute top-0 left-0 w-3/5 h-3/5 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slow"></div>
                <div
                    className="absolute bottom-0 right-0 w-2/5 h-2/5 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full filter blur-3xl animate-pulse-slower"></div>
            </div>

            <div className="container mx-auto px-6 z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
                    <div className="md:w-3/5 lg:w-7/12 text-center md:text-left">
            <span ref={heroSubtitleRef}
                  className="text-cyan-300 font-semibold tracking-wider uppercase text-sm block mb-4 opacity-0">
              Frontend Engineer & UI Enthusiast
            </span>
                        <h1 ref={heroTitleRef}
                            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 leading-tight hero-headline opacity-0">
                            Hi, I&apos;m <span className="text-cyan-400">Volodia</span><br/>
                            I Build <span ref={dynamicTextPlaceholderRef} className="dynamic-text-placeholder"></span>
                        </h1>
                        <p ref={heroDescriptionRef}
                           className="text-lg lg:text-xl text-gray-300 mb-6 max-w-xl mx-auto md:mx-0 opacity-0">
                            Passionate about creating intuitive, responsive, and visually engaging digital experiences.
                        </p>
                        <p ref={heroAspirationRef}
                           className="text-md lg:text-lg text-gray-400 mb-10 max-w-xl mx-auto md:mx-0 opacity-0">
                            Aspiring to contribute to impactful software solutions and continuously expand my expertise
                            in the ever-evolving tech landscape. Let&apos;s collaborate and bring your ideas to life!
                        </p>
                        <div ref={heroButtonsRef}
                             className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start opacity-0">
                            <Link href="/projects" className="btn btn-primary text-lg shadow-cyan-500/40">
                                Explore My Work <i className="fas fa-arrow-right ml-2"></i>
                            </Link>
                            <Link href="/contact" className="btn btn-secondary text-lg">
                                Let&apos;s Talk
                            </Link>
                        </div>
                    </div>

                    <div ref={heroImageWrapperRef}
                         className="md:w-2/5 lg:w-5/12 flex justify-center md:justify-end relative opacity-0">
                        <div
                            className="hero-image-container p-2 border-2 border-cyan-500/30 rounded-xl bg-slate-800/20 backdrop-blur-sm"
                            data-tilt>
                            <Image
                                src="https://placehold.co/500x600/0F172A/38BDF8?text=Your+Awesome+Photo&font=inter"
                                alt="[Your Name] - Frontend Engineer"
                                width={500}
                                height={600}
                                className="rounded-lg shadow-2xl object-cover w-full max-w-sm md:max-w-md transform transition-all duration-500 hover:scale-105 hover:shadow-cyan-400/30"
                                priority
                            />
                            <div className="hero-image-bg-shape"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={scrollDownHintRef}
                 className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 hidden md:block opacity-0">
                <Link href="#what-i-do"
                      className="text-gray-400 hover:text-cyan-400 transition-colors animate-bounce-slow">
                    <i className="fas fa-chevron-down fa-2x"></i>
                </Link>
            </div>
        </section>
    );
};

export default HeroSection;
