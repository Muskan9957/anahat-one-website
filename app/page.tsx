import { SiteNav } from "@/components/site-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VenturesSection } from "@/components/ventures-section"
import { WhySection } from "@/components/why-section"
import { PartnersSection } from "@/components/partners-section"
import { ContactSection } from "@/components/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { SilkBackgroundClient } from "@/components/silk-background-client"

export default function Page() {
  return (
    <div className="relative min-h-svh bg-[#08071a]">
      {/* Fixed full-page silk wave background — client only, no SSR */}
      <SilkBackgroundClient />

      {/* All page content sits above the background */}
      <main className="relative z-10">
        <SiteNav />
        <HeroSection />
        <AboutSection />
        <VenturesSection />
        <WhySection />
        <PartnersSection />
        <ContactSection />
        <SiteFooter />
      </main>
    </div>
  )
}
