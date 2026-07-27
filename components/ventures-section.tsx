"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const ventures = [
  {
    tag: "Hospitality",
    title: "Premium Stays & Airbnb",
    image: "/division-hospitality.png", // fallback
    description:
      "Thoughtfully designed short-term rentals where every detail is curated for comfort. We manage properties end-to-end, delivering five-star hospitality and memorable stays for every guest.",
    points: [
      "Private hot tub & relaxing bath",
      "Spacious garden terrace & rooftop sunset deck",
      "Climate-controlled comfort & pristine hygiene",
      "Fresh home-cooked meals on demand",
      "Personalized laundry & guest care on demand",
    ],
    link: {
      text: "View Airbnb Listing",
      href: "https://www.airbnb.co.uk/rooms/1259883871507298681?unique_share_id=087b05f8-8da6-4a0a-bb70-3a6b7fcf9387&viralityEntryPoint=1&s=76",
    },
  },
  {
    tag: "Software & Media",
    title: "AI Scripting, Teleprompter & Creator Studio",
    image: "/division-content.png",
    watermark: "nuove.in",
    description:
      "nuove.in is an AI-powered short-form video creation platform built for creators, founders, and brands. It simplifies the entire Reel & Short workflow — from discovering real-time local and global trending topics and generating viral AI scripts, to recording with an on-screen teleprompter and scoring hook strength.",
    points: [
      "AI Script Generator & Hook Engine for viral video concepts",
      "Built-in Teleprompter Recording Studio for seamless filming",
      "AI Coach & Hook Score Analyzer for pre-publishing feedback",
      "Real-Time Local & Global Trending Topics for instant content inspiration",
      "AI Captions & Multi-Format Content Repurposing",
    ],
    link: {
      text: "Explore nuove.in",
      href: "https://nuove.in",
    },
  },
]

const staysImages = [
  "/stays-1.png",
  "/stays-2.png",
  "/stays-6.png",
  "/stays-3.png",
  "/stays-4.png",
  "/stays-5.png",
  "/stays-1.jpg",
  "/stays-2.jpg",
  "/stays-3.jpg",
  "/stays-4.jpg",
  "/stays-5.jpg",
  "/stays-6.jpg",
  "/stays-7.jpg",
  "/stays-8.jpg",
]

const nuoveSlides = [
  {
    id: "generate",
    tab: "Script Generator",
    title: "AI Script & Hook Engine",
    badge: "GENERATE",
    content: {
      input: "Topic: 5 Mistakes First-Time Founders Make",
      hook: "Stop making this $10,000 mistake in your first month...",
      score: "96/100",
      body: "Most founders focus on product design before validating their audience. Here is the 3-step framework to test demand fast...",
      cta: "Save this reel for your next sprint! 🚀",
    },
  },
  {
    id: "record",
    tab: "Teleprompter",
    title: "Built-in Recording Studio",
    badge: "RECORD",
    content: {
      status: "REC 00:18",
      wpm: "145 WPM",
      teleprompterText: "3 things every successful short-form reel needs: A 2-second hook, high-pacing visual cuts, and a clear call-to-action...",
      controls: ["Pause", "Restart", "Save Video"],
    },
  },
  {
    id: "crosspost",
    tab: "Crosspost & Repurpose",
    title: "Multi-Platform Distribution",
    badge: "REPURPOSE",
    content: {
      platforms: [
        { name: "Instagram Reel", format: "9:16 Vertical Video", status: "Ready to Post" },
        { name: "YouTube Shorts", format: "Auto SEO Tags & Title", status: "Formatted" },
        { name: "LinkedIn Video", format: "Editorial Summary & Takeaways", status: "Generated" },
      ],
    },
  },
  {
    id: "captions",
    tab: "AI Captions",
    title: "Caption & Hashtag Engine",
    badge: "CAPTIONS",
    content: {
      caption: "The exact framework we used to reach 100k creators in 30 days 👇",
      hashtags: "#CreatorEconomy #Shorts #ReelsStrategy #NuoveAI #Founders",
    },
  },
  {
    id: "profile",
    tab: "Profile & Analytics",
    title: "Creator Score & Streak Tracker",
    badge: "INSIGHTS",
    content: {
      streak: "15 Days 🔥",
      totalScripts: "42 Scripts",
      hookAvg: "94/100",
      badgeEarned: "Viral Hook Master 🏆",
    },
  },
]

