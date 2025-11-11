import UpdatePropertyFormView from '@/features/properties/views/update-property-form-view'
import { getProperty } from '@/lib/firebase-queries'
import { Metadata } from 'next';
import { notFound } from 'next/navigation'
import React from 'react'

export const metadata: Metadata = {
  title: "Update Property posts",
  description: "Update Property posts page",
};

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
      <UpdatePropertyFormView property={property} />
    </div>
  )
}
