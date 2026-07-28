import { Mail, Phone, MapPin, Building2 } from "lucide-react"

const contacts = [
  { icon: Mail, label: "Email us", value: "admin@anahatone.com", href: "mailto:admin@anahatone.com" },
  { icon: Phone, label: "Call us", value: "+91 80414 88280", href: "tel:+918041488280" },
  { icon: MapPin, label: "Visit us", value: "Bengaluru, India", href: "https://maps.google.com/?q=Bengaluru,India" },
  { icon: Building2, label: "LLP Identification No.", value: "LLPIN: ACY-2870" },
]

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-16">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <span className="text-xs font-medium tracking-[0.25em] text-primary">GET IN TOUCH</span>
              <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
                Let&apos;s build something remarkable together.
              </h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
                Whether you&apos;re looking to book a stay, partner on a product, or explore what we&apos;re building —
                we&apos;d love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-4 md:col-span-6">
              {contacts.map((c) => {
                const Icon = c.icon
                const inner = (
                  <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-primary/50 hover:bg-white/10">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs tracking-[0.15em] text-muted-foreground">{c.label.toUpperCase()}</div>
                      <div className="mt-0.5 text-base font-medium text-foreground">{c.value}</div>
                    </div>
                  </div>
                )
                return c.href ? (
                  <a key={c.label} href={c.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
