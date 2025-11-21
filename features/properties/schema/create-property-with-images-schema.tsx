import z from "zod";
import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import { createImagesSchema } from "./image-schema";

export const createPropertyWithImagesSchema = z.object({
  title: z.string().min(3, { message: "field is required" }),
  description: z.string().min(15, { message: "field is required" }),
  price: z.coerce
    .number<number>()
    .min(500, { message: "field must be a positive number" }),
  propertySize: z.coerce
    .number<number>()
    .min(1, { message: "field is required" })
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: "Must have exactly 2 decimal places" }
    ),
  bedrooms: z.coerce
    .number<number>()
    .min(0, { message: "field must be 0 or more" }),
  bathrooms: z.coerce
    .number<number>()
    .min(0, { message: "field must be 0 or more" }),
  garage: z.coerce
    .number<number>()
    .min(0, { message: "field must be 0 or more" }),
  garageSize: z.coerce
    .number<number>()
    .min(0, { message: "field is required" })
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: "Must have exactly 2 decimal places" }
    ),
  yearBuilt: z.coerce
    .number<number>()
    .min(1800, { message: "field is required" })
    .max(2050, { message: "field must be lower than 2025" }),
  propertyType: z.enum(Object.values(PROPERTY_TYPE)),
  propertyStatus: z.enum(Object.values(PROPERTY_STATUS)),
  features: z.string().optional(),
  hide: z.boolean(),
  video: z.string().optional(),
  address: z.object({
    // add places data
    country: z.string().min(1, { message: "field is required" }).optional(),
    state: z.string().min(1, { message: "field is required" }).optional(),
    city: z.string().min(1, { message: "field is required" }).optional(),
    area: z.string().min(1, { message: "field is required" }).optional(),
    zipCode: z.string().min(1, { message: "field is required" }).optional(),
    other: z.string().optional(),
  }),
  images: createImagesSchema,
});

export type CreatePropertyWithImagesType = z.infer<
  typeof createPropertyWithImagesSchema
>;

export type CreatePropertyWithImagesInputType = z.input<
  typeof createPropertyWithImagesSchema
>;
export type CreatePropertyWithImagesOutputType = z.output<
  typeof createPropertyWithImagesSchema
>;
