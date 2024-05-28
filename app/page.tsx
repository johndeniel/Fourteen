import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <main className="relative h-full w-full items-center  justify-center bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-2 xl:grid-cols-3">
        <CardSnapshot />
        <CardSnapshot />
        <CardSnapshot />
        <CardSnapshot />
      </div>
      <SiteFooter />
    </main>
  )
}
