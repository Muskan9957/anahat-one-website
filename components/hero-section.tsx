import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden">
      {/* Custom Blended Tech & Hospitality Background (No Stock Photos) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        
        {/* Subtle Architectural Blueprint Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]" 
          style={{
            backgroundImage: `linear-gradient(to right, var(--foreground) 1px, transparent 1px), 
                              linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Hospitality Glow: Warm Amber/Bronze (Organic shape, floating on the left) */}
        <div className="absolute -left-20 top-1/4 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(154,114,70,0.18)_0%,transparent_70%)] blur-3xl opacity-80 animate-float" style={{ animationDuration: '9s' }} />

        {/* Technology Glow: Tech Blue/Slate (Structured, floating on the right) */}
        <div className="absolute right-10 top-1/3 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle_at_center,rgba(74,100,224,0.12)_0%,transparent_70%)] blur-3xl opacity-70 animate-float" style={{ animationDuration: '11s' }} />

        {/* Floating Geometric Wireframe Ring (Intersection of Tech & Design) */}
        <svg 
          className="absolute right-[12%] top-[28%] h-[280px] w-[280px] text-[#9A7246]/20 opacity-30 animate-float"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animationDuration: '14s' }}
        >
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" />
          <path d="M 10,50 H 90 M 50,10 V 90" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        {/* Ambient Gradients to blend into theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-24 md:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary">
            ONE HEART · MANY VENTURES
          </span>
          <h1 className="mt-6 text-balance font-serif text-5xl font-medium leading-[1.08] text-foreground md:text-7xl">
            Where people and purpose feel right at home.
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Anahat One is a family of ventures — warm hospitality (
            <a 
              href="https://www.airbnb.co.uk/rooms/1259883871507298681?unique_share_id=087b05f8-8da6-4a0a-bb70-3a6b7fcf9387&amp;viralityEntryPoint=1&amp;s=76" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-foreground underline decoration-[#9A7246]/40 hover:decoration-[#9A7246] transition-colors"
            >
              Anahata: The Heart Center
            </a>
            ) and thoughtful SAAS products (
            <a 
              href="https://nuove.in" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-foreground underline decoration-[#9A7246]/40 hover:decoration-[#9A7246] transition-colors"
            >
              nuove.in
            </a>
            ) — built by people who genuinely care about the ones they serve.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" nativeButton={false} render={<a href="#ventures">Explore our ventures</a>} />
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-border bg-transparent"
              render={<a href="#contact">Partner with us</a>}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
