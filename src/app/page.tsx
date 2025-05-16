import HeroSection from '@/components/HeroSection';
import WhatIDoSection from "@/components/WhatIDoSection";
import MyApproachSection from "@/components/MyApproachSection";
import MyWorkflowSection from "@/components/MyWorkflowSection";
import TechStackSection from "@/components/TechStackSection";
import BeyondCodeSection from "@/components/BeyondCodeSection";
import QuickFactsSection from "@/components/QuickFactsSection";

export default function HomePage() {
    return (
        <>
            <HeroSection/>
            <WhatIDoSection/>
            <MyApproachSection/>
            <MyWorkflowSection />
            <TechStackSection/>
            <BeyondCodeSection/>
            <QuickFactsSection/>
            {/* <div className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-white mt-12">More Sections Coming Soon...</h2>
      </div> */}
        </>
    );
}
