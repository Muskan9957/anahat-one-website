const values = [
  {
    title: "Craft over compromise",
    description: "We sweat the details others skip. Quality is never negotiable across any of our ventures.",
  },
  {
    title: "People first, always",
    description: "Whether guests, users, or partners, real human needs drive every decision we make.",
  },
  {
    title: "Built to last",
    description: "We invest for the long term, engineering products and experiences that endure.",
  },
  {
    title: "One unified team",
    description: "Shared talent and expertise flow across ventures, compounding what we can achieve.",
  },
]

export function WhySection() {
  return (
    <section id="why" className="scroll-mt-20 border-t border-border py-14 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-[0.25em] text-primary">WHY ANAHAT ONE</span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
            The principles behind everything we build.
          </h2>
        </div>

        <div className="mt-8 md:mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="bg-card p-5 md:p-10">
              <h3 className="font-serif text-xl font-medium text-foreground md:text-2xl">{v.title}</h3>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground md:mt-3 md:text-base">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
