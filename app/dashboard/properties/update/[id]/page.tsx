import UpdatePropertyForm from '@/features/dashboard/components/update-property-form'
import { getProperty } from '@/firebase.conf'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function page(props: {params: Promise<{id: string}>}) {
  const params = await props.params;
  const {id} = params
  const property = await getProperty(id)
  if(!property) {
    return notFound()
  }
  return (
    <div>
      <h1>Update</h1>
      <UpdatePropertyForm property={property} />
    </div>
  )
}
