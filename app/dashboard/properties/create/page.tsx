import CreatePropertyFormView from '@/features/properties/views/create-property-form-view'
import CreatePropertyWithImagesFormView from '@/features/properties/views/create-property-with-images-form-view';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Create Property",
  description: "Create Property page",
};
export default async function page() {
  return (
    <div>
      {/* <CreatePropertyFormView /> */}
      <CreatePropertyWithImagesFormView />
    </div>
  )
}
