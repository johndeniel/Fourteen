import React from 'react'
import { ArticleModel } from '@/lib/model/article-model'
import Image from 'next/image'

interface ArticleSectionProps {
  section: ArticleModel
  index: number
}

export function ArticleSection({ section, index }: ArticleSectionProps) {
  const paragraphs = section.getParagraphs()

  const renderParagraphs = () => {
    if (Array.isArray(paragraphs)) {
      return paragraphs.map((paragraph, pIndex) => (
        <p key={`paragraph-${pIndex}`} className="mb-3 sm:mb-4">
          {paragraph}
        </p>
      ))
    }
    if (typeof paragraphs === 'object' && paragraphs !== null) {
      return Object.entries(paragraphs).map(([key, value]) => (
        <p key={key} className="mb-3 sm:mb-4">
          {String(value)}
        </p>
      ))
    }
    if (typeof paragraphs === 'string') {
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
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {renderParagraphs()}
        </div>
      </div>
    </article>
  )
}
