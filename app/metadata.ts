import { Metadata } from 'next'

const siteConfig = {
  name: 'Serviço Social',
  description: 'Portal dos assistentes de Serviço Social',
  url: 'https://serviçosocial.pt',
  ogImage: 'https://serviçosocial.pt/swlgtt.png',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'O Portal líder em Portugal para assistentes de Serviço Social.',
  keywords: ['serviço social', 'serviço social dges', 'serviço social porto', 'serviço social coimbra', 'serviço social lisboa', 'serviço social utad', 'serviço social leiria', 'serviço social viseu', 'serviço social beja', 'serviço social iscte', 'serviço social mestrado', 'servicosocial.pt', 'serviçosocial.pt', 'gestão', 'management', 'assistência', 'assistência social', 'assistentes', 'assistentes sociais', 'dashboard', 'assistente social portugal', 'portal serviço social', 'gestão casos sociais', 'software serviço social', 'plataforma assistentes sociais'],
  
  // Definições do OpenGraph
  openGraph: {
    type: 'website',
    locale: 'pt_PT',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: '/swlgtt.png',
  },
  
  // Twitter
  // twitter: {
  //   card: 'summary_large_image',
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: '@seuhandle',
  // },
  
  // Ícones e respetivo manifesto
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  
  // Robots e crawlers
  robots: {
    index: true,
    follow: true,
    nocache: false,
    noarchive: false,
    noimageindex: false,
    notranslate: false,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
