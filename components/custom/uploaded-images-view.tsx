import { ImageType } from "@/types/types";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "./loading-spinner";

type Props = {
  images: ImageType[];
  isLoading: boolean;
};

export default function UploadedImageView(props: Props) {
  const images = props.images || [];

  const renderImages = images.map((img) => (
    <div
      className="overflow-hidden rounded-md w-auto h-fit bg-gray-100 p-1 mx-1 my-2"
      key={img?.fileName}
    >
      <Image
        src={img.url}
        height="200"
        width="200"
        className="rounded-md border size-full object-contain"
        alt={img?.fileName}
        key={img?.fileName}
      />
    </div>
  ));

  return (
    images.length > 0 && (
      <div
      className="columns-2 md:columns-3 rounded-2xl gap-0"
      >
        {props.isLoading && (
          <div className="absolute top-0 left-0 size-full bg-gray-50/80 flex items-start justify-center z-10 text-sm mb-8">
            <LoadingSpinner />Uploading images to cloud
          </div>
        )}
        {renderImages}
      </div>
    )
  );
}
