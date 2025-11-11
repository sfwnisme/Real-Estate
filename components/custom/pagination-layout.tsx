"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Pagination as PaginationType } from "@/types/types";

type Props = Pick<
  PaginationType,
  "page" | "nextPage" | "prevPage" | "totalPages"
> & { currentPage: number | string };

export default function PaginationLayout({
  page,
  nextPage,
  prevPage,
  totalPages,
  currentPage
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(pageNumber));
    return `${pathname}?${String(params)}`;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className={!prevPage ? "pointer-events-none opacity-25" : undefined}
          >
            <Link href={createPageURL(prevPage)} passHref>
              <PaginationPrevious />
            </Link>
          </PaginationItem>
          {page > 1 && (
            <PaginationItem>
              <Link href={createPageURL(prevPage)} passHref>
                <PaginationLink>{prevPage}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          {nextPage !== null && (
            <PaginationItem>
              <Link href={createPageURL(nextPage)} passHref>
                <PaginationLink>{nextPage}</PaginationLink>
              </Link>
            </PaginationItem>
          )}
          <PaginationItem
            className={
               nextPage == null? "pointer-events-none opacity-25" : undefined
            }
          >
            <Link href={createPageURL(nextPage)} passHref>
              <PaginationNext />
            </Link>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
