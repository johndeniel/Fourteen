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

import { Cover } from '@/lib/model/cover'

interface CardSnapshotProps {
  cover: Cover
}

export function CardSnapshot({ cover }: CardSnapshotProps) {
  return (
    <Card className="w-full max-w-sm">
      <div className="relative">
        <Image
          className="w-full rounded-t-lg object-cover"
          width={400}
          height={200}
          src={cover.getImg()}
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
                <Link href={cover.getFork()} rel="noreferrer">
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
            {cover.getTitle()}
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <StarIcon className="h-4 w-4 fill-primary" />
            <span className="font-medium">{cover.getStar()}</span>
            <Separator className="h-4" orientation="vertical" />
            <EyeIcon className="h-4 w-4" />
            <span className="font-medium">{cover.getView()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <FolderIcon className="h-4 w-4" />
          <span className="font-medium">{cover.getCategory()}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {cover.getDescription()}
        </p>

        <div className="group flex items-center gap-4">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="JavaScript" src={cover.getIcon1()} />
                <AvatarFallback>{cover.getItech1().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={cover.getIcon1()} />
                  <AvatarFallback>{cover.getItech1().charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{cover.getItech1()}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cover.getInfo1()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cover.getIdate1()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="React" src={cover.getIcon2()} />
                <AvatarFallback>{cover.getItech2().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={cover.getIcon2()} />
                  <AvatarFallback>{cover.getItech2().charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{cover.getItech2()}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cover.getInfo2()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cover.getIdate2()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="Tailwind CSS" src={cover.getIcon3()} />
                <AvatarFallback>{cover.getItech3().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={cover.getIcon3()} />
                  <AvatarFallback>{cover.getItech3().charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{cover.getItech3()}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cover.getInfo3()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cover.getIdate3()}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Avatar className="h-8 w-8 border transition-transform group-hover:scale-110">
                <AvatarImage alt="Node.js" src={cover.getIcon4()} />
                <AvatarFallback>{cover.getItech4().charAt(0)}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 rounded-lg bg-white shadow-lg dark:bg-gray-950">
              <div className="flex justify-between space-x-4 p-4">
                <Avatar>
                  <AvatarImage src={cover.getIcon4()} />
                  <AvatarFallback>{cover.getItech4().charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{cover.getItech4()}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {cover.getInfo4()}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-70" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {cover.getIdate4()}
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
              href={cover.getLive()}
            >
              Live Demo
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100"
              rel="noreferrer"
              href="#"
            >
              Full Read
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
