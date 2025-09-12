'use client'

type Props = {
  children: React.ReactNode
}

export default function template({ children }: Props) {
  return (
    <div>{children}</div>
  )
}