'use client';
import {useEffect, useRef} from 'react';
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
            {
                type: 'icon',
                content: 'fab fa-js-square',
                label: 'JavaScript (ES6+)',
                hoverColorClass: 'group-hover:text-yellow-400',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'text',
                content: 'TS',
                label: 'TypeScript',
                hoverColorClass: 'group-hover:text-blue-400',
                iconSizeClass: 'text-3xl md:text-4xl font-bold',
                isTextInBg: true
            },
        ],
        delay: 150,
    },
    {
        title: 'Frontend: Core Frameworks & State',
        iconClass: 'fas fa-cogs',
        iconColor: 'text-purple-400',
        skills: [
            {
                type: 'icon',
                content: 'fab fa-react',
                label: 'React',
                hoverColorClass: 'group-hover:text-sky-400',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-cube',
                label: 'Next.js',
                hoverColorClass: 'group-hover:text-slate-100',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fab fa-angular',
                label: 'Angular',
                hoverColorClass: 'group-hover:text-red-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-route',
                label: 'React Router',
                hoverColorClass: 'group-hover:text-pink-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-atom',
                label: 'Redux/Toolkit',
                hoverColorClass: 'group-hover:text-purple-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'MobX',
                label: 'MobX',
                hoverColorClass: 'group-hover:text-orange-500',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'text',
                content: 'RHF',
                label: 'React Hook Form',
                hoverColorClass: 'group-hover:text-pink-400',
                iconSizeClass: 'text-lg font-medium',
                isTextInBg: true
            },
        ],
        delay: 190,
    },
    {
        title: 'Frontend: UI Libraries & Animation',
        iconClass: 'fas fa-palette',
        iconColor: 'text-pink-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-swatchbook',
                label: 'Material-UI',
                hoverColorClass: 'group-hover:text-blue-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'Prime',
                label: 'PrimeReact',
                hoverColorClass: 'group-hover:text-blue-400',
                iconSizeClass: 'text-lg font-medium',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fas fa-chart-bar',
                label: 'D3.js',
                hoverColorClass: 'group-hover:text-orange-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: '3js',
                label: 'Three.js',
                hoverColorClass: 'group-hover:text-green-400',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fas fa-running',
                label: 'Anime.js',
                hoverColorClass: 'group-hover:text-red-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
        ],
        delay: 230,
    },
    {
        title: 'Frontend: Markup & Styling',
        iconClass: 'fas fa-paint-brush',
        iconColor: 'text-green-400',
        skills: [
            {
                type: 'icon',
                content: 'fab fa-html5',
                label: 'HTML5',
                hoverColorClass: 'group-hover:text-orange-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-css3-alt',
                label: 'CSS3',
                hoverColorClass: 'group-hover:text-blue-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-sass',
                label: 'SCSS/SASS',
                hoverColorClass: 'group-hover:text-pink-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'text',
                content: 'TW',
                label: 'Tailwind CSS',
                hoverColorClass: 'group-hover:text-sky-400',
                iconSizeClass: 'text-2xl font-semibold',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fab fa-bootstrap',
                label: 'Bootstrap',
                hoverColorClass: 'group-hover:text-purple-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
        ],
        delay: 270,
    },
    {
        title: 'Frontend: Utilities',
        iconClass: 'fas fa-wrench',
        iconColor: 'text-orange-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-exchange-alt',
                label: 'Axios',
                hoverColorClass: 'group-hover:text-indigo-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-clock',
                label: 'Moment.js',
                hoverColorClass: 'group-hover:text-gray-300',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'Lo',
                label: 'Lodash.js',
                hoverColorClass: 'group-hover:text-green-500',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
        ],
        delay: 310,
    },
    {
        title: 'Backend: Frameworks & Libraries',
        iconClass: 'fas fa-server',
        iconColor: 'text-yellow-400',
        skills: [
            {
                type: 'icon',
                content: 'fab fa-node-js',
                label: 'Node.js',
                hoverColorClass: 'group-hover:text-green-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'text',
                content: 'Nest',
                label: 'Nest.js',
                hoverColorClass: 'group-hover:text-red-500',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fas fa-server',
                label: 'Express.js',
                hoverColorClass: 'group-hover:text-gray-300',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-shipping-fast',
                label: 'Fastify',
                hoverColorClass: 'group-hover:text-orange-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-key',
                label: 'JWT',
                hoverColorClass: 'group-hover:text-yellow-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-user-shield',
                label: 'Passport.js',
                hoverColorClass: 'group-hover:text-green-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
        ],
        delay: 350,
    },
    {
        title: 'Databases & ORMs/ODMs',
        iconClass: 'fas fa-database',
        iconColor: 'text-teal-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-leaf',
                label: 'MongoDB (Mongoose)',
                hoverColorClass: 'group-hover:text-green-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'text',
                content: 'SQL',
                label: 'SQL',
                hoverColorClass: 'group-hover:text-blue-400',
                iconSizeClass: 'text-2xl font-bold',
                isTextInBg: true
            },
        ],
        delay: 390,
    },
    {
        title: 'API Technologies',
        iconClass: 'fas fa-plug',
        iconColor: 'text-blue-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-broadcast-tower',
                label: 'REST APIs',
                hoverColorClass: 'group-hover:text-yellow-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-project-diagram',
                label: 'GraphQL',
                hoverColorClass: 'group-hover:text-pink-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
        ],
        delay: 430,
    },
    {
        title: 'Web Technologies & Browser APIs',
        iconClass: 'fas fa-window-maximize',
        iconColor: 'text-red-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-cog',
                label: 'Web Workers',
                hoverColorClass: 'group-hover:text-gray-300',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-mouse-pointer',
                label: 'DOM',
                hoverColorClass: 'group-hover:text-blue-300',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-history',
                label: 'Event Loop',
                hoverColorClass: 'group-hover:text-green-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'SSR',
                label: 'SSR',
                hoverColorClass: 'group-hover:text-purple-400',
                iconSizeClass: 'text-2xl font-bold',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fas fa-universal-access',
                label: 'Web Accessibility (A11y)',
                hoverColorClass: 'group-hover:text-orange-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-tachometer-alt',
                label: 'Performance Opt.',
                hoverColorClass: 'group-hover:text-teal-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
        ],
        delay: 470,
    },
    {
        title: 'Testing',
        iconClass: 'fas fa-vial',
        iconColor: 'text-indigo-400',
        skills: [
            {
                type: 'icon',
                content: 'fas fa-flask',
                label: 'Jest',
                hoverColorClass: 'group-hover:text-green-400',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'text',
                content: 'RTL',
                label: 'React Testing Lib.',
                hoverColorClass: 'group-hover:text-red-400',
                iconSizeClass: 'text-lg font-medium',
                isTextInBg: true
            },
            {
                type: 'text',
                content: 'Cy',
                label: 'Cypress',
                hoverColorClass: 'group-hover:text-green-500',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'text',
                content: 'Mocha',
                label: 'Mocha',
                hoverColorClass: 'group-hover:text-yellow-600',
                iconSizeClass: 'text-lg font-medium',
                isTextInBg: true
            },
        ],
        delay: 510,
    },
    {
        title: 'DevTools & Version Control',
        iconClass: 'fas fa-tools',
        iconColor: 'text-lime-400',
        skills: [
            {
                type: 'icon',
                content: 'fab fa-git-alt',
                label: 'Git',
                hoverColorClass: 'group-hover:text-orange-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-github',
                label: 'GitHub',
                hoverColorClass: 'group-hover:text-slate-100',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-desktop',
                label: 'GitHub Desktop',
                hoverColorClass: 'group-hover:text-gray-300',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fab fa-gitkraken',
                label: 'GitKraken',
                hoverColorClass: 'group-hover:text-green-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fab fa-jira',
                label: 'Jira',
                hoverColorClass: 'group-hover:text-blue-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-confluence',
                label: 'Confluence',
                hoverColorClass: 'group-hover:text-blue-700',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-chrome',
                label: 'Chrome DevTools',
                hoverColorClass: 'group-hover:text-red-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-paper-plane',
                label: 'Postman',
                hoverColorClass: 'group-hover:text-orange-500',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'Ins',
                label: 'Insomnia',
                hoverColorClass: 'group-hover:text-purple-400',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'icon',
                content: 'fas fa-book-open',
                label: 'Storybook',
                hoverColorClass: 'group-hover:text-pink-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
        ],
        delay: 550,
    },
    {
        title: 'Build, Deployment & Code Quality',
        iconClass: 'fas fa-rocket',
        iconColor: 'text-rose-400',
        skills: [
            {
                type: 'icon',
                content: 'fab fa-npm',
                label: 'NPM',
                hoverColorClass: 'group-hover:text-red-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-yarn',
                label: 'Yarn',
                hoverColorClass: 'group-hover:text-blue-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-bolt',
                label: 'Vite',
                hoverColorClass: 'group-hover:text-yellow-500',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-box-open',
                label: 'Webpack',
                hoverColorClass: 'group-hover:text-blue-400',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-docker',
                label: 'Docker',
                hoverColorClass: 'group-hover:text-blue-600',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fab fa-jenkins',
                label: 'Jenkins',
                hoverColorClass: 'group-hover:text-gray-400',
                iconSizeClass: 'text-4xl md:text-5xl'
            },
            {
                type: 'icon',
                content: 'fas fa-cloud-upload-alt',
                label: 'Vercel',
                hoverColorClass: 'group-hover:text-slate-100',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-shield-alt',
                label: 'Netlify',
                hoverColorClass: 'group-hover:text-teal-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'icon',
                content: 'fas fa-file-alt',
                label: 'Swagger',
                hoverColorClass: 'group-hover:text-green-400',
                iconSizeClass: 'text-3xl md:text-4xl'
            },
            {
                type: 'text',
                content: 'ESL',
                label: 'ESLint',
                hoverColorClass: 'group-hover:text-purple-500',
                iconSizeClass: 'text-xl font-medium',
                isTextInBg: true
            },
            {
                type: 'text',
                content: 'Pret',
                label: 'Prettier',
                hoverColorClass: 'group-hover:text-teal-500',
                iconSizeClass: 'text-lg font-medium',
                isTextInBg: true
            },
        ],
        delay: 590,
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
            const observerOptions = {threshold: 0.1};
            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToObserve = [descriptionRef.current, ...categoryCardsRef.current].filter(Boolean);
            elementsToObserve.forEach(el => {
                if (el) observer.observe(el);
            });

            return () => {
                elementsToObserve.forEach(el => {
                    if (el && observer) observer.unobserve(el);
                });
            };
        } else {
            const elements = [descriptionRef.current, ...categoryCardsRef.current].filter(Boolean);
            elements.forEach(el => {
                if (el) el.style.opacity = '1';
            });
        }
    }, []);


    return (
        <section ref={sectionRef} id="skills-categories" className="py-20 md:py-28">
            <div className="container mx-auto px-6">
                <p ref={descriptionRef} className="section-description opacity-0" data-delay="100">
                    I continuously strive to expand my technical skillset and stay updated with the latest industry
                    trends. Below is a summary of the key technologies and tools I work with.
                </p>

                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-12">
                    {categoriesData.map((category, index) => (
                        <div
                            key={category.title}
                            ref={el => {
                                categoryCardsRef.current[index] = el;
                            }}
                            className="skill-category-card opacity-0"
                            data-delay={category.delay}
                        >
                            <h3 className={`category-title ${category.iconColor}`}>
                                <i className={`${category.iconClass} mr-3`}></i>{category.title}
                            </h3>
                            <div className="skills-list-icons">
                                {category.skills.map(skill => (
                                    <div key={skill.label} className="skill-icon-item group">
                                        <div
                                            className={`skill-icon-bg ${skill.isTextInBg ? 'skill-icon-bg-text-styling' : ''}`}>
                                            {skill.type === 'icon' && (
                                                <i className={`${skill.content} ${skill.iconSizeClass || 'text-3xl md:text-4xl'} text-slate-400 transition-colors duration-300 ${skill.hoverColorClass || 'group-hover:text-white'}`}></i>
                                            )}
                                            {skill.type === 'text' && (
                                                <span
                                                    className={`${skill.iconSizeClass || 'text-lg font-medium'} text-slate-400 transition-colors duration-300 ${skill.hoverColorClass || 'group-hover:text-white'} p-1 leading-tight`}>{skill.content}</span>
                                            )}
                                            {skill.type === 'image' && (
                                                <Image
                                                    src={skill.content}
                                                    alt={skill.label}
                                                    width={skill.iconSizeClass?.includes('h-10') || skill.iconSizeClass?.includes('md:h-10') ? 40 : 32}
                                                    height={skill.iconSizeClass?.includes('h-10') || skill.iconSizeClass?.includes('md:h-10') ? 40 : 32}
                                                    className={`${skill.iconSizeClass || 'h-8 w-auto md:h-8 md:w-auto'} ${skill.imageGrayscale ? 'filter grayscale group-hover:filter-none' : ''} transition-all duration-300`}
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
