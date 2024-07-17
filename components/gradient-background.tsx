import React from 'react'

/**
 * GradientBackgroundEffect component renders an overlay with a radial gradient effect.
 * The gradient transitions from transparent to black, creating a spotlight effect at the center.
 * The component uses Tailwind CSS for styling and ensures it is non-interactive.
 */
export function GradientBackgroundEffect(): React.ReactElement {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black" />
  )
}
