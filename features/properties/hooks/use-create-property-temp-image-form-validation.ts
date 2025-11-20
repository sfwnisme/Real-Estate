import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react'
import { FieldArrayPath, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createTempPropertyImage } from '../lib/requests';
import { STATUS_TEXT } from '@/constants/enums';
import { CreatePropertyTempImageType, createPropertyTempImageSchema } from '../schema/update-property-schema';

export default function useCreateCropertyTempImageFormValidation(objectId: string) {
  const [isUploading, startUploading] = useTransition()
  const form = useForm<CreatePropertyTempImageType>({
    resolver: zodResolver(createPropertyTempImageSchema),
    defaultValues: {
      tempId: objectId,
      file: [],
    },
    mode: "all",
  });

  const fieldArray = useFieldArray({
    name: "file" as FieldArrayPath<CreatePropertyTempImageType>,
    control: form.control,
  });


  const onSubmit: SubmitHandler<CreatePropertyTempImageType> = async (
    values
  ) => {
    const files = values.file;
    try {
      if (!files || files.length === 0) {
        toast.error("No images selected.");
        return;
      }
      startUploading(async () => {
        for (const image of files) {
          const FD = new FormData();
          FD.append("tempId", values.tempId);
          FD.append("file", image);
          const create = await createTempPropertyImage(FD);
          if (create.statusText !== STATUS_TEXT.SUCCESS) {
            form.setError("file", { type: "too large", message: create.msg });
            toast.error(
              typeof create.msg === "string"
                ? create.msg
                : create.msg?.[0]?.field || "Upload error"
            );
          } else {
            const newFiles = form.getValues("file").filter((f) => f !== image);
            form.setValue("file", newFiles, { shouldValidate: true });
            toast.success(`${image.name} uploaded: ${create.msg}`);
          }
        }
      });
    } catch (error) {
      console.error("Error creating property:", error);
    }
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isUploading,
    fieldArray,
  }
}