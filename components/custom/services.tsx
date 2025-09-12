"use client"
import React, { useState } from 'react'
import Title from './title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { servicesDummyData } from '@/data/dummyData'
import ImageCard from './ImageCard'
import { Badge } from '../ui/badge'
import Link from 'next/link'

type Props = {}

export default function Services({ }: Props) {
  const [imgPreview, setimgPreview] = useState("/blog/blog01.webp")
  return (
    <div className="bg-gray-50 py-20">
      <div className='responsive flex flex-nowrap max-lg:flex-col items-start justify-between gap-8 lg:gap-20 h-full'>
        <div className='w-full h-full flex flex-col justify-between'>
          <Title type="with_badge" title='Our Expertise, Your Advantage' description='We’re here to guide you every step of the way.' badge="Services" />
          {/* <div className='size-20' /> */}
          <div className='w-full'>
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue="item-1"
            >
              {servicesDummyData.slice(0, 3).map((service) => (
                <AccordionItem value={String(service.id)} key={service.id} className='border-gray-200' onClick={() => setimgPreview(service.image)}>
                  <AccordionTrigger>{service.title}</AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 text-balance">
                    <p>{service.description}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className='max-lg:w-full shrink-0'>
          <ImageCard image={imgPreview} />
        </div>
      </div>
    </div>
  )
}