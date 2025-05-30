import Link from "next/link";
import { Blog } from "../blog/page";
import config from "@/config";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  const imageUrl = blog.Image?.url;

  console.log(`blog-image-${blog.slug}`);

  return (
    <ViewTransition key={blog.id} name={`blog-card-${blog.id}`}>
      <Link href={`/blog/${blog.slug}`}>
        <article className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
          <ViewTransition name={`blog-image-${blog.slug}`}>
            {imageUrl && (
              <Image
                src={`${config.api}${imageUrl}`}
                alt={blog.Image?.alternativeText || blog.Title}
                className="mb-4 rounded-lg w-full h-48 object-cover"
                width={blog.Image?.formats?.large?.width || 234}
                height={blog.Image?.formats?.large?.height || 156}
              />
            )}
          </ViewTransition>
          <ViewTransition name={`blog-title-${blog.slug}`}>
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-light">{blog.Title}</h2>
            </div>
          </ViewTransition>
          <p className="text-gray-400 select-text">{blog.Summary}</p>
        </article>
      </Link>
    </ViewTransition>
  );
};

export default BlogCard;
