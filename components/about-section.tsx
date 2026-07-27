export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <span className="text-xs font-medium tracking-[0.25em] text-primary">WHO WE ARE</span>
            <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
              A house of ventures, guided by one philosophy.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              At Anahat One, we believe great companies are built on a shared foundation of craft, integrity, and an
              obsession with the details others overlook. From the homes we host to the software we ship and the
              hardware we engineer, every venture carries the same promise.
            </p>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              We operate across industries not by chance, but by design — bringing operational discipline and a
              human-first mindset to everything we build. One team, one standard, many possibilities.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { value: "2", label: "Ventures & growing" },
                { value: "100%", label: "In-house standard" },
                { value: "24/7", label: "Operational focus" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="font-serif text-4xl font-medium text-primary">{item.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
