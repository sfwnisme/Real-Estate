import z from "zod";
import { kbToBytes } from "@/lib/utils";
const MAX_IMAGES = 15;
const MAX_IMAGE_SIZE = 500 * 1024;
export const CreateImageSchema = z.object({
  image: z
    .file()
    .max(
      kbToBytes(MAX_IMAGE_SIZE),
      `maximum size is ${MAX_IMAGE_SIZE / 1024}KB`
    )
    .mime(
      ["image/webp", "image/jpeg"],
      "only accept .webp and .jpeg image types"
    ),
  isFeatured: z.boolean(),
});

export const ImagesArraySchema = z
  .array(CreateImageSchema)
  .max(MAX_IMAGES, `upload maximum ${MAX_IMAGES} images`);

export const CreateArrayImagesSchema = z.object({
  images: ImagesArraySchema,
});

export type CreateImageType = z.infer<typeof CreateImageSchema>;
export type CreateArrayImagesType = z.infer<typeof CreateArrayImagesSchema>;

export const UpdateImagesSchema = CreateImageSchema.omit({ image: true });

export type UpdateImagesType = z.infer<typeof UpdateImagesSchema>;
