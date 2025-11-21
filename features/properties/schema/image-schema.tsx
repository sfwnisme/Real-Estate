import z from "zod";
import { kbToBytes } from "@/lib/utils";

export const createImageSchema = z.object({
  image: z
    .file()
    .max(kbToBytes(1024 * 2), "maximum size is 500KB")
    .mime(
      ["image/webp", "image/jpeg"],
      "only accept .webp and .jpeg image types"
    ),
  isFeatured: z.boolean(),
});

export const createImagesSchema = z
  .array(createImageSchema)
  .max(15, "upload maximum 15 images");

export type CreateImageType = z.infer<typeof createImageSchema>;
export type CreateImagesType = z.infer<typeof createImagesSchema>;

export const updateImagesSchema = createImageSchema.omit({ image: true });

export type UpdateImagesType = z.infer<typeof updateImagesSchema>;
