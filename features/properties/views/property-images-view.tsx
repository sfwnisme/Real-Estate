"use client";
import LoadingSpinner from "@/components/custom/loading-spinner";
import { Button } from "@/components/ui/button";
import { deleteImage } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { APIResponse, ImageType } from "@/types/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useMemo, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  images: APIResponse<ImageType[]>;
};

export default function PropertyImagesView(props: Props) {
  const { images } = props;
  if (!images.data) {
    return "there is no images";
  }
  const imagesData = images.data;
  console.log("images", imagesData);
  const [isDeleting, startDeleting] = useTransition();

  const removeImage = async (imageId: string) => {
    startDeleting(async () => {
      const deletedImage = await deleteImage(imageId);
      if (deletedImage.status === 204) {
        toast.success("image deleted successfully");
      } else {
        toast.error(deletedImage.msg);
      }
    });
  };
  const renderImages = useMemo(
    () =>
      imagesData?.map((img, idx) => (
        <div
          className="relative overflow-hidden rounded-md w-auto h-fit bg-gray-50 p-1 m-1"
          key={img?.fileName}
          id={String(idx)}
        >
          <Image
            src={img.url}
            height="200"
            width="200"
            className="rounded-md border size-full object-contain"
            alt={img?.fileName}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => removeImage(img._id)}
            className="absolute top-1 right-1"
          >
            {isDeleting ? <LoadingSpinner /> : <Trash />}
          </Button>
        </div>
      )),
    [images]
  );

  return (
    imagesData?.length > 0 && (
      <div
        className="columns-2 md:columns-3 rounded-2xl gap-0"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
      >
        {renderImages}
      </div>
    )
  );
}
