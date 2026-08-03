import Image from "next/image"
import { existsSync } from "fs"
import { join } from "path"

// Server component, so we can check at build time whether the photo file is
// actually present. Missing file → render the monogram instead of a broken
// <img>. Drop the JPGs into public/ and they appear on the next deploy.
const photoExists = (file: string) => existsSync(join(process.cwd(), "public", file))

/**
 * Leadership / LLP partners.
 *
 * Photos: drop square images at public/partner-kislay.jpg and
 * public/partner-muskan.jpg and they appear automatically. Until then each
 * card falls back to a monogram, so the section never looks broken.
 */
type Partner = {
  name: string
  role: string
  photo?: string
  initials: string
  bio: string
  credentials: string[]
  linkedin: string
}

const partners: Partner[] = [
  {
    name: "Kislay Pankaj",
    role: "Founding Partner",
    photo: "/partner-kislay.jpg",
    initials: "KP",
    bio: "An entrepreneur-engineer who has spent more than a decade bringing electric vehicles to life. A veteran of India's EV industry, he was a founding member at Ather Energy — now a listed company — served as CTO at Numeros Motors, and is today Co-Founder and CTO at Lectrix. He has taken some of India's best-known EVs, from the Ather 450X to the Lectrix NDuro, from idea to the road. His strength is carrying companies from ambiguity to clarity through the zero-to-one stage, a journey he has now completed three times over, and he advises early-stage startups along the way. His larger ambition is to reach nirvana through responsible innovation.",
    credentials: ["IIT Gandhinagar", "Co-Founder & CTO, Lectrix", "Founding member, Ather Energy"],
    linkedin: "https://www.linkedin.com/in/kislay-pankaj",
  },
  {
    name: "Munmun Muskan",
    role: "Founding Partner",
    photo: "/partner-muskan.jpg",
    initials: "MM",
    bio: "A delivery leader and AI generalist with more than five years of shipping software at pace. Trained in DevOps at IIIT Bangalore and certified as a SAFe® 6 Agilist and Scrum Master, she has led agile teams through complex delivery while staying close to the engineering underneath — from build and release pipelines to the applied AI now shaping our products. Her strength is turning ambiguous ideas into something people can actually use, and she leads how Anahat One's ventures are planned, built and released.",
    credentials: ["PG Diploma (DevOps), IIIT Bangalore", "AI Generalist", "SAFe® 6 Agilist", "Certified Scrum Master"],
    linkedin: "https://www.linkedin.com/in/muskanmunun",
  },
]

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0" />
    </svg>
  )
}

export function PartnersSection() {
  return (
    <section id="partners" className="scroll-mt-20 border-t border-border py-14 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-[0.25em] text-primary">LEADERSHIP</span>
          <h2 className="mt-4 text-balance font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl">
            The partners behind Anahat One.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed md:text-lg text-muted-foreground">
            Two builders — one from hardware, one from software — with a shared belief that the
            details are the product.
          </p>
        </div>

        <div className="mt-8 md:mt-14 grid gap-6 md:grid-cols-2">
          {partners.map((p) => (
            <article
              key={p.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-10"
            >
              <div className="flex items-center gap-5">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
                  {p.photo && photoExists(p.photo.replace(/^\//, "")) ? (
                    <Image src={p.photo} alt={p.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    <span className="font-serif text-2xl text-muted-foreground">{p.initials}</span>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="font-serif text-2xl font-medium text-foreground">{p.name}</h3>
                  <p className="text-sm font-medium tracking-wide text-primary">{p.role}</p>
                  <a
                    href={p.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.name} on LinkedIn`}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <LinkedInMark />
                    LinkedIn
                  </a>
                </div>
              </div>

              <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">{p.bio}</p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {p.credentials.map((c) => (
                  <li
                    key={c}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
