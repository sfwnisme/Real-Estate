"use client";
import { useRef, useTransition } from "react";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProperty } from "@/features/properties/lib/requests";
import { toast } from "sonner";
import {
  UpdatePropertyType,
  updatePropertySchema,
} from "../schema/update-property-schema";
import { generateObjectId } from "@/lib/object-id";
import { STATUS_TEXT } from "@/constants/enums";
import { Property } from "@/types/types";

export default function useUpdatePropertyFormValidation(
  property: Omit<Property, "tempId">
) {
  const [isPending, startTransition] = useTransition();
  const tempIdRef = useRef<string>(generateObjectId());
  const objectId = tempIdRef.current;

  const {
    _id,
    title,
    description,
    price,
    propertySize,
    propertyStatus,
    propertyType,
    bedrooms,
    bathrooms,
    garage,
    garageSize,
    yearBuilt,
    features,
    hide,
    address: { country, state, city, area, zipCode, other },
  } = property;

  const form = useForm<UpdatePropertyType>({
    resolver: zodResolver(updatePropertySchema),
    defaultValues: {
      title,
      description,
      price,
      propertySize,
      propertyStatus,
      propertyType,
      bedrooms,
      bathrooms,
      garage,
      garageSize,
      yearBuilt,
      features,
      hide,
      address: {
        country,
        state,
        city,
        area,
        zipCode,
        other,
      },
    },
    mode: "all",
  });


  const onSubmit: SubmitHandler<UpdatePropertyType> = (values) => {
    startTransition(async () => {
      try {
        const create = await updateProperty(values, _id);
        console.log("create property", create);
        if (create.statusText !== STATUS_TEXT.SUCCESS) {
          toast.error(`${values.title} ${create.msg?.[0].field || create.msg}`);
        } else {
          toast.success(`${values.title} ${create.msg}`);
        }
      } catch (error) {
        console.error("Error creating property:", error);
      }
    });
  };
  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    objectId: objectId,
    isPending,
  };
}
