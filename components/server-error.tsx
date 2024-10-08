import React from 'react'
import Link from 'next/link'

/**
 * ServerError displays a server error message with an option to navigate back to the home page.
 * It provides clear feedback to users when no content is available due to a server error.
 */
export function ServerError(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <p className="text-lg font-semibold text-red-500 dark:text-red-400">
        Server Error: No content available
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          prefetch={false}
          aria-label="Go back to home page"
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}
