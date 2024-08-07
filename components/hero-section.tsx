import React from 'react'

/**
 * HeroSection displays a hero section with prominent text and showcases information.
 * It features a vertically centered text block with rotated text to highlight showcases.
 */
export function HeroSection(): React.ReactElement {
  return (
    <div className="flex min-h-screen flex-col justify-center">
      <div className="relative flex w-full justify-center">
        <div className="space-y-2 text-center">
          <div className="text-9xl font-bold">14</div>
          <div className="text-9xl font-bold">29</div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 translate-x-32 rotate-90">
          <div className="text-center">
            <div className="text-4xl font-bold">SHOWCASES</div>
            <div className="text-md">Clean code - creative solutions</div>
            <div className="text-md">SOURCE CODE XIV</div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-sm">
        THIS | ポートフォリオ | オープンソースプロジェクト
      </div>
    </div>
  )
}
