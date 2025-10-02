import Footer from '@/components/custom/footer'
import Nav from '@/components/custom/nav'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div data-component="pages-layout" className='bg-gray-50'>
      <div className='responsive py-20'>
        {children}
      </div>
    </div>
  )
}
