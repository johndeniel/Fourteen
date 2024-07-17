import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const SECTION_COUNT = 2
const PARAGRAPH_COUNT = 2

/**
 * ArticleSectionSkeleton renders a skeleton placeholder
 * for the article section while the content is being loaded.
 * It provides visual feedback to the user by displaying skeleton
 * elements that simulate the structure of the actual content.
 */
export function ArticleSectionSkeleton(): React.ReactElement {
  return (
    <React.Fragment>
      {Array.from({ length: SECTION_COUNT }, (_, sectionIndex) => (
        <div key={`section-${sectionIndex}`}>
          <article>
            <div className="p-6 sm:p-8">
              <Skeleton className="mb-4 h-8 w-3/4" />
              <div className="mb-6 sm:mb-8">
                <Skeleton className="h-[500px] w-full rounded-lg" />
              </div>
              <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                {Array.from(
                  { length: PARAGRAPH_COUNT },
                  (_, paragraphIndex) => (
                    <div
                      key={`paragraph-${paragraphIndex}`}
                      className="mb-3 sm:mb-4"
                    >
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ),
                )}
              </div>
            </div>
          </article>
        </div>
      ))}
    </React.Fragment>
  )
}
