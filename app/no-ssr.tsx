'use client'

import dynamic from 'next/dynamic'

// NOTE: disable pre-rendering is necessary to ensure proper WebAssembly initialization
// docs: https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
export const BopomofoifyWithNoSSR = dynamic(() => import('@/app/bopomofoify').then((mode) => mode.Bopomofoify), {
  ssr: false,
})
