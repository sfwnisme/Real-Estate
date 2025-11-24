"use client";

import InputWrapper from "@/components/custom/input-wrapper";
import { Input } from "@/components/ui/input";
import React, { memo } from "react";
import slugify from "slugify";
import useUpdatePropertySlugFormValidation from "../../hooks/use-update-property-slug-form-validation";
import { Property } from "@/types/types";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  property: Property;
};
const UpdatePropertySlugFormView = (props: Props) => {
  const { property } = props;
  const { form, onSubmit, isPending } = useUpdatePropertySlugFormValidation(
    property._id,
    property.slug
  );
  const router = useRouter();
  const currentSlug = property.slug
  const newSlug = slugify(form.watch("slug"), { lower: true });
  const isSlugChanged = currentSlug !== newSlug
  console.log("isSlugChanged", {isSlugChanged, currentSlug, newSlug});
  const isDefaultSlug = property.title === form.watch("slug");
  // Convert slug to normal text (replace "-" with space and capitalize words)
  console.log("TRIGGER: slug");

  return (
    <form onSubmit={onSubmit}>
      <InputWrapper
        // title="Slug"
        description={
          process.env.NEXT_PUBLIC_BASE_URL +
          "/properties/" +
          slugify(form.getValues("slug"), { lower: true })
        }
        childrenClassName="flex flex-row"
      >
        <Input type="text" {...form.register("slug")} />
      </InputWrapper>
      <ButtonGroup>
        <Button type="submit" disabled={isPending || !isSlugChanged}>
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          Update Slug
        </Button>
        <ButtonGroupSeparator />
        <Button
          type="button"
          variant="outline"
          onClick={() => form.setValue("slug", property.title)}
          disabled={isPending || isDefaultSlug}
          title={
            isDefaultSlug
              ? "This is the default slug"
              : "set the property title as the slug"
              
          }
          aria-label="reset to default slug"
        >
          Use Default
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() =>
            router.push(
              `/properties/${property.slug}`
            )
          }
          aria-label="visit property"
          title="Visit property"
        >
          Visit
        </Button>
      </ButtonGroup>
    </form>
  );
};

export default memo(UpdatePropertySlugFormView);
