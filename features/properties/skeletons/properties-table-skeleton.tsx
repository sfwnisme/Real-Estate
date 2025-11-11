
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function PropertiesTableSkeleton({count}: {count: number}) {
  const countArray = Array.from({length: count})
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
          {countArray.map((_, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium"><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell className="flex"><Skeleton className="h-5 w-full" /><p><sup><Skeleton className="size-3" /></sup></p></TableCell>
              <TableCell className="text-start"><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell className="text-start"><Skeleton className="h-5 w-full" /></TableCell>
              <TableCell className="text-end w-fit">
                <div className="inline-flex gap-2 items-center justify-end">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-8" />
                  <Skeleton className="h-5 w-8" />
                </div>
              </TableCell>
            </TableRow>
          ))}
          <TableCell><Skeleton className="w-full h-5" /></TableCell>
        </TableBody>
      </Table>
    </div>
  )
}