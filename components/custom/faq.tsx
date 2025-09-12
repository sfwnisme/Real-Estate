import React from 'react'
import Title from './title'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { ChevronDown, ChevronDownCircle } from 'lucide-react'
import { faqsDummyData } from '@/data/dummyData'

type Props = {}

export default function Faq({ }: Props) {
  return (
    <div className='flex max-lg:flex-col items-start gap-8 lg:gap-16 justify-between responsive'>
      <Title type='start' title="Frequently asked questions." description="We're here to make your real estate journey seamless and stress-free" />
      {/* <div className='size-16' /> */}
      <div className='w-full'>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          {faqsDummyData.map((faq) => (
            <AccordionItem value={String(faq.id)} key={faq.id} className='border-gray-100'>
              <AccordionTrigger>{faq.title}<ChevronDown strokeWidth="1" className='border border-gray-200 rounded-full ' /></AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance">
                <p>{faq.description}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion></div>
    </div>
  )
}