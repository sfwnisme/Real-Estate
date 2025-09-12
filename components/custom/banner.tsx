import Image from 'next/image'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'

type Props = {
  points: {
    title: string,
    description: string,
    id: number
  }[],
  bg_image: string,
}
let listNumber = 1
export default function Banner({ points, bg_image }: Props) {
  return (
    <div className="relative w-full bg-cover bg-no-repeat bg-center h-[600px] rounded-2xl overflow-hidden" style={{ backgroundImage: `url('${bg_image}')` }}>
      <Accordion
        type='single'
        collapsible
        defaultValue={points[0].title}
        className='absolute bottom-4 left-1/2 -translate-x-1/2 xl:-translate-x-0 xl:left-4 rounded-2xl bg-white w-[calc(100%-32px)] xl:w-[600px]'
        >
        {
          points.map((point) => (
            <div className='flex items-start gap-5 p-6 not-last:border-b not-last:border-b-gray-100' key={point.id}>
              <span className='text-gray-500 text-xl font-medium block'>0{listNumber++}</span>
              <AccordionItem value={point.title} className='w-full'>
                <AccordionTrigger className='p-0'>{point.title}</AccordionTrigger>
                <AccordionContent className='p-0 pt-3'>
                  <p className='text-gray-600 leading-normal text-base'>{point.description}</p>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))
        }
      </Accordion>
    </div>
  )
}