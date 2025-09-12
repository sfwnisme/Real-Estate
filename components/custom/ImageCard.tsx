import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  image: string,
}
export default function ImageCard({ image }: Props) {
  return (
    <div className='overflow-hidden rounded-2xl h-auto w-full lg:w-[500px] aspect-[10/7] lg:aspect-[10/10.5]'>
      <Image src={image} width='600' height='200' alt="image card" className='object-cover size-full'/>
    </div>
  )
}