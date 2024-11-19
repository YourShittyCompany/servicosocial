import LocalDashboard from './components/LocalDashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Serviço Social',
  description: 'Portal dos assistentes de Serviço Social'
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f5f1]">
      <div className="container mx-auto px-4 py-8">
        <LocalDashboard />
      </div>
    </main>
  )
}