import { STATUS_TEXT } from "@/constants/enums";
import CreatePropertyTempImageFormView from "@/features/properties/views/create-property-temp-image-form-view";
import PropertyImagesView from "@/features/properties/views/property-images-view";
import UpdatePropertyFormView from "@/features/properties/views/update-property-form-view";
import { getProperty, getPropertyImages } from "@/lib/requests";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Update Property posts",
  description: "Update Property posts page",
};

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { slug } = params;
  const property = await getProperty(slug);
  console.log(property);
  if (!property.data) {
    notFound();
  }
  const propertyImages = await getPropertyImages(property.data._id);
  return (
    <div>
      <h1>Update</h1>
      <UpdatePropertyFormView property={property.data} />
      <h2 className="text-xl font-bold mt-8 mb-4">Images</h2>
      <PropertyImagesView images={propertyImages} />
      <h2 className="text-xl font-bold mt-8 mb-4">Upload new images</h2>
      {/* <UploadI */}
      <div className="flex items-center justify-end w-full">
        <CreatePropertyTempImageFormView id={property.data._id} />
      </div>
    </div>
  );
}
