'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { BackgroundGradientEffect } from '@/components/background-gradient'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { FetchArticleData } from '@/server/queries/article-data-service'
import { ArticleModel } from '@/lib/model/article-model'
import { LoadingSpinner } from '@/components/loading-spinner'
import { SiteFooter } from '@/components/site-footer'
import { ArticleSectionSkeleton } from '@/components/article-section-skeleton'
import { ArticleSection } from '@/components/article-section'

interface AsyncDataResource<T> {
  read: () => T
}

function createAsyncDataResource<T>(
  asyncOperation: Promise<T>,
): AsyncDataResource<T> {
  let status: 'pending' | 'success' | 'error' = 'pending'
  let result: T | undefined
  let error: unknown

  const suspender = asyncOperation.then(
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

interface ArticPageProps {
  params: {
    id: string
  }
}

export default function ArticPage({ params }: ArticPageProps): JSX.Element {
  const [sectionResource, setSectionResource] = useState<AsyncDataResource<
    ArticleModel[] | null
  > | null>(null)

  useEffect(() => {
    setSectionResource(createAsyncDataResource(FetchArticleData(params.id)))
  }, [params.id])

  if (!sectionResource) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <BackgroundGradientEffect />
      <TracingBeam>
        <div className="mx-auto px-4 pt-8 sm:px-6 sm:pt-12">
          <Suspense fallback={<ArticleSectionSkeleton />}>
            <ArticleSectionsRenderer resource={sectionResource} />
          </Suspense>
          <SiteFooter />
        </div>
      </TracingBeam>
    </main>
  )
}

interface ArticleSectionsRendererProps {
  resource: AsyncDataResource<ArticleModel[] | null>
}

function ArticleSectionsRenderer({
  resource,
}: ArticleSectionsRendererProps): JSX.Element {
  const sections = resource.read()

  if (!sections || sections.length === 0) {
    return <p className="text-center text-red-500">No content available</p>
  }

  return (
    <>
      {sections.map((section, index) => (
        <ArticleSection
          key={`section-${index}`}
          section={section}
          index={index}
        />
      ))}
    </>
  )
}
