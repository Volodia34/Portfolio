import PageHeaderContact from '@/components/contact/PageHeaderContact';
import ContactInfoSection from '@/components/contact/ContactInfoSection';
import ContactFormSection from '@/components/contact/ContactFormSection';
import CTASection from '@/components/CTASection';

export default function ContactPage() {
    return (
        <>
            <PageHeaderContact />
            <ContactInfoSection />
            <ContactFormSection />
            <CTASection />
        </>
    );
}
