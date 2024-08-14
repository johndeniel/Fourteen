import { Suspense, lazy } from 'react'
import { GradientBackgroundEffect } from '@/components/gradient-background'
import { HeroSection } from '@/components/hero-section'
import { GalleryTypedef } from '@/lib/typedef/gallery-typedef'
import { FetchGalleryData } from '@/server/queries/gallery-data-service'
import { FetchRepositoryData } from '@/server/queries/repository-data-service'
import { SiteFooter } from '@/components/site-footer'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'

// Lazy imports with correct types
const GalleryCardSkeleton = lazy(() =>
  import('@/components/gallery-card-skeleton').then((module) => ({
    default: module.GalleryCardSkeleton,
  })),
)
const GithubContributionSkeleton = lazy(() =>
  import('@/components/github-contribution-skeleton').then((module) => ({
    default: module.GithubContributionSkeleton,
  })),
)
const GalleryCard = lazy(() =>
  import('@/components/gallery-card').then((module) => ({
    default: module.GalleryCard,
  })),
)
const GithubContribution = lazy(() =>
  import('@/components/github-contribution').then((module) => ({
    default: module.GithubContribution,
  })),
)

export default async function HomePage() {
  const galleryData: GalleryTypedef[] = await FetchGalleryData()
  const repositoryData = await FetchRepositoryData()

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <GradientBackgroundEffect />
      <HeroSection />
      <ProjectGalleryHeader />
      <Suspense fallback={<GalleryCardSkeleton />}>
        <ProjectGalleryContent galleryData={galleryData} />
      </Suspense>
      <section className="mt-10 p-4 sm:mt-12 md:mt-16 md:p-8 lg:mt-20 xl:mt-24">
        <GithubActivityHeader />
        <Suspense fallback={<GithubContributionSkeleton />}>
          <GithubActivityContent repositoryData={repositoryData} />
        </Suspense>
      </section>
      <SiteFooter />
    </main>
  )
}

function ProjectGalleryHeader() {
  return (
    <section className="mb-4 p-4 md:p-8">
      <h1 className="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
        Project Gallery - Cutting Edge Innovation
      </h1>
      <p className="relative z-10 text-muted-foreground">
        Implementing various technologies
      </p>
    </section>
  )
}

function GithubActivityHeader() {
  return (
    <section>
      <header className="mb-4 sm:mb-6 md:mb-8 lg:mb-10">
        <h1 className="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
          Latest Activity - Open Source Contribution
        </h1>
        <p className="relative z-10 text-muted-foreground">
          Stay informed about my progress
        </p>
      </header>
      <div className="mb-4 flex items-center">
        <h2 className="relative z-10 text-lg font-semibold sm:text-xl md:text-2xl">
          Recent GitHub Commits
        </h2>
      </div>
    </section>
  )
}

interface ProjectGalleryContentProps {
  galleryData: GalleryTypedef[]
}

function ProjectGalleryContent({ galleryData }: ProjectGalleryContentProps) {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {galleryData.map((item: GalleryTypedef, index: number) => (
        <GalleryCard key={item.id} gallery={item} index={index} />
      ))}
    </div>
  )
}

interface GithubActivityContentProps {
  repositoryData: RepositoryTypedef[]
}

function GithubActivityContent({ repositoryData }: GithubActivityContentProps) {
  return <GithubContribution repository={repositoryData} />
}
