import { SiteLogo } from "@/components/site-logo"

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <a href="#top" className="flex items-center">
          <SiteLogo iconSize={34} />
        </a>

        <p className="text-sm text-muted-foreground" suppressHydrationWarning>
          &copy; {new Date().getFullYear()} Anahat One. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
