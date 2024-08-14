import React from 'react'
import Link from 'next/link'
import { Shell } from '@/components/ui/shell'
import { GitHubIcon } from '@/lib/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * SiteFooterComponent renders the footer section of the site,
 * including links to social media and GitHub.
 */
export function SiteFooter(): React.ReactElement {
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
            aria-label="Follow jaydeeclouds on Instagram"
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
            aria-label="Visit John Deniel's GitHub profile"
          >
            <GitHubIcon className="size-5" />
          </Link>
        </div>
      </section>
    </Shell>
  )
}
