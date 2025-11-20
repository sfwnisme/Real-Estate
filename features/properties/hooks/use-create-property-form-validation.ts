"use client";
import { useRef, useTransition } from "react";
import { useForm, type SubmitHandler, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createProperty } from "@/features/properties/lib/requests";
import { toast } from "sonner";
import { generateObjectId } from "@/lib/object-id";
import { STATUS_TEXT } from "@/constants/enums";
import {
  CreatePropertyType,
  createPropertySchema,
} from "../schema/create-property-schema";

export default function useCreatePropertyFormValidation() {
  const [isPending, startTransition] = useTransition();
  const tempIdRef = useRef<string>(generateObjectId());
  const objectId = tempIdRef.current;

  const form = useForm<CreatePropertyType>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      tempId: objectId,
      title: "",
      description: "",
      price: 0,
      propertySize: 0,
      bedrooms: 0,
      bathrooms: 0,
      garage: 0,
      garageSize: 0,
      yearBuilt: new Date().getFullYear(),
      features: "",
      hide: false,
      address: {
        country: "",
        state: "",
        city: "",
        area: "",
        zipCode: "",
        other: "",
      },
    },
    mode: "all",
  });

  console.log("get temp Id value>>>>>", form.getValues("tempId"));

  const onSubmit: SubmitHandler<CreatePropertyType> = (values) => {
    startTransition(async () => {
      try {
        const create = await createProperty(values);
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
