import Title from "@/components/custom/title";
import { SITE_INFO } from "@/constants/config";
import { PAGINATION_CONFIG, STATUS_TEXT } from "@/constants/enums";
import BlogPostsGridView from "@/features/blog-posts/views/blog-posts-grid-view";
import { getBlogPosts } from "@/lib/requests";
import type { SearchParamsType } from "@/types/types";
import { Metadata } from "next";

export const generateMetadata = async ({
  searchParams,
}: {
  searchParams: SearchParamsType;
}): Promise<Metadata> => {
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;
  const blogPosts = await getBlogPosts(
    PAGINATION_CONFIG.BLOG.CLIENT.PAGE,
    currentPage
  );

  if (!blogPosts.data) {
    return {};
  }

  const { nextPage, prevPage } = blogPosts.data;
  const { TITLE, DESCRIPTION, ROUTE } = SITE_INFO.PAGES.BLOG;

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: ROUTE,
    },
    pagination: {
      next: ROUTE + `?page=${nextPage}`,
      previous: ROUTE + `?page=${prevPage}`,
    },
  };
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = (await searchParams)?.page;
  const currentPage = page ? parseInt(page) : 1;

  return (
    <div>
      <Title
        type="start"
        title="Discover insights, trends, and inspiration."
        description="Explore a handpicked collection of stunning homes that reflect timeless design, innovative architecture, and unparalleled luxury."
      />
      <div className="h-10" />
      <BlogPostsGridView currentPage={currentPage} />
    </div>
  );
}
