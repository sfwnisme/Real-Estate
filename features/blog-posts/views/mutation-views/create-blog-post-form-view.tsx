"use client";
import React from "react";
import useCreateBlogPostFormValidation from "../../hooks/use-create-blog-post-form-validaiton";
import FieldSet from "@/components/custom/field-set";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fromTheme } from "tailwind-merge";
import { BLOG_POST_STATUS } from "@/constants/enums";
import { BlogPostStatus } from "@/types/types";
import { Separator } from "@/components/ui/separator";
import ImageInput from "@/components/custom/image-input";
import { useFieldArray } from "react-hook-form";
import Image from "next/image";
import ImagePreview from "@/components/custom/image-preview";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/loading-spinner";
type Props = {};

export default function CreateBlogPostFormView({}: Props) {
  const { form, onSubmit, isPending } = useCreateBlogPostFormValidation();
  const image = form.watch("image");
  const imageUrl = image
    ? URL.createObjectURL(form.watch("image") as File)
    : "";
  console.log(form.watch());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      form.setValue("image", files[0]);
    }
    return null;
  };

  const handleDeleteImage = () => {
    form.setValue("image", null);
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full min-w-[500px] flex-1">
          <FieldSet title="title" variant="container">
            <InputWrapper
              title="Title"
              error={form.formState.errors.title?.message}
            >
              <Input type="text" {...form.register("title")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title="excerpt" variant="container">
            <InputWrapper
              title="Excerpt"
              error={form.formState.errors.excerpt?.message}
            >
              <Input type="text" {...form.register("excerpt")} />
            </InputWrapper>
          </FieldSet>
          <FieldSet title="content" variant="container">
            <InputWrapper
              title="Content"
              error={form.formState.errors.content?.message}
            >
              <Textarea
                className="min-h-[200px] wrap-break-word"
                {...form.register("content")}
              />
            </InputWrapper>
          </FieldSet>
          <Button type="submit" disabled={isPending || !form.formState.isValid} className="hidden lg:block">
            {isPending && <LoadingSpinner />}Create Blog Post
          </Button>
        </div>
        <div className="flex flex-col gap-4 w-full lg:max-w-[400px]">
          <FieldSet title="SEO settings" childrenClassName="grid gap-4">
            <InputWrapper
              title="Status"
              error={form.formState.errors.status?.message}
            >
              <Select
                value={form.getValues("status")}
                onValueChange={(v: BlogPostStatus) =>
                  form.setValue("status", v)
                }
                name="blogPostStatus"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(BLOG_POST_STATUS).map((status) => (
                    <SelectItem value={status} key={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </InputWrapper>
            <Separator />
            <InputWrapper
              title="Meta Title"
              error={form.formState.errors.meta?.title?.message}
            >
              <Input
                type="text"
                {...form.register("meta.title")}
                placeholder="Meta Title"
              />
            </InputWrapper>
            <InputWrapper
              title="Meta Description"
              error={form.formState.errors.meta?.description?.message}
            >
              <Textarea
                className="min-h-[100px]"
                {...form.register("meta.description")}
                placeholder="Meta Description"
              />
            </InputWrapper>
            <InputWrapper
              title="Meta Keywords"
              error={form.formState.errors.meta?.keywords?.message}
            >
              <Input
                type="text"
                {...form.register("meta.keywords")}
                placeholder="Meta Keywords"
              />
            </InputWrapper>
          </FieldSet>
          <FieldSet title="Featured Image">
            {image ? (
              <div>
                <ImagePreview
                  isFeatured={false}
                  imageUrl={imageUrl}
                  imageType={image?.type}
                  imageSize={image?.size}
                  disableSetFeaturedImage={true}
                  deleteImage={handleDeleteImage}
                />
              </div>
            ) : (
              <InputWrapper error={form.formState.errors.image?.message}>
                <ImageInput onChange={handleImageChange} />
              </InputWrapper>
            )}
          </FieldSet>
          <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full lg:hidden">
            {isPending && <LoadingSpinner />}Create Blog Post
          </Button>
        </div>
      </form>
    </div>
  );
}
