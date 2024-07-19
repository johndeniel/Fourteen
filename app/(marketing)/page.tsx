'use client'

import { Suspense, useEffect, useState } from 'react'
import { GradientBackgroundEffect } from '@/components/gradient-background'
import { HeroSection } from '@/components/hero-section'
import { GalleryModel } from '@/lib/model/gallery-model'
import { FetchGalleryData } from '@/server/queries/gallery-data-service'
import { FetchRepositoryData } from '@/server/queries/repository-data-service'
import { LoadingSpinner } from '@/components/loading-spinner'
import { GalleryCard } from '@/components/gallery-card'
import { GalleryCardSkeleton } from '@/components/gallery-card-skeleton'
import { GithubContribution } from '@/components/github-contribution'
import { GithubContributionSkeleton } from '@/components/github-contribution-skeleton'
import { RepositoryModel } from '@/lib/model/repository-model'
import { SiteFooter } from '@/components/site-footer'

interface AsyncDataResource<T> {
  retrieve: () => T
}

/**
 * Creates an async data resource that can be used with React Suspense.
 * @template T The type of data the resource will hold.
 * @param {Promise<T>} asyncOperation The async operation to wrap.
 * @returns {AsyncDataResource<T>} An object with a retrieve method.
 */
function createSuspenseResource<T>(
  asyncOperation: Promise<T>,
): AsyncDataResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T | undefined
  let error: Error | undefined

  const suspender = asyncOperation.then(
    (data) => {
      status = 'success'
      result = data
    },
    (e) => {
      status = 'error'
      error = e instanceof Error ? e : new Error(String(e))
    },
  )

  return {
    retrieve(): T {
      switch (status) {
        case 'pending':
          throw suspender
        case 'error':
          throw error
        case 'success':
          return result as T
        default:
          throw new Error('Unexpected resource state')
      }
    },
  }
}

type DataResources = {
  galleryData: AsyncDataResource<GalleryModel[]> | null
  repositoryData: AsyncDataResource<RepositoryModel[]> | null
}

export default function HomePage(): React.ReactElement {
  const [dataResources, setDataResources] = useState<DataResources>({
    galleryData: null,
    repositoryData: null,
  })

  useEffect(() => {
    setDataResources({
      galleryData: createSuspenseResource(FetchGalleryData()),
      repositoryData: createSuspenseResource(FetchRepositoryData()),
    })
  }, [])

  if (!dataResources.galleryData || !dataResources.repositoryData) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <GradientBackgroundEffect />
      <HeroSection />
      <ProjectGalleryHeader />
      <Suspense fallback={<GalleryCardSkeleton />}>
        <ProjectGalleryContent resource={dataResources.galleryData} />
      </Suspense>
      <section className="mt-10 p-4 sm:mt-12 md:mt-16 md:p-8 lg:mt-20 xl:mt-24">
        <GithubActivityHeader />
        <Suspense fallback={<GithubContributionSkeleton />}>
          <GithubActivityContent resource={dataResources.repositoryData} />
        </Suspense>
      </section>
      <SiteFooter />
    </main>
  )
}

function ProjectGalleryHeader(): React.ReactElement {
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

function GithubActivityHeader(): React.ReactElement {
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
  resource: AsyncDataResource<GalleryModel[]>
}

function ProjectGalleryContent({
  resource,
}: ProjectGalleryContentProps): React.ReactElement {
  const galleryItems = resource.retrieve()
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {galleryItems.map((item: GalleryModel) => (
        <GalleryCard key={item.id} gallery={item} />
      ))}
    </div>
  )
}

interface GithubActivityContentProps {
  resource: AsyncDataResource<RepositoryModel[]>
}

function GithubActivityContent({
  resource,
}: GithubActivityContentProps): React.ReactElement {
  const repositoryData = resource.retrieve()
  return <GithubContribution repository={repositoryData} />
}
