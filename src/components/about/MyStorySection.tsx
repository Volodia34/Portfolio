'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MyStorySection: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

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
                            scale: [parseFloat(target.dataset.scaleStart || '0.98'), 1],
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

            if (imageRef.current) observer.observe(imageRef.current);
            if (contentRef.current) observer.observe(contentRef.current);

            return () => {
                if (imageRef.current && observer) observer.unobserve(imageRef.current);
                if (contentRef.current && observer) observer.unobserve(contentRef.current);
            };
        } else {
            if (imageRef.current) imageRef.current.style.opacity = '1';
            if (contentRef.current) contentRef.current.style.opacity = '1';
        }
    }, []);

    return (
        <section ref={sectionRef} id="my-story" className="py-20 md:py-28 section-divider-bottom">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
                    <div ref={imageRef} className="md:col-span-2 opacity-0" data-delay="200">
                        <Image
                            src="https://placehold.co/600x750/1E293B/9CA3AF?text=My+Photo+Here&font=inter"
                            alt="Photo of [Your Name]"
                            width={600}
                            height={750}
                            className="rounded-xl shadow-2xl w-full object-cover border-4 border-slate-700 hover:border-cyan-500/70 transition-all duration-300 transform hover:scale-105"
                        />
                    </div>
                    <div ref={contentRef} className="md:col-span-3 opacity-0" data-delay="300">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                            From Curiosity to Code: <span className="text-cyan-400">My Journey into Development</span>
                        </h2>
                        <p className="section-text-block mb-4">
                            Hello! I&apos;m Volodia My story with programming began not too long ago, around the 5th grade. Back then, I was interested but kept putting it off, thinking I first needed to master English, then mathematics, and only then, perhaps at university, start learning bit by bit.
                        </p>
                        <p className="section-text-block mb-4">
                            The turning point came thanks to my brother, Bohdan, who was already a frontend developer (Angular). I shared my desire to learn with him, and without much thought, he sat me down at his laptop, saying, &quot;Alright, get to it and learn!&quot; He played a simple video for me, something like &quot;HTML in an hour.&quot; I started watching and trying to write something. My first HTML file, where I just experimented with tags, was created on May 29, 2021 – that day marked the beginning of my journey.
                        </p>
                        <p className="section-text-block mb-4">
                            My brother gave me his old MacBook Pro 2011, which he himself had used for coding. It was my first experience with macOS, and I absolutely loved the system&apos;s convenience and gestures – I still use this OS today. At first, I even thought it was a new MacBook because it felt so premium! Bohdan also helped our other brother, Mykhailo, learn, who already had some knowledge at that point.
                        </p>
                        <p className="section-text-block">
                            I started with simple YouTube videos, then moved on to Udemy courses and studied documentation. Later, I discovered the RS School platform, whose ideology – free education, mentorship, and quality materials – greatly appealed to me. Since then, I&apos;ve been actively working on my own pet projects and learning what interests me, constantly deepening my knowledge.
                        </p>
                        <div className="mt-8">
                            <Link href="/contact" className="btn btn-primary">
                                Download CV / Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyStorySection;
