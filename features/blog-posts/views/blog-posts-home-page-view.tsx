import React, { Suspense } from "react";
import { getBlogPosts } from "@/lib/requests";
import BlogCard from "@/components/custom/blog-card";
import { PAGINATION_CONFIG } from "@/constants/enums";
import BlogPostCardSkeleton from "../skeletons/blog-post-card-skeleton";
import Title from "@/components/custom/title";
import BlogPostsGridView from "./blog-posts-grid-view";

type Props = {
  pageSize?: number;
  currentPage?: number;
};

export default async function BlogPostsHomePageView({
  pageSize = PAGINATION_CONFIG.BLOG.CLIENT.OVERVIEW,
  currentPage = 1,
}: Props) {
  return (
    <div>
      <Title
        type="with_button"
        title="Discover insights, trends, and inspiration."
        description="Explore a handpicked collection of stunning homes that reflect timeless design, innovative architecture, and unparalleled luxury."
        url="/blog"
      />
      <div className="h-16" />
        <Suspense fallback={<BlogPostCardSkeleton count={3} />}>
          <BlogPostsGridView pageSize={pageSize} currentPage={currentPage} />
        </Suspense>
    </div>
  );
}
