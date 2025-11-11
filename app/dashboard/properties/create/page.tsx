import CreatePropertyFormView from '@/features/properties/views/create-property-form-view'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Create Property",
  description: "Create Property page",
};
export default function page() {
  return (
    <div>
      <CreatePropertyFormView />
    </div>
  )
}
