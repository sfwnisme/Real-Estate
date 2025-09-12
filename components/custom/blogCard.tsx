import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  title: string,
  content: string,
  image: string,
  url: string
}

export default function BlogCard({ article }: { article: Props }) {
  return (
    <Link href={article.url} className='group/blogCard relative overflow-hidden rounded-2xl cursor-pointer max-h-[400px]'>
      <Image src={article.image} width='400' height='400' alt={article.title} className='object-cover size-full' />
      <div className='absolute left-0 bottom-0 xl:-bottom-full group-hover/blogCard:bottom-0 duration-500 group-hover/blogCard:duration-500 backdrop-blur-2xl w-full p-4 text-white'>
        {article.title}
      </div>
    </Link>
  )
}