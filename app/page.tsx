import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { SiteFooter } from '@/components/site-footer'

export default function Home() {
  return (
    <main className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <HeroSection />
      <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        <CardSnapshot />
        <CardSnapshot />
        <CardSnapshot />
        <CardSnapshot />
      </div>
      <SiteFooter />
    </main>
  )
}
