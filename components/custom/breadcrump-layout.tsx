"use client";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { textTrimmer } from "@/lib/utils";
import { Fragment } from "react";

export function BreadcrumbLayout() {
  const pathname = usePathname();
  const pathnameList = pathname.split("/");
  pathnameList.splice(0, 1); // to remove first index
  const currentPathname = pathnameList.splice(-1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnameList.map((path) => (
          <Fragment key={path}>
            <BreadcrumbItem>
            <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link href={`/${path}`}>{path}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem title={currentPathname.join("")}>
          <BreadcrumbPage>
            {textTrimmer(currentPathname.join(""), 20)}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
