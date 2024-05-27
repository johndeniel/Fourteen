import React from 'react'

export default function Home() {
  return (
    <main className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col items-center justify-center min-h-screen text-black">
        <div className="relative flex flex-col items-center justify-center w-full h-full">
          <div className="text-center space-y-4">
            <div className="text-9xl font-bold">14</div>
            <div className="text-9xl font-bold">29</div>
          </div>
          <div className="absolute rotate-90 top-1/2 translate-x-32 -translate-y-1/2">
            <div className="text-center">
              <div className="text-4xl font-bold">SHOWCASES</div>
              <div className="text-md">Clean code - creative solutions</div>
              <div className="text-md">SOURCE CODE 14</div>
            </div>
          </div>
        </div>
        <div className="mt-10 text-center text-sm">
          THIS | ポートフォリオ | オープンソースプロジェクト
        </div>
      </div>
    </main>
  )
}
