"use client";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/custom/loading-spinner";
import ImageInput from "@/components/custom/image-input";
import {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Trash, UploadCloud } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn, returnFileSize } from "@/lib/utils";
import useFormErrors from "@/hooks/use-form-errors";
import Image from "next/image";
import useCreateCropertyTempImageFormValidation from "../hooks/use-create-property-temp-image-form-validation";

type Props = {
  id: string;
};

export default function CreatePropertyTempImageFormView({ id }: Props) {
  const objectId = id;
  const {form, onSubmit, isUploading, fieldArray} = useCreateCropertyTempImageFormValidation(objectId)

  const imagesErrors = useFormErrors(form.formState.errors.file, true);

  const renderImages = (
    <div className="overflow-y-scroll max-h-[300px] md:max-h-[400px] border rounded-2xl p-2">
      <div
        className="columns-2 md:columns-2 rounded-2xl gap-0"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        }}
      >
        {fieldArray.fields.map((item, idx) => {
          const fieldState = form.getFieldState(
            `file.${idx}` as const,
            form.formState
          );
          const image = form.getValues("file")[idx];

          return (
            <div key={item.id}>
              <div
                className={cn(
                  "relative overflow-hidden rounded-md w-auto h-fit bg-gray-50 p-1 m-1",
                  fieldState.error && "bg-destructive/5"
                )}
                id={String(idx)}
              >
                <Image
                  src={URL.createObjectURL(image)}
                  height="200"
                  width="200"
                  className="rounded-md border size-full object-contain"
                  alt={image?.name}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => fieldArray.remove(idx)}
                  className="absolute top-1 right-1"
                >
                  <Trash />
                </Button>
                <div className="flex items-start justify-between mt-1">
                  <small className="text-primary/50 text-xs">
                    {returnFileSize(image.size)}
                  </small>
                  <small className="text-primary/50 text-xs">
                    {image.type}
                  </small>
                </div>
                {fieldState.error && (
                  <small className="text-destructive text-xs">
                    {fieldState.error.message}
                  </small>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Dialog>
      <div className="">
        <DialogTrigger asChild>
          <Button variant="outline">
            <UploadCloud />
            Upload Images
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload property images</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <ImageInput
              key={"file"}
              multiple
              {...form.register("file", {
                onChange: (e) => {
                  const files: File[] = Array.from(
                    e.target.files || []
                  ) as File[];
                  files.forEach((file) => fieldArray.append(file));
                  form.trigger("file");
                },
              })}
            />
          </form>
          <DialogHeader>
            <DialogTitle>Images</DialogTitle>
          </DialogHeader>
          {form.getValues('file').length > 0 && renderImages}
          {imagesErrors !== "" && <div>{imagesErrors}</div>}
          <Separator className="md:mys-4" />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button
              type="submit"
              variant="default"
              onClick={onSubmit}
              disabled={
                !form.formState.isValid ||
                isUploading ||
                !!form.formState.errors.file?.message
              }
            >
              {isUploading && <LoadingSpinner />}
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
}
