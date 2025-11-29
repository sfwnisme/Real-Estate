import { BLOG_POST_STATUS } from "@/constants/enums";
import {
  ImageSchema,
} from "@/features/properties/schema/image-schema";
import { z } from "zod";

const MetadataSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  keywords: z.string().min(1, { message: "Keywords are required" }),
});

export const CreateBlogPostSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  excerpt: z.string().min(20, { message: "Excerpt is required" }),
  content: z.string().min(10, { message: "Content is required" }),
  status: z.enum(Object.values(BLOG_POST_STATUS)),
  meta: MetadataSchema,
  image: ImageSchema.nullable().optional(),
});
export type CreateBlogPostType = z.infer<typeof CreateBlogPostSchema>;

// update blog post schema
export const UpdateBlogPostSchema = CreateBlogPostSchema.partial().omit({
  image: true,
});
export type UpdateBlogPostType = z.infer<typeof UpdateBlogPostSchema>;
