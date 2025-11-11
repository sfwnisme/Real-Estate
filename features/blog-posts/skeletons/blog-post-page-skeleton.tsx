import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function BlogPostPageSkeleton() {
  return (
    <div>
    <div className="mb-8">
      <div className="mb-8">
        <Skeleton className='h-12 w-full' />
        <Skeleton className='h-5 w-2/3 mt-4' />
      </div>
      <div className="w-full h-[500px]">
        <Skeleton className='size-full' />
      </div>
    </div>
    <div className='grid gap-2'>
    <Skeleton className='h-5 w-11/12' />
    <Skeleton className='h-5 w-12/12' />
    <Skeleton className='h-5 w-10/12' />
    <Skeleton className='h-5 w-11/12' />
    <Skeleton className='h-5 w-8/12' />
    <Skeleton className='h-5 w-9/12' />
    </div>
  </div>
  )
}
