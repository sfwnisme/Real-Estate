// import { getBlogPosts } from "@/lib/requests";
import { getBlogPosts } from "@/lib/requests";
import { NextRequest, NextResponse } from "next/server";

// Enable Next.js route handler caching, revalidating every 3600 seconds (1 hour)
export const revalidate = 3600;
// export const dynamic = 'force-static'
// export const contentType = 'text/markdown'

// helpers
const removeTrailingSlash = (url: string) =>
  url.endsWith("/") ? url.slice(0, -1) : url;

// Move generatedAt outside the GET handler to fix "generatedAt" time changing on every request.
// This makes sure that while the cache is valid, the timestamp does not change.
const generatedAt = new Date().toISOString();

/**
 * Generate a plain-text export of blog posts consisting of top-level YAML front matter
 * followed by per-post YAML metadata blocks and Markdown content.
 *
 * @param req - Incoming NextRequest whose URL origin is used to construct absolute post URLs
 * @returns A NextResponse. On success, the response body is plain text containing the generated YAML and Markdown for each post, with Content-Type "text/plain; charset=utf-8" and a Cache-Control header using `s-maxage` equal to the route's `revalidate` value. On failure, a 500 response with body "No data available".
 */
export async function GET(req: NextRequest) {
  const { origin } = req.nextUrl;

  // Pass fetch cache hints to Next.js for route handler caching
  const blogPostsRes = await getBlogPosts(300);

  if (!blogPostsRes.data?.data) {
    return new NextResponse("No data available", { status: 500 });
  }

  let lines: string[] = [];
  lines.push(
    `---
title: Blog posts 
description: Blog posts page
---

# Blog Posts
GeneratedAt: ${generatedAt} 
`
  );

  blogPostsRes.data.data.forEach((p: any) => {
    const url = removeTrailingSlash(`${origin}/blog-posts/${p.slug}`);
    const keywords = Array.isArray(p.meta?.keywords)
      ? p.meta.keywords.join(", ")
      : "";
    const blogMetadata = `---
title: ${p.title}
summary: ${p.excerpt}
reading_time: ${p.reading_time}
updatedAt: ${p.updatedAt}
publishedAt: ${p.publishedAt}
source_url: 
  html: ${origin}/${p.slug}
  md: ${origin}/${p.slug}.md
keywords: ${keywords}
---`;
    const blogContent = `
# ${p.title}

${p.content}
`;
    lines.push(blogMetadata);
    lines.push(blogContent);
  });

  // Use join("\n") to preserve line breaks
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": `public, max-age=0, s-maxage=${revalidate}`, // Edge caching
    },
  });
}