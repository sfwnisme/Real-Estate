import { getProperties } from '@/firebase.conf'
import { Property } from '@/types/types'
import React from 'react'

export default async function page() {
  const properties = await getProperties<Property>(2, 58)
  console.log(properties)
  return (
    <div>page</div>
  )
}
