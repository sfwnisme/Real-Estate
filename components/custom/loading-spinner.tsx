import { Loader2 } from 'lucide-react'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className='inline-flex items-center justify-center animate-spin'>
      <Loader2 />
    </div>
  )
}
