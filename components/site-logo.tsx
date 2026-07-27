import React from "react"

interface SiteLogoProps {
  showText?: boolean
  className?: string
  iconSize?: number
  textColor?: string
}

export function SiteLogo({
  showText = true,
  className = "",
  iconSize = 54, // wider icon size for the horizontal waveform
  textColor = "text-foreground"
}: SiteLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Waveform Symbol (Concept D) */}
      <svg
        width={iconSize * 2.2} // aspect ratio width
        height={iconSize}
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Continuous Smooth Waveform Line */}
        <path
          d="M 15,20 H 58 C 64,20 66,6 72,6 C 78,6 78,34 83,34 C 88,34 89,13 94,13 C 99,13 101,20 107,20 H 145"
          stroke="currentColor"
          strokeWidth="4.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-foreground/90"
        />
      </svg>

      {/* Brand Text */}
      {showText && (
        <span className={`text-base font-bold tracking-[0.25em] ${textColor} uppercase transition-colors`}>
          ANAHAT <span className="text-muted-foreground/70 font-medium">ONE</span>
        </span>
      )}
    </div>
  )
}
