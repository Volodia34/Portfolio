'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// declare global { // Вже оголошено
//   interface Window {
//     anime: any;
//   }
// }

interface BlogPostCardData {
    slug: string;
    thumbnailUrl: string;
    category: string;
    categoryColorClass: string;
    title: string;
    hoverTitleColorClass: string;
    excerpt: string;
    date: string;
    readTime: string;
    delay: number;
}

const blogPostsData: BlogPostCardData[] = [
    {
        slug: '#',
        thumbnailUrl: 'https://placehold.co/600x400/1E293B/94A3B8?text=Blog+Post+1&font=inter',
        category: 'Development',
        categoryColorClass: 'text-cyan-400',
        title: 'Understanding the React Hook Flow',
        hoverTitleColorClass: 'group-hover:text-cyan-300',
        excerpt: 'A deep dive into how React Hooks work under the hood and best practices for using them effectively...',
        date: 'May 10, 2025',
        readTime: '5 min read',
        delay: 200,
    },
    {
        slug: '#',
        thumbnailUrl: 'https://placehold.co/600x400/1E293B/A78BFA?text=Blog+Post+2&font=inter',
        category: 'UI/UX',
        categoryColorClass: 'text-purple-400',
        title: 'The Importance of Microinteractions',
        hoverTitleColorClass: 'group-hover:text-purple-300',
        excerpt: 'Exploring how small, subtle animations and feedback can significantly enhance user experience...',
        date: 'April 28, 2025',
        readTime: '4 min read',
        delay: 300,
    },
    {
        slug: '#',
        thumbnailUrl: 'https://placehold.co/600x400/1E293B/F472B6?text=Blog+Post+3&font=inter',
        category: 'Productivity',
        categoryColorClass: 'text-pink-400',
        title: 'My Top 5 VS Code Extensions for 2025',
        hoverTitleColorClass: 'group-hover:text-pink-300',
        excerpt: 'A curated list of extensions that boost my development workflow and productivity...',
        date: 'April 15, 2025',
        readTime: '3 min read',
        delay: 400,
    },
];

const RecentBlogPostsSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const blogCardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const visitBlogButtonRef = useRef<HTMLParagraphElement>(null);


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

            const elementsToObserve = [
                titleRef.current,
                descriptionRef.current,
                ...blogCardsRef.current,
                visitBlogButtonRef.current,
            ];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [ titleRef.current, descriptionRef.current, ...blogCardsRef.current, visitBlogButtonRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);

    return (
        <section ref={sectionRef} id="recent-blog-posts" className="py-20 md:py-28 bg-slate-800/60 backdrop-blur-sm section-divider-top">
            <div className="container mx-auto px-6">
                <h2 ref={titleRef} className="section-title-custom text-center opacity-0">
                    Latest Insights
                </h2>
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    Sharing my thoughts, learnings, and experiences from the world of web development. (Coming Soon!)
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPostsData.map((post, index) => (
                        <div
                            key={index}
                            ref={el => { blogCardsRef.current[index] = el; }}
                            className={`blog-post-card opacity-0 ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`} // Для останньої картки, щоб вона займала всю ширину на md, якщо їх 3
                            data-delay={post.delay}
                        >
                            <Link href={post.slug} className="block group">
                                <Image
                                    src={post.thumbnailUrl}
                                    alt={`${post.title} Thumbnail`}
                                    width={600}
                                    height={400}
                                    className="blog-post-thumbnail"
                                />
                                <div className="p-6">
                  <span className={`text-xs ${post.categoryColorClass} uppercase font-semibold tracking-wider`}>
                    {post.category}
                  </span>
                                    <h3 className={`text-xl font-bold text-white mt-2 mb-3 ${post.hoverTitleColorClass} transition-colors`}>
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                                    <span className="text-sm text-gray-500">{post.date} • {post.readTime}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <p ref={visitBlogButtonRef} className="text-center mt-16 opacity-0" data-delay="500">
                    <Link href="#" className="btn btn-secondary text-lg">
                        Visit My Blog (Coming Soon)
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default RecentBlogPostsSection;
