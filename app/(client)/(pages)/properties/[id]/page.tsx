import React from 'react'

import PropertyOverviewCard from '@/features/propertyPage/propertyOverviewCard'
import PropertyCarousel from '@/features/propertyPage/propertyCarousel'
import { getProperty } from '@/firebase.conf'
import { notFound } from 'next/navigation'

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params
  const property = await getProperty(id)
  console.log("property ", property)

  if (!property) {
    notFound()
  }

  console.log('=========', property, id)
  return (
    <div className='grid gap-8'>
      <PropertyCarousel images={property.images?.split(',') ?? []} />
      <div>
        <PropertyOverviewCard property={property} />
      </div>
      <article className='flex-1'>
        <h1 className='text-3xl font-semibold mb-10'>{property.title}</h1>
        <p>{property.description}</p>
      </article>
    </div>
  )
}