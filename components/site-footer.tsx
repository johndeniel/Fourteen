import Link from 'next/link'
import { Shell } from '@/components/ui/shell'
import { GitHubIcon } from '@/lib/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function SiteFooter() {
  return (
    <Shell className="w-full">
      <section className="z-10 flex items-center">
        <div className="flex-1">
          Follow{' '}
          <Link
            href="https://www.instagram.com/jaydeeclouds"
            target="_blank"
            rel="noreferrer"
            className="font-semibold"
          >
            jaydeeclouds
          </Link>
        </div>
        <div>
          <Link
            href="https://github.com/johndeniel"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                size: 'icon',
                variant: 'ghost',
              }),
            )}
          >
            <GitHubIcon className="size-5" />
          </Link>
        </div>
      </section>
    </Shell>
  )
}
