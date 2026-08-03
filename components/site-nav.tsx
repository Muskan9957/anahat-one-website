"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SiteLogo } from "@/components/site-logo"

const links = [
  { label: "About", href: "#about" },
  { label: "Ventures", href: "#ventures" },
  { label: "Why Us", href: "#why" },
  { label: "Leadership", href: "#partners" },
  { label: "Contact", href: "#contact" },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setOpen(false)

    // Scroll so the section's CONTENT sits just under the header.
    //
    // Scrolling to the <section> itself stopped at the section box — and every
    // section then has its own large top padding, so you landed on ~200px of
    // empty space with the real content pushed off the bottom of the screen.
    // Targeting the inner container instead skips that padding.
    //
    // The two rAFs let the mobile menu finish closing first, so the header
    // height we measure is the collapsed one.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (href === "#top") {
          window.scrollTo({ top: 0, behavior: "smooth" })
          return
        }
        const section = document.querySelector(href)
        if (!section) return

        const content = section.firstElementChild ?? section        // inner max-w container
        const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 64
        const y = content.getBoundingClientRect().top + window.scrollY - headerH - 16

        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" })
      })
    })
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-white/8 shadow-sm" : "border-b border-transparent"
      }`}
      style={scrolled ? { background: "rgba(8,7,18,0.80)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" } : {}}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, "#top")}
          className="flex items-center"
        >
          <SiteLogo iconSize={34} />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            size="sm"
            nativeButton={false}
            render={
              <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                Get in touch
              </a>
            }
          />
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 bg-foreground transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <Button
                size="sm"
                className="w-full"
                nativeButton={false}
                render={
                  <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                    Get in touch
                  </a>
                }
              />
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
