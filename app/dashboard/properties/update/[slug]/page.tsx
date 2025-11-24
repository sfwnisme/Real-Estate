import { STATUS_TEXT } from "@/constants/enums";
import CreatePropertyTempImageFormView from "@/features/properties/views/create-property-temp-image-form-view";
import PropertyImagesView from "@/features/properties/views/property-images-view";
import UpdatePropertyFormView from "@/features/properties/views/mutation-views/update-property-form-view";
import UpdatePropertyView from "@/features/properties/views/mutation-views/update-property-view";
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
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-primary">
        Editing: {property.data.title}
      </h1>
      <UpdatePropertyView
        property={property.data}
        images={propertyImages.data}
      />
    </div>
  );
}
