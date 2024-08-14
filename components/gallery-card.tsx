import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import {
  CalendarDaysIcon,
  EyeIcon,
  FolderIcon,
  GitForkIcon,
  StarIcon,
} from '@/lib/icons'
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip'
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from '@/components/ui/hover-card'

interface TechInfo {
  icon: string
  tech: string
  info: string
  date: string
}

interface GalleryCardProps {
  gallery: GalleryTypedef
  index: number
}

export function GalleryCard({
  gallery,
  index,
}: GalleryCardProps): React.ReactElement {
  const getTechInfo = (index: number): TechInfo => {
    return {
      icon: gallery[`icon${index}` as keyof GalleryTypedef] as string,
      tech: gallery[`itech${index}` as keyof GalleryTypedef] as string,
      info: gallery[`info${index}` as keyof GalleryTypedef] as string,
      date: gallery[`idate${index}` as keyof GalleryTypedef] as string,
    }
  }

  const isFirstCard = index === 0

  return (
    <Card className="w-full max-w-sm">
      <div className="relative">
        <Image
          className="w-full rounded-t-lg object-cover"
          width={400}
          height={200}
          src={gallery.img}
          alt={`Project: ${gallery.title}`}
          priority={isFirstCard}
          loading={isFirstCard ? 'eager' : 'lazy'}
          decoding="async"
          quality={75}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder.svg"
        />
        <div className="absolute right-4 top-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={gallery.fork}
                  rel="noopener noreferrer"
                  aria-label={`Fork ${gallery.title}`}
                >
                  <Button
                    className="toggle bg-white"
                    size="sm"
                    variant="outline"
                  >
                    <GitForkIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Fork</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Fork this project on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <CardHeader className="px-6 pt-4">
        <div className="flex justify-between">
          <CardTitle className="text-2xl font-bold">{gallery.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <StarIcon className="h-4 w-4 fill-primary" aria-hidden="true" />
            <span className="font-medium">{gallery.star}</span>
            <Separator className="h-4" orientation="vertical" />
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
            <span className="font-medium">{gallery.view}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FolderIcon className="h-4 w-4" aria-hidden="true" />
          <span className="font-medium">{gallery.category}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {gallery.description}
        </p>

        <div className="group flex items-center gap-4">
          {[1, 2, 3, 4].map((techIndex) => {
            const techInfo = getTechInfo(techIndex)
            return (
              <HoverCard key={techIndex}>
                <HoverCardTrigger asChild>
                  <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                    <AvatarImage alt={techInfo.tech} src={techInfo.icon} />
                    <AvatarFallback>{techInfo.tech.charAt(0)}</AvatarFallback>
                  </Avatar>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
                  <div className="flex justify-between space-x-4 p-4">
                    <Avatar>
                      <AvatarImage src={techInfo.icon} alt={techInfo.tech} />
                      <AvatarFallback>{techInfo.tech.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{techInfo.tech}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {techInfo.info}
                      </p>
                      <div className="flex items-center pt-2">
                        <CalendarDaysIcon
                          className="mr-2 h-4 w-4 opacity-70"
                          aria-hidden="true"
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {techInfo.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            )
          })}
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-900/90"
              rel="noopener noreferrer"
              href={gallery.live}
              aria-label={`Live demo of ${gallery.title}`}
            >
              Live Demo
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
              rel="noopener noreferrer"
              href={`read/${gallery.title.toLowerCase()}`}
              aria-label={`Read more about ${gallery.title}`}
            >
              Full Read
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
