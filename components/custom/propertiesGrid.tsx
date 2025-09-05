import { properties } from "@/data/dummyData";
import PropertyCard from "./propertyCard";
import Title from "./title";

export default function PropertiesGrid() {
  return (
    <div className="py-20 px-4 container mx-auto">
      <Title title="Your property just one step away" description="Nestled in the heart of a lush green forest, this property is a true nature lover's paradise." />
      <div className="h-10" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] gap-4">
        {properties.map((property) => (
          <PropertyCard property={property} key={property.title} />
        ))}
      </div>
    </div>
  )
}