import Link from 'next/link'
import { Shell } from '@/components/ui/shell'
import { GitHubIcon } from '@/lib/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

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
          
          <div className="flex items-center space-x-1">
            <Link
              href="https://github.com/johndeniel"
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                })
              )}
            >
              <GitHubIcon className="size-5" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </section>
      </Shell>
    </footer>
  )
}