"use client"

import dynamic from "next/dynamic"

const SilkBackground = dynamic(
  () => import("@/components/silk-background").then((m) => m.SilkBackground),
  { ssr: false }
)

export function SilkBackgroundClient() {
  return <SilkBackground />
}
