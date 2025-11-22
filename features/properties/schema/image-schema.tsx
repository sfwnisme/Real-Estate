import z from "zod";
import { kbToBytes } from "@/lib/utils";

export const CreateImageSchema = z.object({
  image: z
    .file()
    .max(kbToBytes(1024 * 2), "maximum size is 500KB")
    .mime(
      ["image/webp", "image/jpeg"],
      "only accept .webp and .jpeg image types"
    ),
  isFeatured: z.boolean(),
});

export const ImagesArraySchema = z
  .array(CreateImageSchema)
  .max(15, "upload maximum 15 images");

export const CreateArrayImagesSchema = z.object({
  images: ImagesArraySchema,
});

export type CreateImageType = z.infer<typeof CreateImageSchema>;
export type CreateArrayImagesType = z.infer<typeof CreateArrayImagesSchema>;

export const UpdateImagesSchema = CreateImageSchema.omit({ image: true });

export type UpdateImagesType = z.infer<typeof UpdateImagesSchema>;
