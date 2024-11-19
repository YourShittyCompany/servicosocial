import './globals.css'
import { Josefin_Slab } from 'next/font/google'
import { metadata } from './metadata'

const josefinSlab = Josefin_Slab({
  weight: '700',
  subsets: ['latin'],
})

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT">
      <body className={josefinSlab.className}>{children}</body>
    </html>
  )
}