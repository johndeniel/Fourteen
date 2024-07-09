'use client'

import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { CardSnapshotSkeleton } from '@/components/card-snapshot-skeleton'
import { SiteFooter } from '@/components/site-footer'
import { Suspense } from 'react'
import { GetCoverData } from '@/server/queries/get-cover-data'
import { Cover } from '@/lib/model/cover'
import { GithubContribution } from '@/components/github-contribution'
import { GithubProject } from '@/components/github-project'
import { ContributionTypedef } from '@/lib/typedef/contribution-typedef'
import { ProjectTypedef } from '@/lib/typedef/project-typedef'

const project: ProjectTypedef[] = [
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
  {
    name: 'shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps.',
    commits: ['feat: add new components', 'fix: address accessibility issues'],
    avatarUrl:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    avatarFallback: 'JD',
    updatedAt: '1 week ago',
  },
]

const contributionsData: ContributionTypedef[] = [
  {
    repository: 'shadcn/ui',
    commitMessage: 'add new components',
    commitHash: 'a1b2c3d4',
    authorName: 'John Doe',
    authorAvatar:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    authorInitials: 'JD',
    date: '1 week ago',
  },
  {
    repository: 'vercel/next.js',
    commitMessage: 'add new features',
    commitHash: 'e5f6g7h8',
    authorName: 'Jane Smith',
    authorAvatar:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    authorInitials: 'JS',
    date: '2 weeks ago',
  },
  {
    repository: 'tailwindlabs/tailwindcss',
    commitMessage: 'add new utilities',
    commitHash: 'i9j0k1l2',
    authorName: 'Bob Johnson',
    authorAvatar:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    authorInitials: 'BJ',
    date: '3 weeks ago',
  },
  {
    repository: 'prisma/prisma',
    commitMessage: 'add new features',
    commitHash: 'm3n4o5p6',
    authorName: 'Sarah Lee',
    authorAvatar:
      'https://imgs.search.brave.com/YfyNSZIduSszrOd2DIfVpcEZXVPxARydF3-FOuI_1pA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dzNzY2hvb2xzLmNv/bS9ob3d0by9pbWdf/YXZhdGFyLnBuZw',
    authorInitials: 'SL',
    date: '1 month ago',
  },
]

export default function Home() {
  const covers: Cover[] = GetCoverData()

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <Suspense fallback={<CoverListSkeleton count={covers.length} />}>
        <CoverList covers={covers} />
      </Suspense>
      <div className="sm:mt-28">
        <GithubProject projects={project} />
      </div>
      <GithubContribution contributions={contributionsData} />
      <SiteFooter />
    </main>
  )
}

function CoverList({ covers }: { covers: Cover[] }) {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {covers.map((cover: Cover) => (
        <CardSnapshot key={cover.id} cover={cover} />
      ))}
    </div>
  )
}

function CoverListSkeleton({ count }: { count: number }) {
  const skeletons = Array.from({ length: count }).map((_, index) => (
    <CardSnapshotSkeleton key={index} />
  ))

  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {skeletons}
    </div>
  )
}
