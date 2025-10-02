"use client"
import React from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Props = {
  currentPage: number,
  nextPage: number,
  totalPages: number,
}

export default function PaginationLayout({ currentPage, nextPage, totalPages}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(pageNumber))
    return `${pathname}?${String(params)}`
  }

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className={currentPage == 1 ? "pointer-events-none opacity-25" : undefined}>
            <Link href={createPageURL(currentPage - 1)} passHref><PaginationPrevious /></Link>
          </PaginationItem>
          {
            currentPage > 1 &&
            <PaginationItem>
              <Link href={createPageURL(currentPage - 1)} passHref><PaginationLink>{currentPage - 1}</PaginationLink></Link>
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationLink isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage <= totalPages - 1 &&
            <PaginationItem>
              <Link href={createPageURL(nextPage)} passHref><PaginationLink>{nextPage}</PaginationLink></Link>
            </PaginationItem>
          }
          <PaginationItem className={currentPage == nextPage ? "pointer-events-none opacity-25" : undefined}>
            <Link href={createPageURL(nextPage)} passHref><PaginationNext /></Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}