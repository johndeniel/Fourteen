'use client'

import React, { useState, useEffect, Suspense } from 'react'
import Image from 'next/image'
import { BackgroundGradientEffect } from '@/components/background-gradient-effect'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { FetchSectionData } from '@/server/queries/article-data-service'
import { ArticleModel } from '@/lib/model/article-model'
import { LoadingSpinner } from '@/components/loading-spinner'

const SECTION_ID = 'fourteen'

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
  const [sectionResource, setSectionResource] = useState<AsyncDataResource<
    ArticleModel[] | null
  > | null>(null)

  useEffect(() => {
    setSectionResource(createAsyncDataResource(FetchSectionData(SECTION_ID)))
  }, [])

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
      </TracingBeam>
    </main>
  )
}

function SectionContent({
  resource,
}: {
  resource: AsyncDataResource<ArticleModel[] | null>
}) {
  const sections = resource.retrieve()

  if (!sections || sections.length === 0) {
    return <p className="text-center text-red-500">No sections found</p>
  }

  return (
    <>
      {sections.map((section, index) => (
        <Suspense key={index} fallback={<LoadingSpinner />}>
          <Section section={section} index={index} />
        </Suspense>
      ))}
    </>
  )
}

function Section({ section, index }: { section: ArticleModel; index: number }) {
  return (
    <article className="mb-8 sm:mb-12 lg:mb-16">
      <h2 className="mb-4 text-xl font-semibold sm:mb-6 sm:text-2xl lg:text-3xl">
        {section.getHeader()}
      </h2>
      <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
        {section.getImage() && (
          <div className="mb-4 sm:mb-6">
            <Image
              src={section.getImage()}
              alt={`Illustration for ${section.getHeader()}`}
              width={1000}
              height={500}
              className="h-auto w-full rounded-lg object-cover"
              priority={index === 0}
            />
          </div>
        )}
        <p className="mb-3 sm:mb-4">{section.getParagraph1()}</p>
        <p className="mb-3 sm:mb-4">{section.getParagraph2()}</p>
        <p>{section.getParagraph3()}</p>
      </div>
    </article>
  )
}
