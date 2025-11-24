import { cn } from "@/lib/utils";
import { ImageType } from "@/types/types";
import { Trash } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";

type Props = {
  errorsList: any;
  form: any;
  remove: any
};

export default function ImagesListView(props: Props) {
  const images = props.form.form.watch(props.form.field);
  const field = props.form.field;
  const errors = props.form.form.formState.errors?.[props.form.field];

  const returnNewImages = async (id: number) => {
    props.remove(id)
    await props.form.form.trigger(field)
};

  console.log("retnred error================= ", errors);

  const renderImages = useMemo(
    () =>
      images.map((img, idx) => (
        <div
          className={cn(
            "relative overflow-hidden rounded-md w-auto h-fit bg-gray-50 p-1 m-1",
            props.errorsList?.[idx]?.message && "bg-destructive/5"
          )}
          key={img?.name}
          id={String(idx)}
        >
          <Image
            src={URL.createObjectURL(img)}
            height="200"
            width="200"
            className="rounded-md border size-full object-contain"
            alt={img?.name}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => returnNewImages(idx)}
            className="absolute top-1 right-1"
          >
            <Trash />
          </Button>
          <small className="text-destructive text-xs">
            {/* {errors?.[idx]?.message} */}
            {props.errorsList?.[idx]?.message}
          </small>
        </div>
      )),
    [images]
  );

  return (
    images.length > 0 && (
      <div
        className="columns-2 md:columns-2 rounded-2xl gap-0"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))" }}
      >
        {renderImages}
      </div>
    )
  );
}
