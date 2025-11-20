import z from "zod";
import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import { isValidObjectId } from "@/lib/object-id";
import { kbToBytes } from "@/lib/utils";
// import { isValidObjectId } from "@/lib/object-id";

export const createPropertySchema = z.object({
  tempId: z.string().refine((value) => isValidObjectId(value), {message: "value is not a valid ObjectId"}),
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(15, { message: "Description is required" }),
  price: z.coerce
    .number<number>()
    .min(500, { message: "Price must be a positive number" }),
  propertySize: z.coerce
    .number<number>()
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: "Must have exactly 2 decimal places" }
    )
    .min(1, { message: "Property size is required" }),
  bedrooms: z.coerce
    .number<number>()
    .min(0, { message: "Bedrooms must be 0 or more" }),
  bathrooms: z.coerce
    .number<number>()
    .min(0, { message: "Bathrooms must be 0 or more" }),
  garage: z.coerce
    .number<number>()
    .min(0, { message: "Garage must be 0 or more" }),
  garageSize: z.coerce
    .number<number>()
    .refine(
      (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
      { message: "Must have exactly 2 decimal places" }
    )
    .min(0, { message: "Garage size is required" }),
  yearBuilt: z.coerce
    .number<number>()
    .min(1800, { message: "Year built is required" })
    .max(2050, { message: "Your built must be lower than 2025" }),
  propertyType: z.enum(Object.values(PROPERTY_TYPE)),
  propertyStatus: z.enum(Object.values(PROPERTY_STATUS)),
  features: z.string().optional(),
  hide: z.boolean(),
  video: z.string().optional(),
  address: z.object({
    // add places data
    country: z.string().min(1, { message: "Country is required" }),
    state: z.string().min(1, { message: "State is required" }),
    city: z.string().min(1, { message: "City is required" }),
    area: z.string().min(1, { message: "Area is required" }),
    zipCode: z.string().min(1, { message: "Zip code is required" }),
    other: z.string().optional(),
  }),
});

export type CreatePropertyType = z.infer<typeof createPropertySchema>;

export const createPropertyTempImageSchema = z.object({
  tempId: z.string().refine((v) => isValidObjectId(v)),
  file: z
    .array(
      z
        .file()
        .max(kbToBytes(1024 * 2), "maximum size is 500KB")
        .mime(
          ["image/webp", "image/jpeg"],
          "only accept .webp and .jpeg image types"
        )
    )
    .max(10, "upload maximum 4 images"),
  // file: z.array(z.instanceof(File)), // more correct for form file input
});
export type CreatePropertyTempImageType = z.infer<typeof createPropertyTempImageSchema>;
