import { Property } from '@/types/types'
import { BedSingle, Building2, Calendar, Car, Cuboid, Ruler, Space } from 'lucide-react'
import React from 'react'

type Props = {
  property: Pick<Property, "price" | "propertyType" | "bedrooms" | "garage" | "propertySize" | "yearBuilt">
}

export default function PropertyOverviewCard({ property }: Props) {
  const { price, propertyType, bedrooms, garage, propertySize, yearBuilt } = property
  return (
    <div className='border border-gray-300 rounded-2xl p-4 sm:p-6 w-full flex max-sm:flex-col items-center gap-8'>
      <h1 className='text-3xl sm:text-2xl md:text-3xl font-semibold sm:border-r sm:border-r-gray-200 pr-6'>{price?.toLocaleString("en-SA", {style: 'currency', currency: "SAR"})}</h1>
      <ul className='flex flex-wrap gap-3 sm:gap-x-4 sm:gap-y-4 xl:gap-x-8 lg:gap-y-4 w-full flex-1 max-sm:justify-center lg:justify-between'>
        <li className='text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex gap-2'><BedSingle size={20} strokeWidth={1.4}/>{bedrooms} Bedrooms</li>
        <li className='text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex gap-2'><Car size={20} strokeWidth={1.4}/>{garage} Garage</li>
        <li className='text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex gap-2'><Ruler size={20} strokeWidth={1.4}/>{propertySize} <p>m<sup>2</sup></p></li>
        <li className='text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex gap-2'><Calendar size={20} strokeWidth={1.4}/>{yearBuilt}</li>
        <li className='text-gray-700 text-base sm:text-base lg:text-lg font-medium inline-flex gap-2'><Building2 size={20} strokeWidth={1.4}/>{propertyType}</li>
      </ul>
    </div>
  )
}