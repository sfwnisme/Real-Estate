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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputWrapper from "@/components/custom/input-wrapper";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Property } from "@/types/types";
import useUpdatePropertyFormValidation from "../../hooks/use-update-property-form-validation";
import FieldSet from "@/components/custom/field-set";
import LoadingSpinner from "@/components/custom/loading-spinner";

type Props = {
  property: Property;
};

const UpdatePropertyFormView = (props: Props) => {
  const { property } = props;
  const { form, onSubmit, isPending } =
    useUpdatePropertyFormValidation(property);
  const formErrors = form.formState.errors;
  const globalError = form.formState.errors.root?.message;

  const isValueChanged = form.formState.isDirty;
  const isValid = form.formState.isValid;
  const canUpdate = isValueChanged && isValid && !isPending;
  console.log("TRIGGER: property-form");

  return (
    <div>
      <form onSubmit={onSubmit} className="grid lg:gap-4">
        <div
          className="grid grid-cols-2 gap-4"
          group-data="main-property-information"
        >
          <div className="col-span-full">
            <FieldSet
              title="Property details"
              description="Update the details of the property"
              childrenClassName="grid gap-4 grid-cols-2"
            >
              <InputWrapper
                title="Title"
                error={formErrors.title?.message}
                className="col-span-full"
                name="title"
              >
                <Input type="text" {...form.register("title")} />
              </InputWrapper>

              <InputWrapper
                title="Description"
                description="property description at lease 5 characters"
                error={formErrors.description?.message}
                className="col-span-full"
              >
                <Textarea id="description" {...form.register("description")} />
              </InputWrapper>
              <InputWrapper
                title="Price"
                error={formErrors.price?.message}
                className=""
              >
                <Input type="number" id="price" {...form.register("price")} />
              </InputWrapper>
              <InputWrapper
                title="Property size"
                error={formErrors.propertySize?.message}
              >
                <Input
                  type="number"
                  id="propertySize"
                  {...form.register("propertySize")}
                />
              </InputWrapper>
            </FieldSet>
          </div>
          <div className="col-span-full sm:col-span-1">
            <FieldSet
              title="Specifications"
              description="Update the specifications of the property"
              childrenClassName="grid grid-cols-2 gap-4"
            >
              <InputWrapper
                title="Bedrooms"
                error={formErrors.bedrooms?.message}
              >
                <Input
                  type="number"
                  id="bedrooms"
                  {...form.register("bedrooms")}
                />
              </InputWrapper>
              <InputWrapper
                title="Bathrooms"
                error={formErrors.bathrooms?.message}
              >
                <Input
                  type="number"
                  id="bathrooms"
                  {...form.register("bathrooms")}
                />
              </InputWrapper>
              <InputWrapper title="Garage" error={formErrors.garage?.message}>
                <Input type="number" id="garage" {...form.register("garage")} />
              </InputWrapper>
              <InputWrapper
                title="Garage size"
                error={formErrors.garageSize?.message}
              >
                <Input
                  type="number"
                  id="garageSize"
                  {...form.register("garageSize")}
                />
              </InputWrapper>
              <InputWrapper
                title="Year built"
                error={formErrors.yearBuilt?.message}
                className="col-span-full"
              >
                <Input
                  type="number"
                  id="yearBuilt"
                  {...form.register("yearBuilt")}
                />
              </InputWrapper>
            </FieldSet>
          </div>
          <FieldSet
            title="Classification"
            description="Update the classification of the property"
            childrenClassName="grid gap-4"
            className="col-span-full sm:col-span-1"
          >
            <InputWrapper title="Type" error={formErrors.propertyType?.message}>
              <Controller
                name="propertyType"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name="propertyType"
                  >
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
              title="Status"
              error={formErrors.propertyStatus?.message}
            >
              <Controller
                name="propertyStatus"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    name="propertyStatus"
                  >
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
            <Label className="flex items-start gap-3 rounded-lg cursor-pointer">
              <Checkbox
                name="hide"
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
          </FieldSet>
          <FieldSet
            title="Address"
            description="Update the address of the property"
            className="col-span-full"
            childrenClassName="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4"
          >
            <InputWrapper
              title="State"
              error={formErrors.address?.state?.message}
            >
              <Input
                type="text"
                id="address.state"
                {...form.register("address.state")}
              />
            </InputWrapper>
            <InputWrapper
              title="City"
              error={formErrors.address?.city?.message}
            >
              <Input
                type="text"
                id="address.city"
                {...form.register("address.city")}
              />
            </InputWrapper>
            <InputWrapper
              title="Area"
              error={formErrors.address?.area?.message}
            >
              <Input
                type="text"
                id="address.area"
                {...form.register("address.area")}
              />
            </InputWrapper>
            <InputWrapper
              title="Zip code"
              error={formErrors.address?.zipCode?.message}
            >
              <Input
                type="text"
                id="address.zipCode"
                {...form.register("address.zipCode")}
              />
            </InputWrapper>
            <InputWrapper
              title="Other"
              error={formErrors.address?.other?.message}
              className="col-span-full sm:col-span-2 lg:col-span-2"
            >
              <Input
                type="text"
                id="address.other"
                {...form.register("address.other")}
              />
            </InputWrapper>
          </FieldSet>
          <FieldSet
            title="More information"
            description="Update the more information of the property"
            childrenClassName="grid gap-4"
            className="col-span-full"
          >
            <InputWrapper
              title="Features"
              description="adding (,) after every feature is a must i.e. 'Pool, Garden, Red Sea, International resturants and cafés' "
              disableError
            >
              <Input type="text" id="features" {...form.register("features")} />
            </InputWrapper>
            <InputWrapper
              title="Video"
              error={formErrors.video?.message}
              disableError
              description="Youtube: go to the video > share > copy embed code"
            >
              <Input
                type="text"
                id="video"
                {...form.register("video")}
                placeholder="https://www.youtube.com/embed/videoCodeHere"
              />
            </InputWrapper>
          </FieldSet>
        </div>
        <Alert
          variant="destructive"
          className={cn(
            "invisible",
            typeof globalError === "string" && globalError !== "" && "visible"
          )}
        >
          <AlertDescription>{globalError}</AlertDescription>
        </Alert>
        <Button type="submit" className="w-full" disabled={!canUpdate}>
          {isPending && <LoadingSpinner />}Update property details
        </Button>
        <DevTool control={form.control} />
      </form>
    </div>
  );
};
export default memo(UpdatePropertyFormView);
