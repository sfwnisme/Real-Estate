import React, { Suspense } from 'react'

type Props = {
  children: React.ReactNode
}

export default function template({ children }: Props) {
  return (
    <div>
      <Suspense>
        {children}
      </Suspense>
    </div>
  )
}