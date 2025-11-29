import React from "react";

import PropertyOverviewCard from "@/features/propertyPage/propertyOverviewCard";
import PropertyCarousel from "@/features/propertyPage/propertyCarousel";
import { getProperties, getProperty, getPropertyImages } from "@/lib/requests";
import { notFound } from "next/navigation";
import { type Metadata } from "next";
import YoutubeVideoPlayer from "@/components/custom/youtube-video-player";
import { type OgImageType } from "@/types/types";
import { PAGES_ROUTES, SITE_INFO } from "@/constants/config";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Create static route parameters for property pages by extracting slugs from fetched properties.
 *
 * @returns An array of objects each containing a `slug` string for use in static generation; returns an empty array if no property data is available.
 */
export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const properties = await getProperties();
  if (!properties.data?.data) {
    return [];
  }
  const property = properties.data?.data.map((property) => ({
    slug: property.slug,
  }));
  if (property.length === 0) return [];
  return property;
}

/**
 * Builds the page metadata for a property identified by its slug.
 *
 * @returns A Metadata object containing title, description, canonical URL, Open Graph and Twitter data (including images when available), and robots directives; returns an empty object if the property is not found.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const property = await getProperty(slug);
  if (!property.data) {
    return {};
  }
  const propertyData = property.data;
  const propertyImages = await getPropertyImages(property.data._id);
  const propertyImagesData = propertyImages.data;

  const propertyImagesMetadata: OgImageType[] | undefined =
    propertyImagesData?.map((image) => ({
      url: image.url,
      width: image.dimensions.width,
      height: image.dimensions.height,
      alt: propertyData.title,
      type: image.mimeType,
    }));
  const canonicalUrl = PAGES_ROUTES.PROPERTIES.PREVIEW + slug;

  return {
    title: property.data.title,
    description: property.data.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      url: canonicalUrl,
      siteName: SITE_INFO.NAME,
      type: "article",
      countryName: SITE_INFO.COUNTRY,
    },
    twitter: {
      images: propertyImagesMetadata,
      title: property.data.title,
      description: property.data.description,
      card: "summary_large_image",
    },
    robots: { index: true, follow: true },
  };
}

/**
 * Renders the property preview page for the given slug.
 *
 * Fetches the property by `slug` and displays its carousel, overview card, title, description, and optional YouTube video. If the property is not found, triggers a 404 response via `notFound()`.
 *
 * @param params - An object with a `slug` string identifying the property
 * @returns The rendered JSX for the property page
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);
  const propertyData = property.data;

  if (!propertyData) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <PropertyCarousel
        propertyId={propertyData._id}
        propertyAlt={propertyData.title}
      />
      <PropertyOverviewCard property={propertyData} />
      <article className="flex-1">
        <h1 className="text-3xl font-semibold mb-10">{propertyData.title}</h1>
        <p>{propertyData.description}</p>
      </article>
      {propertyData.video && (
        <div>
          <YoutubeVideoPlayer link={propertyData?.video} />
        </div>
      )}
    </div>
  );
}