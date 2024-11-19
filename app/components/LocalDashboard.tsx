'use client'

import dynamic from 'next/dynamic'

const DynamicDashboard = dynamic(
  () => import('./RemoteDashboard'),
  {
    ssr: false,
    loading: () => null
  }
)

export default function LocalDashboard() {
  return <DynamicDashboard />
}
