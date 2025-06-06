import PageHeaderAbout from "@/components/about/PageHeaderAbout";
import MyStorySection from "@/components/about/MyStorySection";
import EducationSection from "@/components/about/EducationSection";
import ExperienceSection from "@/components/about/ExperienceSection";
import MyPhilosophySectionAbout from "@/components/about/MyPhilosophySectionAbout";
import SkillsOverviewSection from "@/components/about/SkillsOverviewSection";
import BeyondCodeExpandedSection from "@/components/about/BeyondCodeExpandedSection";
import FutureAspirationsSection from "@/components/about/FutureAspirationsSection";
import CTASection from "@/components/CTASection";


export default function AboutPage() {
    return (
        <>
            <PageHeaderAbout />
            <MyStorySection/>
            <EducationSection/>
            <ExperienceSection/>
            <MyPhilosophySectionAbout/>
            <SkillsOverviewSection/>
            <BeyondCodeExpandedSection/>
            <FutureAspirationsSection/>
            <CTASection/>
        </>
    )
}
