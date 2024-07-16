import { ArticleModel } from '@/lib/model/article-model'
import Image from 'next/image'

interface ArticleSectionProps {
  resource: {
    read: () => ArticleModel[] | null
  }
}

export function ArticleSection({ resource }: ArticleSectionProps): JSX.Element {
  const sections = resource.read()

  if (!sections || sections.length === 0) {
    return <p className="text-center text-red-500">No content available</p>
  }

  return (
    <>
      {sections.map((section, index) => (
        <Section key={`section-${index}`} section={section} index={index} />
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

  const renderParagraphs = (): JSX.Element | JSX.Element[] | null => {
    if (Array.isArray(paragraphs)) {
      return paragraphs.map((paragraph, pIndex) => (
        <p key={`paragraph-${pIndex}`} className="mb-3 sm:mb-4">
          {paragraph}
        </p>
      ))
    }
    if (typeof paragraphs === 'object' && paragraphs !== null) {
      return Object.values(paragraphs).map((paragraph, pIndex) => (
        <p key={`paragraph-${pIndex}`} className="mb-3 sm:mb-4">
          {String(paragraph)}
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
        {section.getImage() && (
          <div className="mb-6 sm:mb-8">
            <Image
              src={section.getImage() as string}
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
