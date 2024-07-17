'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { GradientBackgroundEffect } from '@/components/gradient-background'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { FetchArticleData } from '@/server/queries/article-data-service'
import { ArticleModel } from '@/lib/model/article-model'
import { LoadingSpinner } from '@/components/loading-spinner'
import { SiteFooter } from '@/components/site-footer'
import { ArticleSectionSkeleton } from '@/components/article-section-skeleton'
import { ArticleSection } from '@/components/article-section'
import { ServerError } from '@/components/server-error'

// Define the AsyncDataResource interface
interface AsyncDataResource<T> {
  retrieve: () => T
}

/**
 * Creates a suspense resource that can be used with React Suspense.
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

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default function ArticlePage({
  params,
}: ArticlePageProps): React.ReactElement {
  const [articleResource, setArticleResource] = useState<AsyncDataResource<
    ArticleModel[] | null
  > | null>(null)

  useEffect(() => {
    setArticleResource(createSuspenseResource(FetchArticleData(params.id)))
  }, [params.id])

  if (!articleResource) {
    return <LoadingSpinner />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <GradientBackgroundEffect />
      <TracingBeam>
        <div className="mx-auto px-4 pt-8 sm:px-6 sm:pt-12">
          <Suspense fallback={<ArticleSectionSkeleton />}>
            <ArticleContent resource={articleResource} />
          </Suspense>
          <SiteFooter />
        </div>
      </TracingBeam>
    </main>
  )
}

interface ArticleContentProps {
  resource: AsyncDataResource<ArticleModel[] | null>
}

function ArticleContent({ resource }: ArticleContentProps): React.ReactElement {
  const sections = resource.retrieve()

  if (!sections || sections.length === 0) {
    return <ServerError />
  }

  return (
    <article>
      {sections.map((section, index) => (
        <ArticleSection
          key={`section-${index}`}
          section={section}
          index={index}
        />
      ))}
    </article>
  )
}
