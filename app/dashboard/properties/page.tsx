import PaginationLayout from "@/components/custom/pagination-layout";
import { Button } from "@/components/ui/button";
import PropertiesTableView from "@/features/properties/views/properties-table-view";
import Link from "next/link";
import { Suspense } from "react";
import { getProperties } from "@/lib/requests";
import PropertiesTableSkeleton from "@/features/properties/skeletons/properties-table-skeleton";
import { PAGINATION_CONFIG } from "@/constants/enums";
import { type Metadata } from "next";
import { type SearchParamsType } from "@/types/types";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Properties",
  description: "Properties page",
};

export default async function page({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const searchParamsRes = await searchParams;
  const page = searchParamsRes.page;
  const currentPage = page ? parseInt(page) : 1;
  const currentPageSize = PAGINATION_CONFIG.PROPERTIES.DASHBOARD;

  const properties = await getProperties(currentPageSize, currentPage);
  const propertiesData = properties.data;
  if(!propertiesData?.data) {
    notFound()
  }

  return (
    <div>
      <div className="inline-flex justify-between w-full mb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
          Properties
        </h1>
        <Button asChild>
          <Link href="properties/create">Add Property</Link>
        </Button>
      </div>
      <Suspense
        key={currentPage}
        fallback={<PropertiesTableSkeleton count={currentPageSize} />}
      >
        <PropertiesTableView
          currentPage={currentPage}
          searchParams={searchParamsRes}
        />
      </Suspense>
      <PaginationLayout
        page={propertiesData.page}
        nextPage={propertiesData.nextPage}
        prevPage={propertiesData.prevPage}
        currentPage={currentPage}
        totalPages={propertiesData.totalPages}
      />
    </div>
  );
}
