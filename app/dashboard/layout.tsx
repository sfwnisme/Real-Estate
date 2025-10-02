import DashboardLayout from '@/features/dashboard/dashboard-layout'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <div><DashboardLayout>{children}</DashboardLayout></div>
  )
}