import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  children: React.ReactNode,
  href: string,
  icon?: "visible" | "invisible",
}

export default function ButtonLink({ children, href, icon = "visible" }: Props) {
  return (
    <Link href={href} className='group/button flex flex-row items-center gap-3'>
      {children}
      {
        icon === "visible" &&
        <div className='w-[20px] overflow-hidden inline-flex items-center'>
          <div className='inline-flex items-center relative -left-[20px] group-hover/button:left-0 transition-left duration-300 group-hover/button:transition-left group-hover/button:duration-300'>
            <ArrowRight size='20px' className='text-gray-500 shrink-0' />
            <ArrowRight size='20px' className='text-gray-500 shrink-0 group-hover/button:opacity-0 duration-200' />
          </div>
        </div>
      }
    </Link>
  )
}