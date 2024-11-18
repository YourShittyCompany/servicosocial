'use client'

import dynamic from 'next/dynamic'

const DynamicDashboard = dynamic(
  () => import('./Dashboard'),
  {
    ssr: false,
    loading: () => null
  }
)

export default function ClientDashboard() {
  return <DynamicDashboard />
}
