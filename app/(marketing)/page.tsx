'use client'

import { Suspense, useEffect, useState } from 'react'
import { BackgroundGradientEffect } from '@/components/background-gradient'
import { HeroSection } from '@/components/hero-section'
import { GalleryModel } from '@/lib/model/gallery-model'
import { FetchGalleryData } from '@/server/queries/gallery-data-service'
import { FetchRepositoryData } from '@/server/queries/repository-data-service'
import { LoadingSpinner } from '@/components/loading-spinner'
import { GalleryCard } from '@/components/gallery-card'
import { GalleryCardSkeleton } from '@/components/gallery-card-skeleton'
import { GithubContribution } from '@/components/github-contribution'
import { GithubContributionSkeleton } from '@/components/github-contribution-skeleton'
import { RepositoryTypedef } from '@/lib/typedef/repository-typedef'
import { SiteFooter } from '@/components/site-footer'

interface AsyncDataResource<T> {
  retrieve: () => T
}

function createAsyncDataResource<T>(
  asyncOperation: Promise<T>,
): AsyncDataResource<T> {
  let currentStatus: 'pending' | 'success' | 'error' = 'pending'
  let resolvedData: T
  let encounteredError: unknown

  const promiseChain = asyncOperation.then(
    (data) => {
      currentStatus = 'success'
      resolvedData = data
    },
    (err) => {
      currentStatus = 'error'
      encounteredError = err
    },
  )

  return {
    retrieve() {
      switch (currentStatus) {
        case 'pending':
          throw promiseChain
        case 'error':
          throw encounteredError
        case 'success':
          return resolvedData
        default:
          throw new Error('Unexpected resource state encountered')
      }
    },
  }
}

export default function HomePage() {
  const [dataResources, setDataResources] = useState<{
    galleryData: AsyncDataResource<GalleryModel[]> | null
    repositoryData: AsyncDataResource<RepositoryTypedef[]> | null
  }>({ galleryData: null, repositoryData: null })

  useEffect(() => {
    setDataResources({
      galleryData: createAsyncDataResource(FetchGalleryData()),
      repositoryData: createAsyncDataResource(FetchRepositoryData()),
    })
  }, [])

  if (!dataResources.galleryData || !dataResources.repositoryData) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <BackgroundGradientEffect />
      <HeroSection />
      <div className="mb-4 p-4 md:p-8">
        <h1 className="relative z-10 mb-2 text-2xl font-bold sm:text-3xl md:text-4xl">
          Project Gallery - Cutting Edge Innovation
        </h1>
        <p className="relative z-10 text-muted-foreground">
          Implementing various technology
        </p>
      </div>
      <Suspense fallback={<GalleryCardSkeleton />}>
        <GalleryCardSection resource={dataResources.galleryData} />
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
        <Suspense fallback={<GithubContributionSkeleton />}>
          <GithubContributionSection resource={dataResources.repositoryData} />
        </Suspense>
      </div>
      <SiteFooter />
    </main>
  )
}

function GalleryCardSection({
  resource,
}: {
  resource: AsyncDataResource<GalleryModel[]>
}) {
  const galleryItems = resource.retrieve()
  return (
    <div className="relative z-10 grid grid-cols-1 justify-items-center gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
      {galleryItems.map((item: GalleryModel) => (
        <GalleryCard key={item.id} gallery={item} />
      ))}
    </div>
  )
}

function GithubContributionSection({
  resource,
}: {
  resource: AsyncDataResource<RepositoryTypedef[]>
}) {
  const repositoryData = resource.retrieve()
  return <GithubContribution repository={repositoryData} />
}
