'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface Project {
    id: string;
    title: string;
    categories: string[];
    imageUrl: string;
    imageAlt: string;
    problem: string;
    features: string;
    learnings: string;
    technologies: string[];
    liveDemoUrl: string;
    githubUrl: string;
    isFeatured?: boolean;
    delay?: number;
    score?: string;
    taskUrl?: string;
}

const allProjectsData: Project[] = [
    {
        id: 'personal-portfolio-nextjs',
        title: 'Personal Portfolio (This Site!)',
        categories: ['react', 'nextjs', 'typescript', 'tailwind', 'featured', 'js-app'],
        imageUrl: '/images/projects/portfolio-preview.png',
        imageAlt: 'Screenshot of Personal Portfolio Website',
        problem: 'To create a modern, responsive, and interactive personal portfolio to showcase skills, projects, and experience to potential employers and collaborators.',
        features: 'Multi-page architecture (Home, About, Skills, Projects, Certificates, Contact), dynamic content rendering using Next.js App Router, interactive UI elements, smooth animations (Anime.js, CSS 3D transforms), project filtering, responsive design with Tailwind CSS.',
        learnings: 'Deepening skills in Next.js (App Router), TypeScript for type safety, advanced Tailwind CSS usage, implementing various animation techniques, component-based architecture, and understanding the deployment process for Next.js applications.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Anime.js', 'Git', 'Vercel'],
        liveDemoUrl: 'https://portfolio-jade-six-50.vercel.app/',
        githubUrl: '#',
        isFeatured: true,
        delay: 100,
    },
    {
        id: 'ai-assistant-gemini',
        title: 'AI Assistant Web App (Gemini API)',
        categories: ['react', 'nextjs', 'typescript', 'tailwind', 'api', 'chatbot', 'ai-assistant', 'featured'],
        imageUrl: '/images/projects/ai-assistant.png',
        imageAlt: 'AI Assistant Web App Screenshot',
        problem: 'Build an interactive AI-powered chat application using Next.js and the Gemini API.',
        features: 'Multi-chat session support, Markdown rendering for responses, code formatting with syntax highlighting, chat history saved to localStorage, responsive design.',
        learnings: 'Integrating with Large Language Models (Gemini API), managing complex chat state, client-side storage (localStorage), parsing and rendering Markdown in React, building full-stack applications with Next.js.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Gemini API', 'Markdown', 'localStorage'],
        liveDemoUrl: 'https://my-ai-assistant-mu.vercel.app/',
        githubUrl: 'https://github.com/Volodia34/my-ai-assistant',
        isFeatured: true,
        delay: 120,
    },
    {
        id: 'resst-client-rs',
        title: 'REST Client (React Final Project)',
        categories: ['react', 'rest', 'api', 'final-project', 'featured', 'rs-react'],
        imageUrl: '/images/projects/rest-client.png',
        imageAlt: 'Rest Client Final Project Screenshot',
        problem: 'Develop a fully functional GraphQL client application with features like query editing, response display, authentication, history, and variables management.',
        features: 'Main page with project info & auth, Sign In/Up with validation, RESTful-like client for GraphQL (query editor, prettify, base64 body, method selector, URL input, headers, code generation), History route, Variables route, i18n, sticky header, user-friendly error display.',
        learnings: 'Complex React application architecture, GraphQL integration, authentication flows (token handling, expiration), advanced state management (Redux/Context), i18n implementation, local storage for history/variables, building a feature-rich developer tool.',
        technologies: ['React', 'REST', 'TypeScript', 'Redux', 'i18next', 'REST (principles)', 'CSS Modules/Styled Comp.'],
        liveDemoUrl: 'https://curious-bunny-d2364e.netlify.app/',
        githubUrl: '#',
        isFeatured: true,
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/final.md',
        delay: 150,
    },
    {
        id: 'shelter-rs',
        title: 'Shelter (Parts 1 & 2)',
        categories: ['stage0', 'layout', 'js-app', 'featured'],
        imageUrl: '/images/projects/shelter.png',
        imageAlt: 'Shelter Project RS School',
        problem: 'Develop a responsive multi-page website for an animal shelter according to the provided Figma layout, including interactive elements like sliders, pagination, and pop-ups.',
        features: 'Pixel-perfect layout (1280px, 768px, 320px), burger menu, pets carousel/slider, pagination for pets page, modal windows for pet details.',
        learnings: 'Advanced HTML/CSS layout (Flexbox, Grid), SASS, BEM, JavaScript for DOM manipulation, event handling, creating sliders, pagination logic, and popups. Adherence to strict project requirements and deadlines.',
        technologies: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Figma', 'Webpack'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFEPRESCHOOL2024Q2/shelter/main.html',
        githubUrl: 'https://github.com/Volodia34/rsschool-shelter',
        isFeatured: true,
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/shelter/shelter.md',
        delay: 200,
    },
    {
        id: 'audio-player-rs',
        title: 'Audio Player (JS30)',
        categories: ['stage0', 'js-app', 'featured'],
        imageUrl: '/images/projects/audio-plaayer.png',
        imageAlt: 'Audio Player Project RS School',
        problem: 'Create a custom HTML5 audio player with core functionalities as part of the JS30 challenge.',
        features: 'Play/Pause, track switching (forward/backward, circular), draggable progress bar, track duration and current time display, dynamic cover image change based on the current track.',
        learnings: 'JavaScript Audio API, DOM manipulation for custom controls, event handling for player interactions, implementing draggable elements.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFEPRESCHOOL2024Q2/audio-player/',
        githubUrl: 'https://github.com/Volodia34/rsschool-js30/tree/audio-player',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30.md',
        delay: 300,
    },
    {
        id: 'react-performance-rs',
        title: 'React Performance Optimization',
        categories: ['react', 'api', 'performance', 'rs-react'],
        imageUrl: '/images/projects/react-performance.png',
        imageAlt: 'React Performance Optimization Project Screenshot',
        problem: 'Optimize a React application that displays country data, focusing on rendering performance.',
        features: 'Fetch & display country data (name, population, region, flag), filtering by region, searching by name, sorting by population/name, highlighting visited countries.',
        learnings: 'React performance optimization techniques: useMemo, useCallback, React.memo. Profiling React applications using browser developer tools.',
        technologies: ['React', 'JavaScript', 'CSS', 'API'],
        liveDemoUrl: 'https://volodia34.github.io/react-performance/',
        githubUrl: '#',
        isFeatured: false,
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/performance.md',
        delay: 300,
    },
    {
        id: 'react-forms-rs',
        title: 'React Forms with Validation',
        categories: ['react', 'forms', 'redux', 'rs-react'],
        imageUrl: '/images/projects/react-forms-rs.png',
        imageAlt: 'React Forms Project Screenshot',
        problem: 'Implement complex forms with client-side validation and state management using Redux.',
        features: 'Multiple routes, Redux for form data collection, validation with Yup/Zod, various input types (name, age, email, gender, image upload as base64), password strength indicator, autocomplete.',
        learnings: 'React form handling, controlled components, integration with validation libraries (Yup/Zod), Redux for state management, handling image uploads (base64).',
        technologies: ['React', 'Redux', 'Yup/Zod', 'TypeScript', 'CSS'],
        liveDemoUrl: 'https://warm-hamster-2008f7.netlify.app/',
        githubUrl: '#',
        isFeatured: false,
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/forms.md',
        delay: 350,
    },
    {
        id: 'christmas-shop-stage1',
        title: 'Christmas Shop (Stage 1)',
        categories: ['stage1', 'js-app', 'featured'],
        imageUrl: '/images/projects/christmas-shop.png',
        imageAlt: 'Christmas Shop Stage 1',
        problem: 'Build an interactive online store for Christmas decorations with advanced filtering and data handling.',
        features: 'Complex filtering (by type, color, size, favorites), sorting, search, data storage (localStorage), dynamic card generation.',
        learnings: 'Advanced JavaScript, data manipulation, working with local storage, complex UI interactions, module bundling (Webpack).',
        technologies: ['JavaScript', 'HTML', 'CSS', 'Webpack'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFE2024Q4/home',
        githubUrl: 'https://github.com/Volodia34/jsfe2024q4/tree/christmas-shop',
        isFeatured: true,
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/christmas-shop/christmas-shop.md',
        delay: 350,
    },
    {
        id: 'pokedex-react',
        title: 'Pokedex (React)',
        categories: ['react', 'api'],
        imageUrl: '/images/projects/pokedex.png',
        imageAlt: 'Pokedex React Project',
        problem: 'Develop a dynamic interface for browsing Pokémon data using React and a public API.',
        features: 'Fetching data from PokeAPI, displaying Pokémon with details in cards, search functionality, and filtering options.',
        learnings: 'React functional components, hooks (useState, useEffect), API calls with Fetch/Axios, basic state management in React, conditional rendering.',
        technologies: ['React', 'API', 'JavaScript', 'CSS'],
        liveDemoUrl: 'https://effervescent-kulfi-73fa73.netlify.app/',
        githubUrl: 'https://github.com/Volodia34/pokedex',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md',
        isFeatured: true,
        delay: 400,
    },
    {
        id: 'image-gallery-rs',
        title: 'Image Gallery (JS30)',
        categories: ['stage0', 'js-app', 'api'],
        imageUrl: '/images/projects/image-gallery.png',
        imageAlt: 'Image Gallery Project RS School',
        problem: 'Develop an image gallery that fetches and displays images from an API based on search queries.',
        features: 'API integration (e.g., Unsplash/Flickr), search functionality (Enter key, clear button), dynamic image display, persistent search query in input.',
        learnings: 'Working with third-party APIs, handling asynchronous requests (async/await, Promises), search input management, dynamic content rendering.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFEPRESCHOOL2024Q2/image-gallery/',
        githubUrl: 'https://github.com/Volodia34/rsschool-js30/tree/image-gallery',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30.md',
        delay: 450,
    },
    {
        id: 'css-mem-slider-rs',
        title: 'CSS Mem Slider',
        categories: ['stage0', 'css', 'layout'],
        imageUrl: '/images/projects/css-mem-slider.png',
        imageAlt: 'CSS Mem Slider Project',
        problem: 'Create an image slider using only CSS, showcasing advanced CSS capabilities.',
        features: 'Smooth transitions between slides, responsive design, navigation controls (if possible with pure CSS).',
        learnings: 'Advanced CSS selectors (e.g., sibling combinators, pseudo-classes), CSS transitions and animations, checkbox hack or similar techniques for interactivity without JS.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/cssMemeSlider/cssMemeSlider/index.html',
        githubUrl: 'https://github.com/Volodia34/cssMemeSlider',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/js30%23/js30.md',
        delay: 500,
    },
    {
        id: 'random-game-rs',
        title: 'Random Game (Doodle Jump Clone)',
        categories: ['stage0', 'js-app', 'game'],
        imageUrl: '/images/projects/random-game.png',
        imageAlt: 'Random Game (Doodle Jump Clone)',
        problem: 'Recreate a simplified version of the Doodle Jump game for the web using vanilla JavaScript.',
        features: 'Character movement (keyboard controls), randomly generated platforms, basic scoring mechanism, game over condition.',
        learnings: 'Basic game development principles, 2D physics (gravity, jumping), collision detection (simplified), game loop implementation.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFEPRESCHOOL2024Q2/random-game/',
        githubUrl: 'https://github.com/Volodia34/rsschool-js30/tree/random-game',
        delay: 550,
    },
    {
        id: 'cv-rs',
        title: 'CV (RS School Stage 0)',
        categories: ['stage0', 'layout'],
        imageUrl: '/images/projects/cv.png',
        imageAlt: 'CV Project RS School',
        problem: 'Create a personal CV page according to specific layout and content requirements for RS School.',
        features: 'Semantic HTML structure, CSS styling for professional look, responsive layout for different screen sizes.',
        learnings: 'Fundamental HTML and CSS, semantic markup, responsive design principles, following a design specification.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/rsschool-cv/',
        githubUrl: 'https://github.com/Volodia34/rsschool-cv',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/cv/cv-stage0.md',
        delay: 600,
    },
    {
        id: 'simon-says-stage1',
        title: 'Simon Says (Stage 1)',
        categories: ['stage1', 'js-app', 'game'],
        imageUrl: '/images/projects/simon-says.png',
        imageAlt: 'Simon Says Game Stage 1',
        problem: 'Develop the classic Simon Says memory game with increasing difficulty and sound effects.',
        features: 'Pattern generation, user input validation, sound effects for sequences and errors, increasing difficulty levels, score tracking.',
        learnings: 'Game logic implementation in JavaScript, handling user interactions, audio integration, managing game state.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFE2024Q4/simon-says/',
        githubUrl: 'https://github.com/Volodia34/jsfe2024q4/tree/simon-says',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/tree/master/stage1/tasks/simon-says',
        delay: 650,
    },
    {
        id: 'nonograms-stage1',
        title: 'Nonograms (Stage 1)',
        categories: ['stage1', 'js-app', 'game'],
        imageUrl: '/images/projects/nonograms.png',
        imageAlt: 'Nonograms Game Stage 1',
        problem: 'Create a Nonograms (Picross) puzzle game where players solve picture logic puzzles.',
        features: 'Grid generation based on puzzle data, user interaction for filling/marking cells, puzzle solving logic validation, timer, multiple puzzles.',
        learnings: 'Algorithmic thinking for puzzle logic, 2D array manipulation, complex UI logic for interactive puzzle games, state management for game progress.',
        technologies: ['JavaScript', 'HTML', 'CSS'],
        liveDemoUrl: 'https://rolling-scopes-school.github.io/volodia34-JSFE2024Q4/nonograms/',
        githubUrl: 'https://github.com/Volodia34/jsfe2024q4/tree/nonograms',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/tasks/nonograms/README.md',
        delay: 700,
    },
    {
        id: 'rick-and-morty-api',
        title: 'Rick and Morty API App',
        categories: ['react', 'api'],
        imageUrl: '/images/projects/rick-and-morty.png',
        imageAlt: 'Rick and Morty API App',
        problem: 'Create an application to browse and search characters from the Rick and Morty API.',
        features: 'Fetching and displaying character data, search by name, pagination for results.',
        learnings: 'React, API integration, handling multiple API endpoints, state management for search and pagination.',
        technologies: ['React', 'API', 'JavaScript'],
        liveDemoUrl: 'https://roaring-sunflower-331fac.netlify.app/',
        githubUrl: 'https://github.com/Volodia34/rick-and-morty',
        taskUrl: 'https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/tasks/class-components.md',
        delay: 800,
    },
    {
        id: 'quiz-app-react',
        title: 'Quiz App (React)',
        categories: ['react'],
        imageUrl: '/images/projects/quiz-app.png',
        imageAlt: 'Quiz App React',
        problem: 'Develop an interactive quiz application with multiple questions and scoring.',
        features: 'Displaying questions and multiple-choice answers, tracking user selections, calculating and displaying score.',
        learnings: 'React components and props, state management for quiz flow, conditional rendering for questions and results.',
        technologies: ['React', 'JavaScript'],
        liveDemoUrl: 'https://wondrous-selkie-923552.netlify.app/',
        githubUrl: 'https://github.com/Volodia34/quiz-app',
        delay: 850,
    },
    {
        id: 'psychology-layout-old',
        title: 'Psychology Layout',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/psychology-layout.png',
        imageAlt: 'Psychology Layout',
        problem: 'Implement a static layout based on a design mockup for a psychology-themed website.',
        features: 'Pixel-perfect implementation, responsive design across multiple breakpoints.',
        learnings: 'HTML structure, advanced CSS styling, SCSS for better organization.',
        technologies: ['HTML', 'CSS', 'SCSS'],
        liveDemoUrl: 'https://volodia34.github.io/psychology/',
        githubUrl: 'https://github.com/Volodia34/psychology',
        delay: 900,
    },
    {
        id: 'business-layout-old',
        title: 'Business Layout',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/business-layout.png',
        imageAlt: 'Business Layout',
        problem: 'Implement a static layout for a generic business website from a provided design.',
        features: 'Clean and professional structure, responsive elements for common devices.',
        learnings: 'HTML semantic markup, CSS layout techniques (Flexbox/Grid), best practices for maintainable CSS.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/business/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/business',
        delay: 950,
    },
    {
        id: 'design-and-layout-old',
        title: 'Design and Layout Practice',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/design-and-layout.png',
        imageAlt: 'Design and Layout Practice',
        problem: 'Practice implementing various design elements and layout structures.',
        features: 'Focus on specific CSS properties, layout challenges, and design replication.',
        learnings: 'Experimentation with CSS, understanding box model, positioning, and responsive techniques.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/design-and-layout/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/design-and-layout',
        delay: 1000,
    },
    {
        id: 'residential-complex-layout',
        title: 'Residential Complex Layout',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/residential-complex-layout.png',
        imageAlt: 'Residential Complex Layout',
        problem: 'Create a landing page layout for a residential complex.',
        features: 'Visually appealing sections, information blocks, contact forms (layout only).',
        learnings: 'Structuring larger layouts, combining different CSS techniques.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/residential-complex/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/residential-complex',
        delay: 1050,
    },
    {
        id: 'market-layout',
        title: 'Market Layout',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/market-layout.png',
        imageAlt: 'Market Layout',
        problem: 'Design and implement a layout for a marketplace or e-commerce listing page.',
        features: 'Product grid/list display, filter sidebars (layout only), product card design.',
        learnings: 'Complex grid layouts, UI patterns for e-commerce.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/marken/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/marken',
        delay: 1100,
    },
    {
        id: 'cards-layout',
        title: 'Cards Layout Practice',
        categories: ['layout', 'first'],
        imageUrl: '/images/projects/cards-layout.png',
        imageAlt: 'Cards Layout Practice',
        problem: 'Practice creating various card-based UI components.',
        features: 'Different styles of cards: profile cards, product cards, article cards.',
        learnings: 'Component-based thinking in HTML/CSS, styling interactive elements.',
        technologies: ['HTML', 'CSS'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/Cards/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/Cards',
        delay: 1150,
    },
    {
        id: 'first-html',
        title: 'First HTML Page',
        categories: ['layout', 'stage0', 'first'],
        imageUrl: '/images/projects/first-html.png',
        imageAlt: 'First HTML Page',
        problem: 'Experiment with basic HTML tags and structure.',
        features: 'Headings, buttons, links, inputs, images.',
        learnings: 'The very first steps in web development, understanding HTML document structure.',
        technologies: ['HTML'],
        liveDemoUrl: 'https://volodia34.github.io/old-projects/html-volodia/',
        githubUrl: 'https://github.com/Volodia34/old-projects/tree/main/html-volodia',
        delay: 1200,
    },
];


const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Featured', value: 'featured' },
    { label: 'Stage 0', value: 'stage0' },
    { label: 'Stage 1', value: 'stage1' },
    { label: 'React', value: 'react' },
    { label: 'JS Apps', value: 'js-app' },
    { label: 'Layouts', value: 'layout' },
    { label: 'CSS', value: 'css' },
    { label: 'API', value: 'api' },
    { label: 'Games', value: 'game' },
    { label: 'First Projects', value: 'first' },
];

const ProjectListSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [projectsToDisplay, setProjectsToDisplay] = useState<Project[]>([]);

    const featuredSectionTitleRef = useRef<HTMLHeadingElement>(null);
    const allProjectsTitleRef = useRef<HTMLHeadingElement>(null);
    const filterButtonsRef = useRef<HTMLDivElement>(null);
    const projectGridRef = useRef<HTMLDivElement>(null);
    const featuredGridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let filtered;
        if (activeFilter === 'all') {
            filtered = allProjectsData.map(p => p);
        } else if (activeFilter === 'featured') {
            filtered = allProjectsData.filter(p => p.isFeatured);
        } else {
            filtered = allProjectsData.filter(p => p.categories.includes(activeFilter));
        }
        setProjectsToDisplay(filtered);
    }, [activeFilter]);

    const animateVisibleElements = useCallback((elements: (HTMLElement | null)[]) => {
        if (typeof window.anime !== 'undefined' && elements.length > 0) {
            const anime = window.anime;
            elements.filter(el => el).forEach(el => {
                el!.style.opacity = '0'; // Встановлюємо початкову прозорість для анімації
                el!.style.transform = `translateY(${el!.dataset.translateY || 20}px) scale(${parseFloat(el!.dataset.scaleStart || '0.95')})`;

                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            anime({
                                targets: el,
                                translateY: 0,
                                opacity: 1,
                                scale: 1,
                                easing: 'easeOutExpo',
                                duration: 600,
                                delay: parseInt(el!.dataset.delay || '0'),
                            });
                            obs.unobserve(el!);
                        }
                    });
                }, { threshold: 0.1 });
                observer.observe(el!);
            });
        } else {
            elements.filter(el => el).forEach(el => { el!.style.opacity = '1'; });
        }
    }, []);

    useEffect(() => {
        const staticElements = [
            featuredSectionTitleRef.current,
            allProjectsTitleRef.current,
            filterButtonsRef.current,
        ].filter(Boolean);
        animateVisibleElements(staticElements as HTMLElement[]);

        if (filterButtonsRef.current && typeof window.anime !== 'undefined') {
            const anime = window.anime;
            const filterButtons = Array.from(filterButtonsRef.current.querySelectorAll('.filter-btn')) as HTMLElement[];
            filterButtons.forEach(btn => btn.style.opacity = '0');
            anime({
                targets: filterButtons,
                translateY: [20, 0],
                opacity: [0,1],
                delay: (el: HTMLElement, i: number) =>
                    Number(
                        anime.stagger(
                            100,
                            { start: parseInt(filterButtonsRef.current!.dataset.delay || '200') }
                        )(el, i)
                    ),
                easing: 'easeOutExpo',
                duration: 600
            });
        }

        const featuredCards = Array.from(featuredGridRef.current?.querySelectorAll('.project-card') || []) as HTMLElement[];
        animateVisibleElements(featuredCards);

    }, [animateVisibleElements]);

    useEffect(() => {
        const cardsInGrid = Array.from(projectGridRef.current?.children || []) as HTMLElement[];
        animateVisibleElements(cardsInGrid);
    }, [projectsToDisplay, animateVisibleElements]);


    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };

    const featuredProjects = allProjectsData.filter(p => p.isFeatured);

    return (
        <>
            <section id="featured-projects-section" className="py-20 md:py-28 section-divider-bottom">
                <div className="container mx-auto px-6">
                    <h2 ref={featuredSectionTitleRef} className="section-title-custom text-center opacity-0" data-delay="0">Featured Projects</h2>
                    <div ref={featuredGridRef} className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10 mt-12">
                        {featuredProjects.map((project) => (
                            <div key={project.id} className="project-card featured-project opacity-0" data-category={project.categories.join(' ')} data-delay={project.delay}>
                                <div className="project-image-container">
                                    <Image src={project.imageUrl} alt={project.imageAlt} width={600} height={400} className="project-thumbnail" />
                                    {project.isFeatured && <span className="featured-badge">Featured</span>}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-sm text-gray-400 mb-1"><strong className="text-slate-300">Problem:</strong> {project.problem}</p>
                                        <p className="text-sm text-gray-400 mb-1"><strong className="text-slate-300">Features:</strong> {project.features}</p>
                                        <p className="text-sm text-gray-400 mb-4"><strong className="text-slate-300">Learnings:</strong> {project.learnings}</p>
                                        {project.score && <p className="text-sm text-yellow-400 mb-2"><strong>Score:</strong> {project.score}</p>}
                                        {project.taskUrl && <Link href={project.taskUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-cyan-400 mb-3 inline-block">View Task <i className="fas fa-external-link-alt fa-xs ml-1"></i></Link>}
                                        <div className="mb-4">
                                            {project.technologies.map(tech => <span key={tech} className="project-tag">{tech}</span>)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto pt-4">
                                        <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt mr-2"></i>Live Demo</Link>
                                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-github mr-2"></i>GitHub</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="all-projects-gallery" className="py-20 md:py-28 section-divider-top">
                <div className="container mx-auto px-6">
                    <h2 ref={allProjectsTitleRef} className="section-title-custom text-center opacity-0" data-delay="100">All My Projects</h2>
                    <div ref={filterButtonsRef} id="filter-buttons" className="flex flex-wrap justify-center gap-3 mb-12 opacity-0" data-delay="200">
                        {filterOptions.map(opt => (
                            <button
                                key={opt.value}
                                className={`filter-btn ${activeFilter === opt.value ? 'active' : ''}`}
                                data-filter={opt.value}
                                onClick={() => handleFilterChange(opt.value)}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>

                    <div ref={projectGridRef} id="projects-grid" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                        {projectsToDisplay.map((project, idx) => (
                            <div key={project.id} className="project-card opacity-0" data-category={project.categories.join(' ')} data-delay={`${idx * 100 + 300}`}> {/* Dynamic delay for staggered effect */}
                                <div className="project-image-container">
                                    <Image src={project.imageUrl} alt={project.imageAlt} width={600} height={400} className="project-thumbnail" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                        <p className="text-sm text-gray-400 mb-1"><strong className="text-slate-300">Goal:</strong> {project.problem}</p>
                                        <p className="text-sm text-gray-400 mb-1"><strong className="text-slate-300">Features:</strong> {project.features}</p>
                                        <p className="text-sm text-gray-400 mb-4"><strong className="text-slate-300">Learnings:</strong> {project.learnings}</p>
                                        {project.score && <p className="text-sm text-yellow-400 mb-2"><strong>Score:</strong> {project.score}</p>}
                                        {project.taskUrl && <Link href={project.taskUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-cyan-400 mb-3 inline-block">View Task <i className="fas fa-external-link-alt fa-xs ml-1"></i></Link>}
                                        <div className="mb-4">
                                            {project.technologies.map(tech => <span key={tech} className="project-tag">{tech}</span>)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-auto pt-4">
                                        <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt mr-2"></i>Live Demo</Link>
                                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-github mr-2"></i>GitHub</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectListSection;
