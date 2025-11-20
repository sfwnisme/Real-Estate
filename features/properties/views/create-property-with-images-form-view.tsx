"use client";
import React, { memo } from "react";
import { DevTool } from "@hookform/devtools";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { PROPERTY_STATUS, PROPERTY_TYPE } from "@/constants/enums";
import useCreatePropertyWithImagesFormValidation from "../hooks/use-create-property-with-images-form-validation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CreatePropertyImageFormView from "./create-property-image-form-view";

const CreatePropertyWithImagesFormView = () =>  {
  const { form, onSubmit, isPending } =
    useCreatePropertyWithImagesFormValidation();
  const formErrors = form.formState.errors;
  const globalImagesError = form.formState.errors.images?.message;

  return (
    <div>
      <div className="h-8" />
      <form onSubmit={onSubmit} className="grid gap-4">
        <div
          className="flex flex-col gap-4"
          group-data="main-property-information"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputWrapper
              title="Title"
              error={formErrors.title?.message}
              className=""
            >
              <Input type="text" {...form.register("title")} />
            </InputWrapper>
            <InputWrapper
              title="Price"
              error={formErrors.price?.message}
              className=""
            >
              <Input type="number" {...form.register("price")} />
            </InputWrapper>

            <InputWrapper
              title="Description"
              description="property description at lease 5 characters"
              error={formErrors.description?.message}
              className="col-span-full"
            >
              <Textarea {...form.register("description")} />
            </InputWrapper>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 col-span-full p-4 border rounded-2xl">
            <InputWrapper
              title="Property size"
              error={formErrors.propertySize?.message}
            >
              <Input type="number" {...form.register("propertySize")} />
            </InputWrapper>
            <InputWrapper title="Bedrooms" error={formErrors.bedrooms?.message}>
              <Input type="number" {...form.register("bedrooms")} />
            </InputWrapper>
            <InputWrapper
              title="Bathrooms"
              error={formErrors.bathrooms?.message}
            >
              <Input type="number" {...form.register("bathrooms")} />
            </InputWrapper>
            <InputWrapper title="Garage" error={formErrors.garage?.message}>
              <Input type="number" {...form.register("garage")} />
            </InputWrapper>
            <InputWrapper
              title="Garage size"
              error={formErrors.garageSize?.message}
            >
              <Input type="number" {...form.register("garageSize")} />
            </InputWrapper>
            <InputWrapper
              title="Year built"
              error={formErrors.yearBuilt?.message}
            >
              <Input type="number" {...form.register("yearBuilt")} />
            </InputWrapper>
            <InputWrapper title="Type" error={formErrors.propertyType?.message}>
              <Controller
                name="propertyType"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PROPERTY_TYPE).map((type) => (
                        <SelectItem value={type} key={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </InputWrapper>
            <InputWrapper
              title="status"
              error={formErrors.propertyStatus?.message}
            >
              <Controller
                name="propertyStatus"
                control={form.control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(PROPERTY_STATUS).map((status) => (
                        <SelectItem value={status} key={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </InputWrapper>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 border rounded-2xl">
            <InputWrapper
              title="State"
              error={formErrors.address?.state?.message}
              className=""
            >
              <Input type="text" {...form.register("address.state")} />
            </InputWrapper>
            <InputWrapper
              title="City"
              error={formErrors.address?.city?.message}
              className=""
            >
              <Input type="text" {...form.register("address.city")} />
            </InputWrapper>
            <InputWrapper
              title="Area"
              error={formErrors.address?.area?.message}
              className=""
            >
              <Input type="text" {...form.register("address.area")} />
            </InputWrapper>
            <InputWrapper
              title="Zip code"
              error={formErrors.address?.zipCode?.message}
              className=""
            >
              <Input type="text" {...form.register("address.zipCode")} />
            </InputWrapper>
            <InputWrapper
              title="Other"
              error={formErrors.address?.other?.message}
              className="col-span-full lg:col-span-2"
            >
              <Input type="text" {...form.register("address.other")} />
            </InputWrapper>
          </div>
          <div className="grid gap-4 col-span-full p-4 border rounded-2xl">
            <div className="flex flex-col gap-4">
              <div className="col-span-">
                <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-primary has-[[aria-checked=true]]:bg-primary/5 dark:has-[[aria-checked=true]]:border-primary dark:has-[[aria-checked=true]]:bg-primary">
                  <Checkbox
                    id="toggle-2"
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                    onCheckedChange={(value: boolean) =>
                      form.setValue("hide", value)
                    }
                  />
                  <div className="grid gap-1.5 font-normal">
                    <p className="text-sm leading-none font-medium">
                      Hide property listing
                    </p>
                    <small className="text-muted-foreground">
                      Hide this property form public listing
                    </small>
                  </div>
                </Label>
              </div>

              <InputWrapper
                title="Features"
                className="col-span-full"
                description="adding (,) after every feature is a must i.e. 'Pool, Garden, Red Sea, International resturants and cafés' "
                disableError
              >
                <Input type="text" {...form.register("features")} />
              </InputWrapper>
              <InputWrapper
                title="Video"
                error={formErrors.video?.message}
                disableError
                description="Youtube: go to the video > share > copy embed cod"
                className=""
              >
                <Input
                  type="text"
                  {...form.register("video")}
                  placeholder="https://www.youtube.com/embed/videoCodeHere"
                />
              </InputWrapper>
            </div>
          </div>
        </div>
        <CreatePropertyImageFormView form={form} />
        <Alert
          variant="destructive"
          className={cn(
            "invisible",
            typeof form.formState.errors.root?.message === "string" &&
              globalImagesError !== "" &&
              "visible"
          )}
        >
          <AlertDescription>
            {form.formState.errors.root?.message}
          </AlertDescription>
        </Alert>
        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? "Creating..." : "Create"}
        </Button>
        <DevTool control={form.control} />
      </form>
    </div>
  );
}
export default memo(CreatePropertyWithImagesFormView)
