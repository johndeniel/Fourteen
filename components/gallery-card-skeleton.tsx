import React from 'react'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { CardHeader, CardContent, Card } from '@/components/ui/card'
import { EyeIcon, FolderIcon, GitForkIcon, StarIcon } from '@/lib/icons'
import Link from 'next/link'

const CARD_COUNT = 6
const AVATAR_COUNT = 4

/**
 * GalleryCardSkeletonComponent renders a grid of skeleton cards to be used
 * as placeholders while content is loading.
 */
export function GalleryCardSkeleton(): React.ReactElement {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: CARD_COUNT }, (_, index) => (
        <Card key={index} className="w-full max-w-sm">
          <div className="relative">
            <Skeleton className="aspect-[400/200] w-full rounded-t-lg object-cover" />
            <div className="absolute right-4 top-4">
              <Button
                className="bg-white/80 transition-colors hover:bg-white"
                size="sm"
                variant="outline"
              >
                <GitForkIcon className="mr-2 h-4 w-4" />
                Fork
              </Button>
            </div>
          </div>
          <CardHeader className="px-6 pt-4">
            <div className="flex justify-between">
              <Skeleton className="mb-2 h-6 w-40" />
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <StarIcon className="h-4 w-4 fill-primary" />
                <Skeleton className="h-4 w-8" />
                <Separator className="h-4" orientation="vertical" />
                <EyeIcon className="h-4 w-4" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FolderIcon className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 px-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-4">
              {Array.from({ length: AVATAR_COUNT }).map((_, avatarIndex) => (
                <Avatar key={avatarIndex} className="h-8 w-8 border">
                  <Skeleton className="h-full w-full rounded-full" />
                </Avatar>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4">
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-900/90"
                  href="#"
                >
                  Live Demo
                </Link>
                <Link
                  className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
                  href="#"
                >
                  Full Read
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
