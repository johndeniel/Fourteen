'use client'

import { Suspense, useEffect, useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { CardSnapshotSkeleton } from '@/components/card-snapshot-skeleton'
import { SiteFooter } from '@/components/site-footer'
import { fetchCoverData } from '@/server/queries/cover-data-service'
import { Cover } from '@/lib/model/cover'
import { GithubProject } from '@/components/github-project'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import { fetchRepositoryData } from '@/server/queries/repository-data-service'
import { GithubProjectSkeleton } from '@/components/github-project-skeleton'

/**
 * Represents a resource that can be read, potentially throwing a promise or error.
 */
interface AsyncResource<T> {
  read: () => T
}

/**
 * Creates an async resource wrapper for data fetching.
 * @param asyncOperation - The async operation to wrap.
 * @returns An AsyncResource object with a read method.
 */
function createAsyncResource<T>(asyncOperation: Promise<T>): AsyncResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T
  let error: unknown

  const promise = asyncOperation.then(
    (data) => {
      status = 'success'
      result = data
    },
    (err) => {
      status = 'error'
      error = err
    },
  )

  return {
    read() {
      switch (status) {
        case 'pending':
          throw promise
        case 'error':
          throw error
        case 'success':
          return result
        default:
          throw new Error('Unexpected resource state')
      }
    },
  }
}

/**
 * Home component representing the main page of the application.
 */
export default function HomePage() {
  const [resources, setResources] = useState<{
    covers: AsyncResource<Cover[]> | null
    projects: AsyncResource<RepositoryTypedef[]> | null
  }>({ covers: null, projects: null })

  useEffect(() => {
    setResources({
      covers: createAsyncResource(fetchCoverData()),
      projects: createAsyncResource(fetchRepositoryData()),
    })
  }, [])

  if (!resources.covers || !resources.projects) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <BackgroundGradient />
      <HeroSection />
      <div className="mb-4 p-4 md:p-8">
        <h1 className="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
          Project Gallery - Cutting Edge Innovation
        </h1>
        <p className="relative z-10 text-muted-foreground">
          Implementing various technology
        </p>
      </div>
      <Suspense fallback={<CoverListSkeleton count={6} />}>
        <CoverSection resource={resources.covers} />
      </Suspense>
      <div className="mt-10 p-4 sm:mt-12 md:mt-16 md:p-8 lg:mt-20 xl:mt-24">
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
        <Suspense fallback={<GithubProjectSkeleton />}>
          <ProjectSection resource={resources.projects} />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}

/**
 * Renders a gradient background effect.
 */
function BackgroundGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
  )
}

/**
 * Displays a loading spinner while content is being fetched.
 */
function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading
        </p>
      </div>
    </div>
  )
}

/**
 * Renders the cover section of the page.
 */
function CoverSection({ resource }: { resource: AsyncResource<Cover[]> }) {
  const covers = resource.read()
  return <CoverList covers={covers} />
}

/**
 * Renders a list of cover items.
 */
function CoverList({ covers }: { covers: Cover[] }) {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {covers.map((cover: Cover) => (
        <CardSnapshot key={cover.id} cover={cover} />
      ))}
    </div>
  )
}

/**
 * Renders a skeleton loader for the cover list while it's being fetched.
 */
function CoverListSkeleton({ count }: { count: number }) {
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <CardSnapshotSkeleton key={index} />
      ))}
    </div>
  )
}

/**
 * Renders the projects section of the page.
 */
function ProjectSection({
  resource,
}: {
  resource: AsyncResource<RepositoryTypedef[]>
}) {
  const projects = resource.read()
  return <GithubProject projects={projects} />
}