function StaysSlideshow() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % staysImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return <div className="h-full min-h-[350px] w-full bg-muted" />
  }

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((prev) => (prev - 1 + staysImages.length) % staysImages.length)
  }

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIndex((prev) => (prev + 1) % staysImages.length)
  }

  return (
    <div className="relative group/slideshow h-full min-h-[350px] w-full overflow-hidden bg-muted">
      {/* Slides */}
      {staysImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Listing room photo ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${
            i === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
          style={{ transitionProperty: "opacity, transform" }}
        />
      ))}
      <div className="absolute inset-0 z-15 bg-gradient-to-t from-card/85 via-transparent to-transparent pointer-events-none" />

      {/* Prev / Next Nav Buttons */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover/slideshow:opacity-100 hover:bg-black/60 active:scale-95 cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur-sm opacity-0 transition-opacity group-hover/slideshow:opacity-100 hover:bg-black/60 active:scale-95 cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {staysImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIndex(i)
            }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? "bg-white w-4" : "bg-white/40 w-1.5"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

const nuoveImages = [
  { src: "/nuove-app-0.png", title: "Dashboard", label: "DASHBOARD" },
  { src: "/nuove-app-1.png", title: "Script Generator", label: "SCRIPT GENERATOR" },
  { src: "/nuove-app-2.png", title: "Teleprompter & Recorder", label: "TELEPROMPTER" },
  { src: "/nuove-app-3.png", title: "Creator Advisor AI", label: "CREATOR ADVISOR" },
  { src: "/nuove-app-4.png", title: "Caption Generator", label: "CAPTION GENERATOR" },
  { src: "/nuove-app-5.png", title: "Crosspost Your Reel", label: "CROSSPOST REEL" },
]

function NuoveSlideshow() {
  const [index, setIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % nuoveImages.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return <div className="h-full min-h-[380px] w-full bg-[#0D0A14]" />
  }

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIndex((prev) => (prev - 1 + nuoveImages.length) % nuoveImages.length)
  }

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    setIndex((prev) => (prev + 1) % nuoveImages.length)
  }

  return (
    <div className="relative w-full h-full bg-[#0D0A14] flex items-center justify-center overflow-hidden" style={{minHeight: 320}}>

      {/* Slide images — centered, full visible, no crop */}
      <div className="relative w-full h-full flex items-center justify-center cursor-pointer" onClick={() => nextSlide()}>
        {nuoveImages.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.title}
            className={`absolute inset-0 w-full h-full object-contain object-center transition-all duration-700 ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); prevSlide(e) }}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm shadow-lg transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); nextSlide(e) }}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur-sm shadow-lg transition-all hover:bg-black/80 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2 flex items-center gap-1.5">
        {nuoveImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i) }}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              i === index ? "bg-white w-5" : "bg-white/35 w-1.5 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

function PlayMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-full w-full"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

export function VenturesSection() {
  return (
    <section id="ventures" className="scroll-mt-20 border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-xs font-medium tracking-[0.25em] text-primary">OUR VENTURES</span>
          <h2 className="mt-4 text-balance font-serif text-4xl font-medium leading-tight text-foreground md:text-5xl">
            A growing family of ventures, one shared heart.
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Each venture is a world of its own, yet all are built on the same foundation of quality and care.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {/* Active Live Ventures */}
          {ventures.map((v, i) => (
            <article
              key={v.title}
              className="group relative grid overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-2"
            >


              {/* Left Column: Image or Slideshow */}
              <div className={`relative overflow-hidden ${v.watermark === "nuove.in" ? "min-h-[340px] flex items-center justify-center" : "min-h-64"} ${i % 2 === 1 ? "md:order-2" : ""}`}>
                {v.tag === "Hospitality" ? (
                  <StaysSlideshow />
                ) : v.watermark === "nuove.in" ? (
                  <NuoveSlideshow />
                ) : (
                  <>
                    <img
                      src={v.image || "/placeholder.svg"}
                      alt={v.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                  </>
                )}
              </div>

              {/* Right Column: Copy Details */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary">
                  {v.tag.toUpperCase()}
                </span>
                <h3 className="mt-4 font-serif text-3xl font-medium text-foreground">{v.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{v.description}</p>
                <ul className="mt-6 flex flex-col gap-2">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
                {v.link ? (
                  <div className="mt-8">
                    <a
                      href={v.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2.5 text-xs font-semibold tracking-wider text-primary transition-all hover:bg-primary/20 hover:border-primary/50"
                    >
                      <span>{v.link.text.toUpperCase()}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            </article>
          ))}

          {/* Upcoming Venture 1: Hardware (Coming Soon) */}
          <article className="relative grid overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-card md:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden">
              <img
                src="/division-hardware.png"
                alt="Upcoming Hardware Solutions"
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-card/30" />
            </div>

            {/* Text column — blurred with lock overlay */}
            <div className="relative flex flex-col justify-center p-8 md:p-12 overflow-hidden">
              {/* Blurred background content */}
              <div className="select-none blur-sm pointer-events-none" aria-hidden="true">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  COMING SOON
                </span>
                <h3 className="mt-4 font-serif text-3xl font-medium text-foreground">Precision Hardware</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  We are engineering custom hardware that connects physical spaces with modern code. Blending robust engineering with elegant industrial design.
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {["Product engineering & design", "IoT & smart-device integrations", "Under active development"].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lock overlay — centered on top */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-[2px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-lg shadow-primary/10">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold tracking-widest text-foreground/70 uppercase">Under Wraps</p>
                <p className="text-xs text-muted-foreground">Something big is coming</p>
              </div>
            </div>
          </article>

          {/* Upcoming Venture 2: Trading App (Coming Soon) */}
          <article className="relative grid overflow-hidden rounded-2xl border border-dashed border-primary/30 bg-card md:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden md:order-2">
              <img
                src="/division-trading.png"
                alt="Upcoming trading app"
                className="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-card/30" />
            </div>

            {/* Text column — blurred with lock overlay */}
            <div className="relative flex flex-col justify-center p-8 md:p-12 overflow-hidden">
              {/* Blurred background content */}
              <div className="select-none blur-sm pointer-events-none" aria-hidden="true">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  COMING SOON
                </span>
                <h3 className="mt-4 font-serif text-3xl font-medium text-foreground">A Trading App, Made Human</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
                  We&apos;re building a trading experience that feels calm, clear, and approachable — putting confident decisions within reach for everyone.
                </p>
                <ul className="mt-6 flex flex-col gap-2">
                  {["Intuitive, jargon-free interface", "Insights you can actually trust", "Built for first-time and seasoned traders"].map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lock overlay — centered on top */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-card/60 backdrop-blur-[2px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 shadow-lg shadow-primary/10">
                  <svg className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="text-sm font-semibold tracking-widest text-foreground/70 uppercase">Under Wraps</p>
                <p className="text-xs text-muted-foreground">Something big is coming</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
