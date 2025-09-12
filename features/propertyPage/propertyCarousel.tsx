'use client'
import React from 'react'
// import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'

type Props = {
  images: string[]
}

export default function PropertyCarousel({ images }: Props) {
  return (
    <div data-component="carousel-container" className='flex items-center w-full justify-center'>
      <Carousel className="w-full max-w-full">
        <CarouselContent className='h-120 m-0! gap-4'>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className='rounded-2xl overflow-hidden pl-0!'>
              {images.map((image) => <Image src={image} width='1900' height='1000' alt='property image' className="size-full object-cover" key={image} />)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-4 bg-gray-900/80 text-gray-50' />
        <CarouselNext className='right-4 bg-gray-900/80 text-gray-50 border-transparent' />
      </Carousel>
    </div>
  )
}