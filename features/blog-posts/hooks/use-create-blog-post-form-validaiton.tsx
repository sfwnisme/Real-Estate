import React, { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateBlogPostSchema,
  CreateBlogPostType,
} from "../schema/blog-post-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BLOG_POST_STATUS } from "@/constants/enums";
import { createBlogPost, createBlogPostImage } from "../lib/requests";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/**
 * Provides a validated form and submission handler for creating blog posts, including optional image upload, error reporting, and navigation.
 *
 * Handles form validation, submits blog post data to the API, conditionally uploads an image, registers form field or root errors on failure, displays toast notifications, and navigates to the created post on success.
 *
 * @returns An object containing:
 * - `form`: the React Hook Form instance configured for creating blog posts.
 * - `onSubmit`: a submit handler already bound to the form.
 * - `isPending`: a boolean that is `true` while submission is in progress.
 */
export default function useCreateBlogPostFormValidation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CreateBlogPostType>({
    resolver: zodResolver(CreateBlogPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      status: BLOG_POST_STATUS.DRAFT,
      meta: {
        title: "",
        description: "",
        keywords: "",
      },
      image: null,
    },
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<CreateBlogPostType> = async (data) => {
    startTransition(async () => {
      const { image, ...rest } = data;
      const isImageExist = !!image;
      const createBlogPostRes = await createBlogPost(rest);
      if (!createBlogPostRes.data) {
        form.setError("root", {
          type: "root error",
          message: createBlogPostRes.msg,
        });
        console.log(createBlogPostRes);
        const msg = createBlogPostRes.msg;
        form.setError(msg.path, {type: msg.type, message: msg.msg});
        toast.error(msg.msg);
        return;
      }
      const blogPostId = createBlogPostRes.data._id;
      const blogPostSlug = createBlogPostRes.data.slug;
      toast.success(createBlogPostRes.msg + (isImageExist && " without image"));

      if (!isImageExist) {
        router.push(`/blog-posts/${blogPostSlug}`);
        return;
      }

      toast.promise(createBlogPostImage(image, blogPostId), {
        loading: "Creating blog post image...",
        success: (data) => {
          router.push(`/blog-posts/${blogPostSlug}`);
          return "Blog post image created successfully"
        },
        error: (err) => {
          form.setError("image", {
            type: "image error",
            message: JSON.stringify(err.msg),
          });
          return JSON.stringify(err.msg);
        },
      });
    });
  };
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isPending,
  };
}