'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { BackgroundGradientEffect } from '@/components/background-gradient-effect'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { FetchArticleData } from '@/server/queries/article-data-service'
import { ArticleModel } from '@/lib/model/article-model'
import { LoadingSpinner } from '@/components/loading-spinner'
import { SiteFooter } from '@/components/site-footer'

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

interface HomePageProps {
  params: {
    id: string
  }
}

export default function HomePage({ params }: HomePageProps): JSX.Element {
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
    <main className="relative min-h-screen w-full bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
      <BackgroundGradientEffect />
      <TracingBeam>
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <Suspense fallback={<LoadingSpinner />}>
            <SectionContent resource={sectionResource} />
          </Suspense>
        </div>
        <SiteFooter />
      </TracingBeam>
    </main>
  )
}

interface SectionContentProps {
  resource: AsyncDataResource<ArticleModel[] | null>
}

function SectionContent({ resource }: SectionContentProps): JSX.Element {
  const sections = resource.read()

  if (!sections || sections.length === 0) {
    return <p className="text-center text-red-500">No content available</p>
  }

  return (
    <>
      {sections.map((section, index) => (
        <Suspense key={`section-${index}`} fallback={<LoadingSpinner />}>
          <Section section={section} index={index} />
        </Suspense>
      ))}
    </>
  )
}

interface SectionProps {
  section: ArticleModel
  index: number
}

function Section({ section, index }: SectionProps): JSX.Element {
  const paragraphs = section.getParagraphs()

  const renderParagraphs = () => {
    if (Array.isArray(paragraphs)) {
      return paragraphs.map((paragraph, pIndex) => (
        <p key={`paragraph-${pIndex}`} className="mb-3 sm:mb-4">
          {typeof paragraph === 'string' ? paragraph : ''}
        </p>
      ))
    } else if (typeof paragraphs === 'object' && paragraphs !== null) {
      return Object.values(paragraphs).map((paragraph, pIndex) => (
        <p key={`paragraph-${pIndex}`} className="mb-3 sm:mb-4">
          {typeof paragraph === 'string' ? paragraph : ''}
        </p>
      ))
    } else if (typeof paragraphs === 'string') {
      return <p className="mb-3 sm:mb-4">{paragraphs}</p>
    }
    return null
  }

  return (
    <article>
      <div className="p-6 sm:p-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl">
          {section.getHeader()}
        </h2>
        {section.getImage() && (
          <div className="mb-6 sm:mb-8">
            <Image
              src={section.getImage()}
              alt={`Illustration for ${section.getHeader()}`}
              width={1000}
              height={500}
              className="h-auto w-full rounded-lg object-cover shadow-sm"
              priority={index === 0}
            />
          </div>
        )}
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {renderParagraphs()}
        </div>
      </div>
    </article>
  )
}
