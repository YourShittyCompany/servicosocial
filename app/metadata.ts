import { Metadata } from 'next'

const siteConfig = {
  name: 'Serviço Social',
  description: 'Portal dos assistentes de Serviço Social',
  url: 'https://serviçosocial.pt',
  ogImage: 'https://serviçosocial.pt/swlgtt.png',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://seusite.com'),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: 'O Portal dos assistentes de Serviço Social.',
  keywords: ['serviço social', 'serviço social dges', 'serviço social porto', 'serviço social coimbra', 'serviço social lisboa', 'serviço social utad', 'serviço social leiria', 'serviço social viseu', 'serviço social beja', 'serviço social iscte', 'serviço social mestrado', 'dges serviço social pós-laboral', 'licenciatura serviço social (pós-laboral)', 'licenciatura serviço social (pós-laboral) porto', 'licenciatura em serviço social e-learning', 'Serviço Social, o que faz', 'Direito dges', 'Serviço Social', 'Licenciatura Serviço Social', 'isssp- valor das propinas', 'ISSSP privado ou Público', 'ISSSP propinas licenciatura', 'licenciatura serviço social (pós-laboral) porto', 'Isssp mestrados', 'pós-graduação serviço social', 'Instituto Superior de Serviço Social do Porto', 'ISSSP propinas mestrado'],
  
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
  },
  viewport: 'width=device-width, initial-scale=1', 
  themeColor: '#ffffff',                      
}
