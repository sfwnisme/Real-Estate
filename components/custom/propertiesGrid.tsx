import { bannerData, properties } from "@/data/dummyData";
import PropertyCard from "./propertyCard";
import Title from "./title";
import Banner from "./banner";
import { getProperties } from "@/firebase.conf";
import { Property } from "@/types/types";

export default async function PropertiesGrid() {
  const propertiesList = await getProperties<Property>()
  console.log(propertiesList)
  return (
    <div className="responsive">
      <Title title="Your property just one step away" description="Nestled in the heart of a lush green forest, this property is a true nature lover's paradise." />
      <div className="h-10" />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {propertiesList.data.map((property) => (
          <PropertyCard property={property} key={property.id} />
        ))}
      </div>
      <div className="h-4"/>
      <Banner points={bannerData.points} bg_image={bannerData.bg_image}/>
    </div>
  )
}