import {Montserrat} from "next/font/google";

export const revalidate = 300;

import { unstable_ViewTransition as ViewTransition } from "react";
import config from "@/config";
import BlogCard from "@/app/components/BlogCard";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { ImageEntry } from "@/app/Types";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export interface Blog {
  id: number;
  Title: string;
  slug: string;
  Content: BlocksContent;
  Summary: string;
  Image?: ImageEntry;
  createdAt: Date;
  updatedAt: Date;
}

const fetchBlogs = async (): Promise<Blog[]> => {
  const reqOptions = {
    next: {
      revalidate: 300,
    },
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  try {
    const request = await fetch(
      `${config.api}/api/blogs?populate=*&sort=createdAt:asc`,
      reqOptions
    );
    if (!request.ok) {
      console.error(`API returned status ${request.status}`);
      return [];
    }
    const response = await request.json();
    return response.data.map(
      (blog: {
        id: number;
        Title: string;
        slug: string;
        Content: BlocksContent;
        Summary: string;
        Image?: ImageEntry;
        createdAt: string;
        updatedAt: string;
      }): Blog => {
        const { id } = blog;
        return {
          id,
          Title: blog.Title,
          slug: blog.slug,
          Content: blog.Content,
          Summary: blog.Summary,
          Image: blog.Image,
          createdAt: new Date(blog.createdAt),
          updatedAt: new Date(blog.updatedAt),
        };
      }
    );
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
};

export default async function Blog() {
  const blogs = await fetchBlogs();
  console.log("Fetched blogs:", blogs);

  return (
    <ViewTransition
      enter={{
        default: "none",
        "left-tabs": "slide-in-forward",
        "right-tabs": "slide-in-back",
      }}
      exit={{
        default: "none",
        "left-tabs": "slide-in-back",
        "right-tabs": "slide-in-forward",
      }}
    >

      <div className="min-h-screen w-full px-6 pr-6 lg:ml-48 lg:mr-16 scroll-smooth mesh">
        <div className={`mt-8 mb-8 ml-12 ${montserrat.className} font-bold mr-12`}>
          <div className="text-xl sm:text-2xl md:text-3xl tracking-[10px] sm:tracking-[14px] md:tracking-[18px] font-light ml-2 sm:ml-[30px] md:ml-[65px]">
            pracownia architektoniczna
          </div>
          <div className="text-4xl sm:text-6xl md:text-8xl ml-2 sm:ml-[40px] md:ml-[95px] mt-[10px] sm:mt-[20px] md:mt-[30px]">
            A<span className="text-red-600">1</span> Sp. z o.o.
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            {blogs.map((blog: Blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
