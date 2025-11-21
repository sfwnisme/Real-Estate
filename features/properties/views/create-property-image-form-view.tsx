import React, { useCallback, useMemo, useEffect } from "react";
import ImageInput from "@/components/custom/image-input";
import { cn, returnFileSize } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash, Trash2 } from "lucide-react";
import { FieldArrayPath, UseFormReturn, useFieldArray } from "react-hook-form";
import { CreatePropertyWithImagesType } from "../schema/create-property-with-images-schema";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import InputWrapper from "@/components/custom/input-wrapper";

type Props = {
  form: UseFormReturn<CreatePropertyWithImagesType>;
};

const CreatePropertyImageFormView = (props: Props) => {
  console.log("UPLOAD IMAGE COMPONENT FIRED");
  const { form } = props;
  const fieldArray = useFieldArray({
    name: "images" as FieldArrayPath<
      Pick<CreatePropertyWithImagesType, "images">
    >,
    control: form.control,
  });

  // Subscribe to form state properly
  const { errors } = form.formState;
  const globalImagesError = errors.images?.message;
  const imagesFieldErrors = errors.images;

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []) as File[];
      if (files.length === 0) {
        e.target.value = "";
        return;
      }
      files.forEach((file) =>
        fieldArray.append({ image: file, isFeatured: false })
      );
      e.target.value = "";
      form.trigger("images");
    },
    [fieldArray, form]
  );

  const removeImage = useCallback(
    (idx: number) => {
      fieldArray.remove(idx);
    },
    [fieldArray]
  );
  const handleSetFeaturedImage = useCallback(
    (idx: number) => {
      fieldArray.fields.forEach((field, fieldIndex) => {
        fieldArray.update(fieldIndex, {
          ...form.getValues(`images.${fieldIndex}`),
          isFeatured: false,
        });
      });
      fieldArray.update(idx, {
        ...form.getValues(`images.${idx}`),
        isFeatured: true,
      });
    },
    [fieldArray, form]
  );
  console.log("images error", globalImagesError);
  console.log("images field errors", imagesFieldErrors);

  // Auto-trigger validation whenever the fields change
  // useEffect(() => {
  //   if (fieldArray.fields.length > 0) {
  //     form.trigger("images");
  //   }
  // }, [fieldArray.fields.length, form]);

  const renderImages = useMemo(() => {
    return (
      <div className="overflow-y-scroll w-full max-h-[300px] md:max-h-[400px] border-y py-2 flex flex-col">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 rounded-2xl gap-2 w-full">
          {fieldArray.fields.length !== 0 &&
            fieldArray.fields.map((item, idx) => {
              const imageError =
                (Array.isArray(imagesFieldErrors) &&
                  imagesFieldErrors[idx]?.image?.message) ||
                undefined;

              const image = form.getValues(`images.${idx}`);

              const isFeatured = fieldArray.fields?.[idx]?.isFeatured;
              const isGlobalError = !!globalImagesError;
              const isImageError = !!imageError;
              const isDisabled = isGlobalError || isImageError;

              return (
                <div key={item.id} className="flex w-full" id={String(idx)}>
                  <div
                    className={cn(
                      "relative overflow-hidden border rounded-md flex flex-col gap-2 size-full p-2",
                      imageError && "border-destructive/50"
                    )}
                    id={String(idx)}
                  >
                    <div className="flex gap-4 items-start h-full">
                      <div className="aspect-video max-w-30 md:max-w-40 w-full">
                        <Image
                          src={URL.createObjectURL(image?.image)}
                          height="200"
                          width="200"
                          className="rounded-md size-full object-cover"
                          alt={image?.image.name}
                          priority
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-end h-full">
                        <div className="flex w-full justify-between items-center">
                          <small>{image?.image.name}</small>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeImage(idx)}
                            className="text-2xl"
                          >
                            <Trash2 size={23} />
                          </Button>
                        </div>
                        <div className="flex gap-2 flex-1">
                          <small className="text-primary/50 text-xs">
                            {returnFileSize(image?.image.size)}
                          </small>
                          <small className="text-primary/50 text-xs uppercase">
                            {image?.image.type.split("/")[1]}
                          </small>
                        </div>
                        {/* <div className="">
                          {typeof imageError === "string" &&
                            imageError !== "" && (
                              <small className="text-destructive text-xs leading-tight flex">
                                {imageError}
                              </small>
                            )}
                        </div> */}
                      </div>
                    </div>
                    <div className={cn("flex flex-col justify-between gap-2")}>
                      <Separator />
                      {!isImageError ? (
                        <Label
                          className={cn(
                            "flex items-center gap-1",
                            isDisabled && "opacity-20 cursor-not-allowed!"
                          )}
                        >
                          <Checkbox
                            id="toggle-2"
                            className={cn(
                              "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary disabled:cursor-not-allowed!"
                            )}
                            checked={isFeatured}
                            onCheckedChange={() => handleSetFeaturedImage(idx)}
                            disabled={isDisabled}
                          />

                          <div className="grid gap-1.5 font-normal">
                            <small className="text-muted-foreground text-sm">
                              Set as main image
                            </small>
                          </div>
                        </Label>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <small className="text-destructive text-xs leading-tight flex">
                            {imageError}
                          </small>
                          <small className="text-xs text-destructive">
                            Delete image or upload new image
                          </small>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }, [
    fieldArray.fields,
    imagesFieldErrors,
    handleSetFeaturedImage,
    removeImage,
    form,
  ]);

  return (
    <div>
      <InputWrapper title="Images" error={globalImagesError}>
        <ImageInput
          // {...form.register("images", {
          //   // onChange: (e) => {
          //   //   const files: File[] = e.target.files || [];
          //   //   const filesArray = Array.from(files) as File[];
          //   //   if (filesArray.length === 0) {
          //   //     e.target.value = "";
          //   //     return;
          //   //   }
          //   //   filesArray.forEach((file) =>
          //   //     fieldArray.append({ image: file, isFeatured: false })
          //   //   );
          //   //   e.target.value = "";
          //   // },
          // })}
          onChange={(e) => handleImageChange(e)}
          accept="image/*"
          multiple
          className="h-full"
        />
      </InputWrapper>
      {fieldArray.fields.length > 0 && (
        <div className="col-span-full mt-4">{renderImages}</div>
      )}
    </div>
  );
};

// Remove memo to ensure component re-renders when errors change
export default CreatePropertyImageFormView;
