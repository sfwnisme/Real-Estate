import PaginationLayout from "@/components/custom/pagination-layout"
import { Button } from "@/components/ui/button"
import PropertiesTable from "@/features/dashboard/properties/properties-table"
import { getProperties } from "@/firebase.conf"
import { Property } from "@/types/types"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

// async function TableData({ currentPage }: { currentPage: number }) {
//   const properties = await getProperties<Property>(1, currentPage)
//   console.log('properties', properties, currentPage)
//   if (!properties.data) {
//     return notFound()
//   }
//   return (
//     <div>
//       <PropertiesTable properties={properties} />
//       <PaginationLayout currentPage={properties.currentPage} nextPage={properties.nextPage} totalPages={properties.totalPages} />
//     </div>
//   )
// }

export default async function page(props: { searchParams: Promise<{ page?: string }> }) {
  const searchParams = await props.searchParams;
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1

  return (
    <div>
      <div className="inline-flex justify-between w-full mb-12">
        <h1 className="scroll-m-20 text-center text-4xl font-medium tracking-tight text-balance">
          Properties
        </h1>
        <Button><Link href="properties/create">Add Property</Link></Button>
      </div>
      <Suspense fallback={<mark>'loading.....'</mark>}>
        {/* <TableData key={currentPage} currentPage={currentPage} /> */}
        <PropertiesTable currentPage={currentPage} />
        {/* <PaginationLayout currentPage={properties.currentPage} nextPage={properties.nextPage} totalPages={properties.totalPages} /> */}
      </Suspense>
    </div>
  )
}
