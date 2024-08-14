import React from 'react'
import { ArticleModel } from '@/lib/model/article-model'
import Image from 'next/image'

interface ArticleSectionProps {
  section: ArticleModel
  index: number
}

/**
 * ArticleSection renders a section with a header, image, and paragraphs.
 * Supports different formats of paragraphs including arrays, objects, and strings.
 */
export function ArticleSection({
  section,
  index,
}: ArticleSectionProps): React.ReactElement {
  const renderParagraphs = () => {
    const paragraphs = section.getParagraphs()

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
    <section aria-labelledby={`section-header-${index}`}>
      <div className="p-6 sm:p-8">
        <h2
          id={`section-header-${index}`}
          className="mb-4 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl lg:text-4xl"
        >
          {section.getHeader()}
        </h2>
        <div className="mb-6 sm:mb-8">
          <Image
            src={section.getImage()}
            alt={`Illustration for ${section.getHeader()}`}
            width={1000}
            height={500}
            className="h-auto w-full rounded-lg object-cover shadow-sm"
            priority={index === 0} // Set priority for the first image
            loading={index === 0 ? 'eager' : 'lazy'} // Lazy load non-priority images
            quality={75}
          />
        </div>
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {renderParagraphs()}
        </div>
      </div>
    </section>
  )
}
