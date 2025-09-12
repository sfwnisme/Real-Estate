import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { MenuIcon } from 'lucide-react'

type Props = {}

export default function Nav({ }: Props) {
  return (
    <nav className='flex items-center h-fit px-6 py-6 sticky top-0 z-50 bg-red- backdrop-blur-xs'>
      <div className='w-50 max-w-full h-auto overflow-hidden me-auto'>
        <Link href="/" className='flex size-full'>
          <Image className='size-full' src="/logoipsum.png" alt="logo" width={200} height={50} />
        </Link>
      </div>
      <ul className='flex items-center gap-8 max-md:hidden'>
        <li><Link href="/properties" className='font-medium'>Properties</Link></li>
        <li><Link href="/about" className='font-medium'>About</Link></li>
        <li><Link href="/contact" className='font-medium'>Contact</Link></li>
        <li><Link href="/blog" className='font-medium'>Blog</Link></li>
      </ul>
      <DropdownMenu>
        <DropdownMenuTrigger className='max-md:block hidden'>
          <MenuIcon className='size-8' />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem><Link href="/properties" className='font-medium'>Properties</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/about" className='font-medium'>About</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/contact" className='font-medium'>Contact</Link></DropdownMenuItem>
          <DropdownMenuItem><Link href="/blog" className='font-medium'>Blog</Link></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}