import z from "zod";
import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import { CreatePropertyWithImagesSchema } from "./create-property-with-images-schema";
import { UpdateImagesSchema } from "./image-schema";


export const UpdatePropertySchema = CreatePropertyWithImagesSchema.omit({
  images: true
}).partial();
export type UpdatePropertyType = z.infer<typeof UpdatePropertySchema>;
