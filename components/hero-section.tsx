export function HeroSection() {
  return (
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
  )
}