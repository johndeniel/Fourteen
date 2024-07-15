import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
  CalendarDaysIcon,
  EyeIcon,
  FolderIcon,
  GitForkIcon,
  StarIcon,
} from '@/lib/icons'
import Link from 'next/link'
import Image from 'next/image'
import {
  HoverCardTrigger,
  HoverCardContent,
  HoverCard,
} from '@/components/ui/hover-card'
import {
  TooltipTrigger,
  TooltipContent,
  Tooltip,
  TooltipProvider,
} from '@/components/ui/tooltip'

import { GalleryModel } from '@/lib/model/gallery-model'

interface GalleryModelProps {
  gallery: GalleryModel
}

export function GalleryCard({ gallery }: GalleryModelProps) {
  return (
    <Card className="w-full max-w-sm">
      <div className="relative">
        <Image
          className="w-full rounded-t-lg object-cover"
          width={400}
          height={200}
          src={gallery.getImg()}
          alt="Picture of the project"
          style={{
            aspectRatio: '400/200',
            objectFit: 'cover',
          }}
        />
        <div className="absolute right-4 top-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={gallery.getFork()} rel="noreferrer">
                  <Button
                    className="toggle bg-white"
                    size="sm"
                    variant="outline"
                  >
                    <GitForkIcon className="mr-2 h-4 w-4" />
                    Fork
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
          <CardTitle className="text-2xl font-bold">
            {gallery.getTitle()}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <StarIcon className="h-4 w-4 fill-primary" />
            <span className="font-medium">{gallery.getStar()}</span>
            <Separator className="h-4" orientation="vertical" />
            <EyeIcon className="h-4 w-4" />
            <span className="font-medium">{gallery.getView()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FolderIcon className="h-4 w-4" />
          <span className="font-medium">{gallery.getCategory()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {gallery.getDescription()}
        </p>

        <div className="group flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="JavaScript" src={gallery.getIcon1()} />
                <AvatarFallback>{gallery.getItech1().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={gallery.getIcon1()} />
                  <AvatarFallback>
                    {gallery.getItech1().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {gallery.getItech1()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {gallery.getInfo1()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {gallery.getIdate1()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="React" src={gallery.getIcon2()} />
                <AvatarFallback>{gallery.getItech2().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={gallery.getIcon2()} />
                  <AvatarFallback>
                    {gallery.getItech2().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {gallery.getItech2()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {gallery.getInfo2()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {gallery.getIdate2()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="Tailwind CSS" src={gallery.getIcon3()} />
                <AvatarFallback>{gallery.getItech3().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={gallery.getIcon3()} />
                  <AvatarFallback>
                    {gallery.getItech3().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {gallery.getItech3()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {gallery.getInfo3()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {gallery.getIdate3()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="Node.js" src={gallery.getIcon4()} />
                <AvatarFallback>{gallery.getItech4().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={gallery.getIcon4()} />
                  <AvatarFallback>
                    {gallery.getItech4().charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">
                    {gallery.getItech4()}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {gallery.getInfo4()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {gallery.getIdate4()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-gray-900/90"
              rel="noreferrer"
              href={gallery.getLive()}
            >
              Live Demo
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
              rel="noreferrer"
              href={`read/${gallery.getTitle().toLocaleLowerCase()}`}
            >
              Full Read
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
