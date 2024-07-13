'use client'

import { Suspense, useEffect, useState } from 'react'
import { HeroSection } from '@/components/hero-section'
import { CardSnapshot } from '@/components/card-snapshot'
import { CardSnapshotSkeleton } from '@/components/card-snapshot-skeleton'
import { SiteFooter } from '@/components/site-footer'
import { GetCoverData } from '@/server/queries/get-cover-data'
import { Cover } from '@/lib/model/cover'
import { GithubProject } from '@/components/github-project'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import { GetRepositoryData } from '@/server/queries/get-repository-data'
import { GithubProjectSkeleton } from '@/components/github-project-skeleton'

// Create a wrapper for async data fetching
function createResource<T>(promise: Promise<T>): { read: () => T } {
  let status = 'pending'
  let result: T
  let error: any

  const suspender = promise.then(
    (data) => {
      status = 'success'
      result = data
    },
    (e) => {
      status = 'error'
      error = e
    },
  )

  return {
    read() {
      if (status === 'pending') {
        throw suspender
      } else if (status === 'error') {
        throw error
      } else if (status === 'success') {
        return result
      }
      throw new Error('This should be impossible')
    },
  }
}

export default function Home() {
  const [coversResource, setCoversResource] = useState<{
    read: () => Cover[]
  } | null>(null)
  const [projectsResource, setProjectsResource] = useState<{
    read: () => RepositoryTypedef[]
  } | null>(null)

  useEffect(() => {
    setCoversResource(createResource(GetCoverData()))
    setProjectsResource(createResource(GetRepositoryData()))
  }, [])

  if (!coversResource || !projectsResource) {
    return null // or a loading indicator
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
      <HeroSection />
      <Suspense fallback={<CoverListSkeleton count={6} />}>
        <Covers resource={coversResource} />
      </Suspense>
      <div className="mt-10 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-24">
        <Suspense fallback={<GithubProjectSkeleton />}>
          <Projects resource={projectsResource} />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}

function Covers({ resource }: { resource: { read: () => Cover[] } }) {
  const covers = resource.read()
  return <CoverList covers={covers} />
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

function Projects({
  resource,
}: {
  resource: { read: () => RepositoryTypedef[] }
}) {
  const projects = resource.read()
  return <GithubProject projects={projects} />
}
