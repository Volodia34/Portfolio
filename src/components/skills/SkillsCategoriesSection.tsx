'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';


interface SkillItem {
    type: 'icon' | 'text' | 'image';
    content: string;
    label: string;
    hoverColorClass?: string;
    imageGrayscale?: boolean;
    iconSizeClass?: string;
    isTextInBg?: boolean;
}

interface SkillCategory {
    title: string;
    iconClass: string;
    iconColor: string;
    skills: SkillItem[];
    delay: number;
}

const categoriesData: SkillCategory[] = [
    {
        title: 'Programming Languages',
        iconClass: 'fas fa-laptop-code',
        iconColor: 'text-cyan-400',
        skills: [
            { type: 'icon', content: 'fab fa-js-square', label: 'JavaScript (ES6+)', hoverColorClass: 'group-hover:text-yellow-400', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'text', content: 'TS', label: 'TypeScript', hoverColorClass: 'group-hover:text-blue-400', iconSizeClass: 'text-3xl md:text-4xl font-bold', isTextInBg: true },
        ],
        delay: 200,
    },
    {
        title: 'Frameworks & Libraries',
        iconClass: 'fas fa-cubes',
        iconColor: 'text-purple-400',
        skills: [
            { type: 'icon', content: 'fab fa-react', label: 'React', hoverColorClass: 'group-hover:text-sky-400', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-cube', label: 'Next.js', hoverColorClass: 'group-hover:text-white', iconSizeClass: 'text-3xl md:text-4xl' }, // Іконка для Next.js
            { type: 'icon', content: 'fab fa-angular', label: 'Angular', hoverColorClass: 'group-hover:text-red-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-sync-alt', label: 'Redux/Toolkit', hoverColorClass: 'group-hover:text-purple-500', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'icon', content: 'fas fa-exchange-alt', label: 'Axios', hoverColorClass: 'group-hover:text-indigo-400', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'icon', content: 'fas fa-palette', label: 'Material-UI', hoverColorClass: 'group-hover:text-blue-500', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'icon', content: 'fas fa-server', label: 'Express.js', hoverColorClass: 'group-hover:text-gray-200', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'icon', content: 'fas fa-shipping-fast', label: 'Fastify', hoverColorClass: 'group-hover:text-orange-400', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'text', content: 'RHF', label: 'React Hook Form', iconSizeClass: 'text-xl font-semibold', isTextInBg: true },
            { type: 'text', content: 'MobX', label: 'MobX', iconSizeClass: 'text-xl font-semibold', isTextInBg: true },
            { type: 'text', content: 'Prime', label: 'PrimeReact', iconSizeClass: 'text-xl font-semibold', isTextInBg: true },
        ],
        delay: 250,
    },
    {
        title: 'Markup & Styling',
        iconClass: 'fas fa-paint-brush',
        iconColor: 'text-pink-400',
        skills: [
            { type: 'icon', content: 'fab fa-html5', label: 'HTML5', hoverColorClass: 'group-hover:text-orange-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-css3-alt', label: 'CSS3', hoverColorClass: 'group-hover:text-blue-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-sass', label: 'SCSS/SASS', hoverColorClass: 'group-hover:text-pink-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'image', content: 'https://raw.githubusercontent.com/tailwindlabs/tailwindcss/master/.github/logo-mark.svg', label: 'Tailwind CSS', imageGrayscale: true },
        ],
        delay: 300,
    },
    {
        title: 'Version Control & Collaboration',
        iconClass: 'fas fa-code-branch',
        iconColor: 'text-green-400',
        skills: [
            { type: 'icon', content: 'fab fa-git-alt', label: 'Git', hoverColorClass: 'group-hover:text-orange-600', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-github', label: 'GitHub', hoverColorClass: 'group-hover:text-white', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-jira', label: 'Jira', hoverColorClass: 'group-hover:text-blue-600', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-confluence', label: 'Confluence', hoverColorClass: 'group-hover:text-blue-700', iconSizeClass: 'text-4xl md:text-5xl' },
        ],
        delay: 350,
    },
    {
        title: 'Tools & DevOps',
        iconClass: 'fas fa-tools',
        iconColor: 'text-orange-400',
        skills: [
            { type: 'icon', content: 'fab fa-node-js', label: 'Node.js', hoverColorClass: 'group-hover:text-green-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-npm', label: 'NPM', hoverColorClass: 'group-hover:text-red-600', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-yarn', label: 'Yarn', hoverColorClass: 'group-hover:text-blue-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-docker', label: 'Docker', hoverColorClass: 'group-hover:text-blue-600', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-bolt', label: 'Vite', hoverColorClass: 'group-hover:text-yellow-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-box-open', label: 'Webpack', hoverColorClass: 'group-hover:text-blue-400', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-cloud-upload-alt', label: 'Vercel/Netlify', hoverColorClass: 'group-hover:text-white', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fab fa-jenkins', label: 'Jenkins', hoverColorClass: 'group-hover:text-gray-500', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-book-open', label: 'Storybook', hoverColorClass: 'group-hover:text-pink-400', iconSizeClass: 'text-3xl md:text-4xl' },
            { type: 'icon', content: 'fas fa-rocket', label: 'Postman', hoverColorClass: 'group-hover:text-orange-500', iconSizeClass: 'text-3xl md:text-4xl' },
        ],
        delay: 400,
    },
    {
        title: 'Databases',
        iconClass: 'fas fa-database',
        iconColor: 'text-yellow-400',
        skills: [
            { type: 'icon', content: 'fas fa-leaf', label: 'MongoDB', hoverColorClass: 'group-hover:text-green-600', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'icon', content: 'fas fa-project-diagram', label: 'GraphQL', hoverColorClass: 'group-hover:text-pink-600', iconSizeClass: 'text-4xl md:text-5xl' },
        ],
        delay: 450,
    },
    {
        title: 'Testing',
        iconClass: 'fas fa-vial',
        iconColor: 'text-teal-400',
        skills: [
            { type: 'icon', content: 'fas fa-flask', label: 'Jest', hoverColorClass: 'group-hover:text-green-400', iconSizeClass: 'text-4xl md:text-5xl' },
            { type: 'text', content: 'RTL', label: 'React Testing Library', iconSizeClass: 'text-lg font-semibold', isTextInBg: true },
        ],
        delay: 500,
    },
];


const SkillsCategoriesSection: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const categoryCardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
                            scale: [parseFloat(target.dataset.scaleStart || '0.97'), 1],
                            easing: 'easeOutExpo',
                            duration: 800,
                            delay: target.dataset.delay ? parseInt(target.dataset.delay) : 0,
                        });
                        observer.unobserve(target);
                    }
                });
            };
            const observerOptions = { threshold: 0.1 };
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToObserve = [descriptionRef.current, ...categoryCardsRef.current];
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [descriptionRef.current, ...categoryCardsRef.current];
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);


    return (
        <section ref={sectionRef} id="skills-categories" className="py-20 md:py-28">
            <div className="container mx-auto px-6">
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="150">
                    I continuously strive to expand my technical skillset and stay updated with the latest industry trends. Below is a summary of the key technologies and tools I work with.
                </p>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
                    {categoriesData.map((category, index) => (
                        <div
                            key={category.title}
                            ref={el => { categoryCardsRef.current[index] = el; }}
                            className="skill-category-card opacity-0"
                            data-delay={category.delay}
                        >
                            <h3 className={`category-title ${category.iconColor}`}>
                                <i className={`${category.iconClass} mr-3`}></i>{category.title}
                            </h3>
                            <div className="skills-list-icons">
                                {category.skills.map(skill => (
                                    <div key={skill.label} className="skill-icon-item group">
                                        <div className={`skill-icon-bg ${skill.isTextInBg ? 'skill-icon-bg-text-styling' : ''}`}>
                                            {skill.type === 'icon' && <i className={`${skill.content} ${skill.iconSizeClass || 'text-3xl md:text-4xl'} text-gray-400 ${skill.hoverColorClass}`}></i>}
                                            {skill.type === 'text' && <span className={`${skill.iconSizeClass || 'text-lg md:text-xl'} font-semibold text-gray-400 ${skill.hoverColorClass} p-1 leading-tight`}>{skill.content}</span>}
                                            {skill.type === 'image' && (
                                                <Image
                                                    src={skill.content}
                                                    alt={skill.label}
                                                    width={32}
                                                    height={32}
                                                    className={`h-8 w-auto ${skill.imageGrayscale ? 'filter grayscale group-hover:filter-none' : ''} transition-all duration-300`}
                                                />
                                            )}
                                        </div>
                                        <span className="skill-icon-label">{skill.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsCategoriesSection;
