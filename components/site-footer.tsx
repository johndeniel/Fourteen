import Link from 'next/link'
import { Shell } from '@/components/ui/shell'

export function SiteFooter() {
  return (
    <footer className="w-full">
      <Shell>
        <section className="z-10 flex items-center space-x-4">
          <div className="flex-1 text-left text-lg leading-loose">
            Follow{' '}
            <Link
              href="https://www.instagram.com/jaydeeclouds"
              target="_blank"
              rel="noreferrer"
              className="font-semibold transition-colors hover:text-foreground"
            >
              jaydeeclouds
            </Link>
          </div>
        </section>
      </Shell>
    </footer>
  )
}