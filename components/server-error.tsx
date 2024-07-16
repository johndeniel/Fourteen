import Link from 'next/link'

export function ServerError() {
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
        >
          Go Back
        </Link>
      </div>
    </div>
  )
}
