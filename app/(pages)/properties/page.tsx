import PropertyCard from '@/components/custom/propertyCard'
import Title from '@/components/custom/title'
import { properties } from '@/data/dummyData'
import React from 'react'

export default function page() {
  return (
    <div>
      <Title title='Find Your Dream Home' description='Discover a curated selection of properties designed to suit every lifestyle, from cozy family homes to luxurious retreats.' type='start' />
      <div className='mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
        {properties.map((property) => <PropertyCard property={property} key={property.id}/>)}
      </div>
    </div>
  )
}
