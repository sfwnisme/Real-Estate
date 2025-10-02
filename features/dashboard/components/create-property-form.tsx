"use client"
import React, { useTransition } from 'react'
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { createProperty } from '@/firebase.conf'
import { toast } from 'sonner'

// const formSchema = z.object({
//   username: z.string().min(2, { message: "Hell no, what you did? at least you have to write two characters dude" }).max(5),
// })
const formSchema = z.object({
  title: z.string().min(5, { message: "Title is required" }),
  price: z.coerce.number<number>().min(500, { message: "Price must be a positive number" }),
  description: z.string().min(5, { message: "Description is required" }),
  propertySize: z.coerce.number<number>().refine(
    (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
    { message: "Must have exactly 2 decimal places" }
  ).min(1, { message: "Property size is required" }),
  bedrooms: z.coerce.number<number>().min(0, { message: "Bedrooms must be 0 or more" }),
  bathrooms: z.coerce.number<number>().min(0, { message: "Bathrooms must be 0 or more" }),
  garage: z.coerce.number<number>().min(0, { message: "Garage must be 0 or more" }),
  garageSize: z.coerce.number<number>().refine(
    (val) => Number.isFinite(val) && /^\d+\.\d{2}$/.test(val.toFixed(2)),
    { message: "Must have exactly 2 decimal places" }
  ).min(1, { message: "Garage size is required" }),
  yearBuilt: z.coerce.number<number>().min(1800, { message: "Year built is required" }).max(2050, { message: "Your built must be lower than 2025" }),
  propertyType: z.string().min(1, { message: "Property type is required" }), // change to enum
  propertyStatus: z.string().min(1, { message: "Property status is required" }), // change to enum
  images: z.string(),
  features: z.string().optional(),
  address: z.object({ // add places data
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zipCode: z.string().min(1, { message: "Zip code is required" }),
    area: z.string().min(1, { message: "Area is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    other: z.string().optional(),
  }),
});


type FormValues = z.infer<typeof formSchema>

export default function CreatePropertyForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      propertySize: 0,
      bedrooms: 0,
      bathrooms: 0,
      garage: 0,
      garageSize: 0,
      yearBuilt: new Date().getFullYear(),
      propertyType: "",
      propertyStatus: "",
      images: "",
      features: "",
      address: {
        city: "",
        state: "",
        zipCode: "",
        area: "",
        country: "",
        other: "",
      },
    },
    mode: "all"
  });
  console.log(form.watch("features"))


  const onSubmit: SubmitHandler<FormValues> = (values) => {
    startTransition(async () => {
      try {
        await createProperty<FormValues>(values)
        toast.success(`${values.title} created successfully`)
        console.log(values)
        // Optionally reset form or show success message
        // form.reset()
      } catch (error) {
        console.error('Error creating property:', error)
        // Optionally show error message to user
      }
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid sm:grid-cols-2 gap-4' group-data="main-property-information">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className='col-span-full'>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Beautiful family home' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="500000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertySize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Size</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2000 sqft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className='col-span-full'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Spacious 4 bedroom home..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4' group-data="property-specs">
            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="4" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="garage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="garageSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Garage Size</FormLabel>
                  <FormControl>
                    <Input placeholder="400 sqft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='grid grid-cols-3 gap-4' group-data="property-stats">
            <FormField
              control={form.control}
              name="yearBuilt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Built</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='House'>House</SelectItem>
                        <SelectItem value='Appartment'>Appartment</SelectItem>
                        <SelectItem value='Studio'>Studio</SelectItem>
                        <SelectItem value='Chalet'>Chalet</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="propertyStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='for-sale'>for sale</SelectItem>
                        <SelectItem value='for-rent'>for rent</SelectItem>
                        <SelectItem value='Studio'>Studio</SelectItem>
                        <SelectItem value='Chalet'>Chalet</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Features</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Pool, Garden, etc. (comma separated)"
                    {...field}
                  // value={field.value ? field.value?.split(','): []}
                  // onChange={(e)=> field.onChange(e.target.value)}
                  // onChange={(e) => field.onChange([...e.target.value])}
                  />
                  {/* <Input placeholder="Pool, Garden, etc. (comma separated)" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Comma separated image URLs"
                    value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {/* <Input placeholder="Comma separated image URLs" {...field} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-4'>
            {/* Address fields */}
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zip Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Area" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address.other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Address Info</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button type='submit' className='w-full' disabled={isPending || !form.formState.isValid}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
