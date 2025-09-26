export const revalidate = 300;

import React from "react";
import config from "@/config";
import { notFound } from "next/navigation";
// import Image from "next/image";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { type Blog } from "../page";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

const fetchBlogBySlug = async (slug: string): Promise<Blog | null> => {
  try {
    const reqOptions = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: {
        revalidate: 300,
      },
    };
    const request = await fetch(
      `${config.api}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
      reqOptions
    );
    if (!request.ok) {
      console.error(`API returned status ${request.status}`);
      return null;
    }
    const response = await request.json();
    if (!response.data || response.data.length === 0) return null;
    const blog = response.data[0];
    return {
      id: blog.id,
      Title: blog.Title,
      slug: blog.slug,
      Content: blog.Content,
      Summary: blog.Summary,
      Image: blog.Image,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  } catch (error) {
    console.error("Failed to fetch blog by slug:", error);
    return null;
  }
};

const fetchAllBlogSlugs = async () => {
  try {
    const reqOptions = {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      next: {
        revalidate: 300,
      },
    };
    const request = await fetch(
      `${config.api}/api/blogs?fields=slug,Title,id&sort=createdAt:asc`,
      reqOptions
    );
    if (!request.ok) {
      console.error(`API returned status ${request.status}`);
      return [];
    }
    const response = await request.json();
    if (!response.data || response.data.length === 0) return null;
    return response.data.map(
      (blog: { id: number; slug: string; Title: string }) => ({
        id: blog.id,
        slug: blog.slug,
        Title: blog.Title,
      })
    );
  } catch (error) {
    console.error("Failed to fetch all blog slugs:", error);
    return [];
  }
};

export async function generateStaticParams() {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const res = await fetch(
    `${config.api}/api/blogs?fields=slug&pagination[pageSize]=1000`,
    reqOptions
  );
  const data = await res.json();
  return data.data?.map((blog: { slug: string }) => ({ slug: blog.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return notFound();
  const { Title, Content, Image: BlogImage } = blog;
  const imageUrl = BlogImage?.url;

  const allBlogs = await fetchAllBlogSlugs();
  const currentIndex = allBlogs.findIndex(
    (b: { slug: string }) => b.slug === slug
  );
  const prevBlog = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const nextBlog =
    currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br mesh px-4 py-4 sm:px-6 sm:py-6 lg:pl-48 lg:pr-16">
      <div className="absolute top-4 left-4 lg:left-52 z-20">
        <Link
          href="/blog"
          className="group inline-flex items-center text-black hover:text-red-600 font-medium text-base transition-colors px-2 py-2 sm:px-3 sm:py-2 rounded-lg bg-black/5 dark:bg-black/5 hover:bg-black/10 dark:hover:bg-black/10 border border-black/10"
        >
          <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="ms:hidden">Wróć do blogów</span>
        </Link>
      </div>

      <ViewTransition name={`blog-image-${slug}`}>
        {imageUrl && (
          <svg className="fixed top-0 right-0 lg:right-16 z-10 w-[30vw] h-[50vh]">
            <defs>
              <clipPath
                id={`curve-tl-${slug}`}
                clipPathUnits="objectBoundingBox"
              >
                {/* Zaokrąglony kształt w lewym górnym rogu */}
                <path d="M 1 0 L 1 1 C 0.3 0.95, 0 1,0.2 0 Z" />
              </clipPath>
            </defs>

            <image
              href={
                imageUrl.startsWith("http")
                  ? imageUrl
                  : `${config.api}${imageUrl}`
              }
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath={`url(#curve-tl-${slug})`}
            />
          </svg>
        )}
      </ViewTransition>

      <ViewTransition name={`blog-title-${slug}`}>
        <div className="fixed top-20 sm:top-24 left-24 lg:left-48 lg:pl-24 z-20 flex justify-start">
          <h1 className="text-2xl max-w-[10vw] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-black mb-6 sm:mb-8 leading-tight -translate-x-4 sm:-translate-x-8 md:-translate-x-12">
            {Title}
          </h1>
        </div>
      </ViewTransition>

      <div className="flex flex-col min-h-screen w-full">
        <div className="pt-20 sm:pt-24" />

        <div className="w-full md:w-3/5 lg:pr-[calc(25vw+4rem)] lg:pl-[calc(10vw+12rem)] lg:w-full mx-auto px-0 sm:px-2 pt-20">
          <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert mb-8 sm:mb-12 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4">
            {Array.isArray(Content) && <BlocksRenderer content={Content} />}
          </div>
        </div>

        <div className="mt-auto border-t border-slate-200 dark:border-neutral-700 pt-6 sm:pt-8 px-0 sm:px-2">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-2">
            {prevBlog ? (
              <Link
                href={`/blog/${prevBlog.slug}`}
                className="group inline-flex items-center text-black hover:text-red-600 font-medium text-base transition-colors px-2 py-2 sm:px-3 sm:py-2 rounded-lg bg-black/5 dark:bg-black/5 hover:bg-black/10 dark:hover:bg-black/10 border border-black/10 shadow-sm w-full sm:w-auto"
              >
                <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">
                  ←
                </span>
                <span className="truncate max-w-[240px] sm:max-w-xs">
                  {prevBlog.Title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {nextBlog ? (
              <Link
                href={`/blog/${nextBlog.slug}`}
                className="group inline-flex items-center text-black hover:text-red-600 font-medium text-base transition-colors px-2 py-2 sm:px-3 sm:py-2 rounded-lg bg-black/5 dark:bg-black/5 hover:bg-black/10 dark:hover:bg-black/10 border border-black/10 shadow-sm w-full sm:w-auto"
              >
                <span className="truncate max-w-[240px] sm:max-w-xs">
                  {nextBlog.Title}
                </span>
                <span className="ml-2 text-xl group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
