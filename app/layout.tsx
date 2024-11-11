import type { Metadata } from 'next'
import './globals.css'
import { Josefin_Slab } from 'next/font/google'
import React from 'react'

const josefinSlab = Josefin_Slab({
  weight: '700',
  subsets: ['latin'],
})

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#22c55e',
}

export const metadata: Metadata = {
  title: 'Serviço Social',
  description: 'O Verdadeiro Portal dos Assistentes Sociais.',
  keywords: 'servico, serviço, servico social, serviço social, social, assistente, assistente social, portal, portal assistente, portal assistente social, portugal',
  authors: [{ name: 'Luís Almeida' }],
  openGraph: {
    title: 'Serviço Social',
    description: 'O Verdadeiro Portal dos Assistentes Sociais.',
    url: 'https://servicosocial.pt',
    siteName: 'Serviço Social',
    images: [
      {
        url: 'https://servicosocial.pt/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Serviço Social - O Verdadeiro Portal dos Assistentes Sociais',
      },
    ],
    locale: 'pt_PT',
    type: 'website',
  },
  robots: 'index, follow',
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-PT" className={josefinSlab.className}>
      <body>{children}</body>
    </html>
  )
}