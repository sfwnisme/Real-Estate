"use client";
import { cn, returnFileSize, textTrimmer } from "@/lib/utils";
import { ImageType } from "@/types/types";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { memo, useCallback, useMemo, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { deleteImage } from "@/lib/requests";
import { toast } from "sonner";
import { setFeaturedImage } from "@/features/properties/lib/requests";
import ImagePreview from "./image-preview";

type Props = {
  images: ImageType[] | null;
};

const UploadedImageView = (props: Props) => {
  const images = props.images || [];
  const ownerId = images[0]?.ownerId;
  const [isPending, startTransition] = useTransition();
  console.log("TRIGGER: uploaded-images");
  const handleSetFeaturedImage = useCallback(
    async (id: string) => {
      startTransition(() => {
        toast.promise(
          async () => {
            const featuredImage = await setFeaturedImage(id, ownerId);
            if (!featuredImage.data) {
              throw new Error(
                featuredImage.msg || "Failed to set featured image"
              );
            }
            // revalidateTag handles the data refresh automatically
            return featuredImage.data;
          },
          {
            loading: "Setting featured image...",
            success: "Featured image set successfully",
            error: "Failed to set featured image",
          }
        );
      });
    },
    [ownerId]
  );
  
  const handleDeleteImage = useCallback(
    async (id: string) => {
      startTransition(() => {
        toast.promise(
          async () => {
            const deletedImage = await deleteImage(String(id), ownerId);
            if (!deletedImage.data) {
              throw new Error(deletedImage.msg || "Failed to delete image");
            }
            // No need for router.refresh() - revalidateTag handles it
            return deletedImage.data;
          },
          {
            loading: "Deleting image...",
            success: "Image deleted successfully",
            error: "Failed to delete image",
          }
        );
      });
    },
    [ownerId]
  );

  const renderImagePreview = useMemo(() => {
    return (
      <div className="w-full py-2">
        <div className="grid rounded-2xl gap-2 w-full grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
          {images.map((image) => {
            return <ImagePreview 
            key={image._id} 
            imageSize={Number(image.size)} 
            imageType={image.mimeType} 
            imageUrl={image.url} 
            isFeatured={image.isFeatured} 
            disableSetFeaturedImage={false} 
            deleteImage={() => handleDeleteImage(image._id)}
            setFeaturedImage={() => handleSetFeaturedImage(image._id)}
            />;
          })}
        </div>
      </div>
    );
  }, [images, handleDeleteImage, handleSetFeaturedImage]);

  const renderImages = useMemo(() => {
    return (
      <div className="overflow-y-scroll w-full py-2 flex flex-col">
        <div className="grid grid-cols-1 xl:grid-cols-3 rounded-2xl gap-2 w-full">
          {images.map((image) => {
            return (
              <div key={image._id} className="flex w-full">
                <div
                  className={cn(
                    "relative overflow-hidden border rounded-md flex flex-col gap-2 size-full p-2"
                  )}
                >
                  <div className="flex flex-col h-full w-full">
                    <div className="aspect-video w-full">
                      <Image
                        src={image.url || ""}
                        height="200"
                        width="200"
                        className="rounded-md size-full object-cover w-full"
                        alt={image?.fileName}
                        priority
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-end h-full">
                      <div className="flex w-full justify-between items-center">
                        <small title={image?.fileName || ""}>
                          {textTrimmer(image?.fileName || "", 20)}
                        </small>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteImage(image?._id)}
                          className="text-2xl"
                        >
                          <Trash2 size={23} />
                        </Button>
                      </div>
                      <div className="flex gap-2 flex-1">
                        <small className="text-primary/50 text-xs">
                          {returnFileSize(Number(image.size))}
                        </small>
                        <small className="text-primary/50 text-xs uppercase">
                          {image?.mimeType.split("/")[1]}
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className={cn("flex flex-col justify-between gap-2")}>
                    <Label className={cn("flex items-center gap-1")}>
                      <Checkbox
                        id={image._id}
                        className={cn(
                          "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary disabled:cursor-not-allowed!"
                        )}
                        checked={image.isFeatured}
                        onCheckedChange={() =>
                          handleSetFeaturedImage(image?._id)
                        }
                      />
                      <div className="grid gap-1.5 font-normal">
                        <small className="text-muted-foreground text-sm">
                          Set as main image
                        </small>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [images]);

  return (
    images.length > 0 && (
      <div className="overflow-y-scroll flex gap-2 max-h-100 items-start">
        {renderImagePreview}
      </div>
    )
  );
}

export default memo(UploadedImageView);