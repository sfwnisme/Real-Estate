import Title from '@/components/custom/title'
import React, { Suspense } from 'react'
import PropertyCard from '@/components/custom/propertyCard'
import { getProperties } from '@/firebase.conf'
import { Property } from '@/types/types'

async function PropertiesList() {
  const properties = await getProperties<Property>(5)
  return (
    <div className='mt-10 grid md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {properties.data.map((property) => (
        <PropertyCard property={property} key={property.id} />
      ))}
    </div>
  )
}

export default async function page() {
  return (
    <div>
      <Title title='Find Your Dream Home' description='Discover a curated selection of properties designed to suit every lifestyle, from cozy family homes to luxurious retreats.' type='start' />
      <Suspense fallback={<mark className="text-4xl bg-red-500">Loading...</mark>}>
        <PropertiesList />
      </Suspense>
    </div>
  )
}
