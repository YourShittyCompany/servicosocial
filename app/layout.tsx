import type { Metadata } from 'next'
import './globals.css'
import { Josefin_Slab } from 'next/font/google'

const josefinSlab = Josefin_Slab({
  weight: '700',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Serviço Social',
  description: 'O Verdadeiro Portal dos Assistentes Sociais.',
}

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