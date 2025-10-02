"use client"
import React, { useCallback } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {
  currentPage: number,
  nextPage: number,
  totalPages: number,
}

export default function PaginationLayout({ currentPage, nextPage, totalPages}: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(pageNumber))
    return `${pathname}?${String(params)}`
  }
  const handlePageChange = useCallback((page: number) => {
    router.replace(createPageURL(page))
  }, [router, createPageURL])


  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem className={currentPage == 1 ? "pointer-events-none opacity-25" : undefined}>
            <PaginationPrevious onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)} />
          </PaginationItem>
          {
            currentPage > 1 &&
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>{currentPage - 1}</PaginationLink>
            </PaginationItem>
          }
          <PaginationItem>
            <PaginationLink isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage <= totalPages - 1 &&
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(nextPage)}>{nextPage}</PaginationLink>
            </PaginationItem>
          }
          <PaginationItem className={currentPage == nextPage ? "pointer-events-none opacity-25" : undefined}>
            <PaginationNext onClick={() => handlePageChange(nextPage)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}