"use client";

import { ImageType, Property } from "@/types/types";
import React, { useMemo } from "react";
import UpdatePropertyFormView from "./update-property-form-view";
import CreateNewPropertyImagesFormView from "./create-new-property-images-form-view";
import FieldSet from "@/components/custom/field-set";
import UpdatePropertySlugFormView from "./update-property-slug-form-view";
import UploadedPropertyImagesView from "@/features/properties/views/mutation-views/uploaded-property-images-view";

type Props = {
  property: Property;
  images: ImageType[] | null;
};

export default function UpdatePropertyView(props: Props) {
  const { property, images } = props;

  // Stable property reference - only updates when key fields change
  const stableProperty = useMemo(
    () => property, 
    [property._id, property.slug, property.title]
  );
  
  // Stable images reference - detects changes in array length, IDs, or isFeatured status
  const imagesSignature = useMemo(() => {
    if (!images || images.length === 0) return 'empty';
    return images.map(img => `${img._id}:${img.isFeatured}`).join('|');
  }, [images]);
  
  const stableImages = useMemo(() => images, [imagesSignature]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 relative">
      <UpdatePropertyFormView property={stableProperty} />
      <div className="sticky top-0 flex flex-col gap-4 lg:basis-1/3">
        <FieldSet title="Slug" description="The slug is the URL of the property">
          <UpdatePropertySlugFormView property={stableProperty} />
        </FieldSet>
        <FieldSet
          title="Current images"
          description="View the current images for the property"
        >
          <UploadedPropertyImagesView images={stableImages} />
        </FieldSet>
        <FieldSet
          title="Upload images"
          description="Upload new images for the property"
        >
          <CreateNewPropertyImagesFormView
            propertyId={property._id}
            disableFeaturedImage
          />
        </FieldSet>
      </div>
    </div>
  );
}
