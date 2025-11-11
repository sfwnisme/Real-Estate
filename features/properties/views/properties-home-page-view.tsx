import React, { Suspense } from "react";
import { PAGINATION_CONFIG } from "@/constants/enums";
import Title from "@/components/custom/title";
import PropertiesGridView from "./properties-grid-veiw";
import PropertyCardSkeleton from "../skeletons/property-card-skeleton";

type Props = {
  pageSize?: number;
  currentPage?: number;
};

export default async function PropertiesHomePageView({
  pageSize = PAGINATION_CONFIG.BLOG.CLIENT.OVERVIEW,
  currentPage = 1,
}: Props) {
  return (
    <div>
      <Title
        type="center"
        title="Your property just one step away"
        description="Nestled in the heart of a lush green forest, this property is a true nature lover's paradise. "
      />
      <div className="h-16" />
      <Suspense fallback={<PropertyCardSkeleton count={pageSize} />}>
        <PropertiesGridView pageSize={pageSize} currentPage={currentPage} />
      </Suspense>
    </div>
  );
}
