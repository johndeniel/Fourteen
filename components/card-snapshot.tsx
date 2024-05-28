import { Button } from '@/components/ui/button'
import { CardTitle, CardHeader, CardContent, Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { CalendarDaysIcon, EyeIcon, FolderIcon, StarIcon } from '@/lib/icons'
import Link from 'next/link'
import Image from 'next/image'

export function CardSnapshot() {
  return (
    <Card className="w-full max-w-md rounded-lg">
      <div className="relative">
        <Image
          className="w-full rounded-t-lg object-cover"
          width={400}
          height={200}
          src="/placeholder.svg"
          alt="Picture of the project"
          style={{
            aspectRatio: '400/200',
            objectFit: 'cover',
          }}
        />
        <div className="absolute top-4 right-4">
          <Button className="toggle bg-white/80 hover:bg-white transition-colors" size="sm" variant="outline">
            <StarIcon className="h-4 w-4 mr-2 fill-primary" />
            Star
          </Button>
        </div>
      </div>
      <CardHeader className="px-6 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Acme Web App</CardTitle>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <StarIcon className="h-4 w-4 fill-primary" />
            <span className="font-medium">4.5</span>
            <Separator className="h-4" orientation="vertical" />
            <EyeIcon className="h-4 w-4" />
            <span className="font-medium">1.2K</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FolderIcon className="h-4 w-4" />
            <span className="font-medium">Web Development</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>Last updated 2 days ago</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
        Lorem ipsum is placeholder text commonly used in the ands graphic, print, 
        and publishing industries for previewing layou and visual mockups. 
        placeholder text commonly used in ths
        </p>
        <div className="flex items-center gap-4">
          <Avatar className="w-8 h-8 border">
            <AvatarImage alt="JavaScript" src="/placeholder-user.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border">
            <AvatarImage alt="React" src="/placeholder-user.jpg" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border">
            <AvatarImage alt="Tailwind CSS" src="/placeholder-user.jpg" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <Avatar className="w-8 h-8 border">
            <AvatarImage alt="Node.js" src="/placeholder-user.jpg" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-4">
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Live Demo
            </Link>
            <Link
              className="inline-flex h-10 items-center justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
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