import React from 'react'
import Title from './title'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '../ui/button'
import Image from 'next/image'

type Props = {}

export default function Footer({ }: Props) {

  const currentYear = new Date().getFullYear()
  return (
    <footer className='bg-blue-50 relative px-4 min-h-[80dvh] flex'>
      <div data-component="footer-bg-image" className='size-full absolute bottom-0 left-1/2 -translate-x-1/2 z-0'>
        <Image src="/footer-bg.webp" width="2000" height="1200" alt='footer background' className='size-full object-cover' />
      </div>
      <div className='absolute bottom-0 left-0 w-full h-[80vh] lg:h-[40dvh] bg-linear-to-t from-gray-50 to-transparent' />
      <div className='responsive py-10 lg:py-20 relative flex flex-col md:flex-row md:flex-wrap justify-between gap-10 h-auto'>
        <div className='max-w-[400px]'>
          <Title type='start' title='Frequently asked questions.' />
          <div className='mt-4 inline-flex gap-4 items-center w-full'>
            <Input type="email" placeholder='Your email address' className='bg-white border-0' />
            <Button>Submit</Button>
          </div>
        </div>
        <div data-component="quick-links-block" className='min-w-[200px] max-md:flex-1'>
          <h3 className='text-xl font-semibold mb-4'>Quick links</h3>
          <ul>
            <li><Link href="#" className='size-full block py-1'>About us</Link></li>
            <li><Link href="#" className='size-full block py-1'>Blogs</Link></li>
            <li><Link href="#" className='size-full block py-1'>Contact</Link></li>
            <li><Link href="#" className='size-full block py-1'>Properties</Link></li>
          </ul>
        </div>
        <div data-component="footer-tail" className='relative flex flex-wrap gap-4 items-end justify-between w-full '>
          <p>@{currentYear} Sfwn. All rights reserved</p>
          <ul className='flex items-center gap-8'>
            <li><Link href="#">Terms & Conditions</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}