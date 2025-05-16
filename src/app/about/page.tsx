import PageHeaderAbout from "@/components/about/PageHeaderAbout";
import MyStorySection from "@/components/about/MyStorySection";
import EducationSection from "@/components/about/EducationSection";
import ExperienceSection from "@/components/about/ExperienceSection";


export default function AboutPage() {
    return (
        <>
            <PageHeaderAbout />
            <MyStorySection/>
            <EducationSection/>
            <ExperienceSection/>
        </>
    )
}
