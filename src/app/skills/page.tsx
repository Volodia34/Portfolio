import SkillsCategoriesSection from "@/components/skills/SkillsCategoriesSection";
import PageHeaderSkills from "@/components/skills/PageHeaderSkills";
import AdditionalSkillsSection from "@/components/skills/AdditionalSkillsSection";
import LearningPhilosophySectionSkills from "@/components/skills/LearningPhilosophySectionSkills";
import CurrentlyLearningSectionSkills from "@/components/skills/CurrentlyLearningSectionSkills";
import CTASection from "@/components/CTASection";

export default function SkillsPage() {
    return (
        <>
            <PageHeaderSkills/>
            <SkillsCategoriesSection/>
            <AdditionalSkillsSection/>
            <LearningPhilosophySectionSkills/>
            <CurrentlyLearningSectionSkills/>
            <CTASection/>
        </>
    );
}

