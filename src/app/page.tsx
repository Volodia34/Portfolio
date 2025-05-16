import HeroSection from '@/components/HeroSection';
import WhatIDoSection from "@/components/WhatIDoSection";
import MyApproachSection from "@/components/MyApproachSection";
import MyWorkflowSection from "@/components/MyWorkflowSection";
import TechStackSection from "@/components/TechStackSection";
import BeyondCodeSection from "@/components/BeyondCodeSection";
import QuickFactsSection from "@/components/QuickFactsSection";
import RecentBlogPostsSection from "@/components/RecentBlogPostsSection";
import CTASection from "@/components/CTASection";

export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <WhatIDoSection/>
            <MyApproachSection/>
            <MyWorkflowSection/>
            <TechStackSection/>
            <BeyondCodeSection/>
            <QuickFactsSection/>
            <RecentBlogPostsSection/>
            <CTASection/>
        </>
    );
}
