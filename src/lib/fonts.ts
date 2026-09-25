import { DM_Sans, Bebas_Neue, Fraunces, JetBrains_Mono } from 'next/font/google'

export const displayFont = Bebas_Neue({
  variable: '--font-display',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const serifFont = Fraunces({
  variable: '--font-serif',
  weight: ['300', '400', '600'],
  subsets: ['latin'],
  display: 'swap',
})

export const monoFont = JetBrains_Mono({
  variable: '--font-mono',
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
})

export const bodyFont = DM_Sans({
  variable: '--font-body',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  display: 'swap',
})
