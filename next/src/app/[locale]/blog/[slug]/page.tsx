export const revalidate = 300;

import React from "react";
import config from "@/config";
import { notFound } from "next/navigation";
import Image from "next/image";
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
    <div className="min-h-screen bg-gradient-to-br px-0 py-4 sm:px-2 sm:py-8 flex justify-center items-start mesh">
      <div className="w-full max-w-3xl bg-white dark:bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-12 md:p-24 lg:p-24 xl:p-28 relative border border-black/10 border-black/10 mx-0">
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Link
            href="/blog"
            className="group inline-flex items-center text-black hover:text-red-600 font-medium text-base transition-colors px-2 py-2 sm:px-3 sm:py-2 rounded-lg bg-black/5 dark:bg-black/5 hover:bg-black/10 dark:hover:bg-black/10 border border-black/10"
          >
            <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">
              ←
            </span>{" "}
            <span className="ms:hidden">Wróć do blogów</span>
          </Link>
        </div>
        <ViewTransition name={`blog-image-${slug}`}>
          {imageUrl && (
            <div className="mb-6 sm:mb-10">
              <Image
                src={
                  imageUrl.startsWith("http")
                    ? imageUrl
                    : `${config.api}${imageUrl}`
                }
                alt={BlogImage?.alternativeText || Title}
                className="rounded-xl sm:rounded-2xl shadow-lg w-full object-cover"
                width={BlogImage?.formats?.large?.width || 900}
                height={BlogImage?.formats?.large?.height || 450}
                priority
              />
            </div>
          )}
        </ViewTransition>
        <ViewTransition name={`blog-title-${slug}`}>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white dark:text-black mb-6 sm:mb-8 leading-tight">
            {Title}
          </h1>
        </ViewTransition>
        <div className="prose prose-base sm:prose-lg max-w-none dark:prose-invert mb-8 sm:mb-12 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-p:mb-3 sm:prose-p:mb-4">
          {Array.isArray(Content) && <BlocksRenderer content={Content} />}
        </div>
        <div className="border-t border-slate-200 dark:border-neutral-700 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-2">
          {prevBlog ? (
            <Link
              href={`/blog/${prevBlog.slug}`}
              className="group inline-flex items-center text-black hover:text-red-600 font-medium text-base transition-colors px-2 py-2 sm:px-3 sm:py-2 rounded-lg bg-black/5 dark:bg-black/5 hover:bg-black/10 dark:hover:bg-black/10 border border-black/10 shadow-sm w-full sm:w-auto"
            >
              <span className="mr-2 text-xl group-hover:-translate-x-1 transition-transform">
                ←
              </span>{" "}
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
              </span>{" "}
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
  );
}
