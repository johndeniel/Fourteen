import React from 'react'
import { GradientBackgroundEffect } from '@/components/gradient-background'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { FetchArticleData } from '@/server/queries/article-data-service'
import { SiteFooter } from '@/components/site-footer'
import { ArticleSection } from '@/components/article-section'
import { ServerError } from '@/components/server-error'

interface ArticlePageProps {
  params: {
    id: string
  }
}

export default async function ArticlePage({
  params,
}: ArticlePageProps): Promise<React.ReactElement> {
  const sections = await FetchArticleData(params.id)

  if (!sections || sections.length === 0) {
    return <ServerError />
  }

  return (
    <main className="relative h-full w-full items-center justify-center bg-white bg-dot-black/[0.2] sm:container dark:bg-black dark:bg-dot-white/[0.2]">
      <GradientBackgroundEffect />
      <TracingBeam>
        <div className="mx-auto px-4 pt-8 sm:px-6 sm:pt-12">
          <article>
            {sections.map((section, index) => (
              <ArticleSection
                key={`section-${index}`}
                section={section}
                index={index}
              />
            ))}
          </article>
          <SiteFooter />
        </div>
      </TracingBeam>
    </main>
  )
}
