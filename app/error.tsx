'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-screen bg-[#f5f5f1] flex items-center justify-center">
      <div className="text-center p-4">
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4">
          Algo deu errado!
        </h2>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-[#2E8B57] text-white rounded-md hover:bg-[#236b43] transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
