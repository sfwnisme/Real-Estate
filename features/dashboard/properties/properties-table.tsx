// 'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PaginationType, Property } from "@/types/types"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { notFound} from "next/navigation"
import { deleteProperty, getProperties } from "@/firebase.conf"
import { toast } from "sonner"
import PaginationLayout from "@/components/custom/pagination-layout"
// import { useState, useTransition } from "react"

type Props = {
  // properties: { data: Property[] } & PaginationType
  currentPage: number
}


export default async function PropertiesTable({ currentPage }: Props) {
  // const [isDeletingProperty, startDeletingProperty] = useTransition()
  // const [propertyIdToDelete, setPropertyIdToDelete] = useState<string>("")
  // console.log(propertyIdToDelete)
  const properties = await getProperties<Property>(1, currentPage)
  console.log('properties', properties, currentPage)
  if (!properties.data || properties?.data?.length === 0) {
    return notFound()
  }

  // const handleDeleteProperty = async (id: string) => {
  //   startDeletingProperty(async () => {
  //     try {
  //       await deleteProperty(id)
  //       toast.success("property deleted")
  //     } catch (error) {
  //       toast.error("property deletion failed")
  //     }
  //   })
  // }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="text-start">Year Built</TableHead>
            <TableHead className="text-start">Type</TableHead>
            <TableHead className="text-start w-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.data.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>{property.price.toLocaleString("en-SA", { style: "currency", currency: "SAR" })}</TableCell>
              <TableCell className="flex">{property.propertySize}<p>m<sup>2</sup></p></TableCell>
              <TableCell className="text-start">{property.yearBuilt}</TableCell>
              <TableCell className="text-start">{property.propertyType}</TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex gap-2 items-center justify-end">
                  <Link href={`/properties/${property.id}`}>
                    <Button variant="outline" size="sm">
                      Open
                    </Button>
                  </Link>
                  <Link href={`/dashboard/properties/update/${property.id}`}>
                    <Button variant="outline" size="icon">
                      <Pencil />
                    </Button>
                  </Link>
                  {/* <Button variant="destructive" onClick={() => setPropertyIdToDelete(property.id)}><Trash /></Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Dialog open={!!propertyIdToDelete} onOpenChange={() => setPropertyIdToDelete("")}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Property Data?</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this property list data? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" variant="destructive" onClick={() => handleDeleteProperty(propertyIdToDelete)} disabled={isDeletingProperty}>
              {isDeletingProperty ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
        <PaginationLayout currentPage={properties.currentPage} nextPage={properties.nextPage} totalPages={properties.totalPages} />
        </div>
  )
}
