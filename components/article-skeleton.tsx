import { Skeleton } from '@/components/ui/skeleton'

const PARAGRAPH_COUNT = 2
const SECTION_COUNT = 2

export function ArticleSkeleton(): JSX.Element {
  const renderParagraphs = () => {
    return Array.from({ length: PARAGRAPH_COUNT }, (_, index) => (
      <div key={`paragraph-${index}`} className="mb-3 sm:mb-4">
        <Skeleton className="h-4 w-full" />
      </div>
    ))
  }

  const renderSection = () => (
    <article>
      <div className="p-6 sm:p-8">
        <Skeleton className="mb-4 h-8 w-3/4" />
        <div className="mb-6 sm:mb-8">
          <Skeleton className="h-[500px] w-full rounded-lg" />
        </div>
        <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
          {renderParagraphs()}
        </div>
      </div>
    </article>
  )

  return (
    <>
      {Array.from({ length: SECTION_COUNT }, (_, index) => (
        <div key={`section-${index}`}>{renderSection()}</div>
      ))}
    </>
  )
}
