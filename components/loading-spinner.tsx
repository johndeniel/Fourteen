/**
 * Displays a loading spinner while content is being fetched.
 */
export function LoadingSpinner() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Loading
        </p>
      </div>
    </div>
  )
}
