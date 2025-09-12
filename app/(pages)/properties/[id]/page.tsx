import React from 'react'

import { propertiesPagesDummy, servicesDummyData } from '@/data/dummyData'
import PropertyCarousel from '@/features/propertyPage/propertyCarousel'
import PropertyOverviewCard from '@/features/propertyPage/propertyOverviewCard'

export default function page() {
  return (
    <div className='grid gap-8'>
      <PropertyCarousel images={[servicesDummyData[0].image, servicesDummyData[1].image]} />
      <div>
        <PropertyOverviewCard property={propertiesPagesDummy[0]} />
      </div>
      <article className='flex-1'>
        <h1 className='text-3xl font-semibold mb-10'>{propertiesPagesDummy[0].title}</h1>
        <p>
        Tucked away in a tranquil, exclusive enclave, this breathtaking 5-bedroom, 4-bathroom villa offers resort-style living at its finest. The property is surrounded by lush tropical landscaping and features an inviting pool with a spacious patio, perfect for outdoor entertaining. Inside, you’ll find soaring ceilings, elegant finishes, and oversized windows that flood the space with natural light.

The gourmet kitchen is a chef’s dream, featuring marble countertops, custom cabinetry, and top-of-the-line appliances. The spacious master suite includes a private balcony and an ensuite bathroom with a soaking tub and walk-in shower, creating the perfect retreat.
        </p>
      </article>
    </div>
  )
}
