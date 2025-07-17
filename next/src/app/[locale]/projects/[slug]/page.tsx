export const revalidate = 300;

import config from "@/config";
import { Project } from "../page";
import { notFound } from "next/navigation";
import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import Link from "next/link";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const fetchProjectBySlug = async (slug: string): Promise<Project | null> => {
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
      `${config.api}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
      reqOptions
    );
    if (!request.ok) {
      console.error(`API returned status ${request.status}`);
      return null;
    }
    const response = await request.json();
    if (!response.data || response.data.length === 0) return null;
    const project = response.data[0];
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      year: project.year,
      description: project.description,
      mainImage: project.mainImage,
      sliderImages: project.sliderImages,
      createdAt: new Date(project.createdAt),
      updatedAt: new Date(project.updatedAt),
    };
  } catch (error) {
    console.error("Failed to fetch project by slug:", error);
    return null;
  }
};

export async function generateStaticParams() {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const res = await fetch(
    `${config.api}/api/projects?fields=slug&pagination[pageSize]=1000`,
    reqOptions
  );
  const data = await res.json();
  return data.data?.map((project: { slug: string }) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return notFound();
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-300 ${montserrat.className}`}
    >
      <div className="fixed top-4 z-20">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 shadow-lg border border-black/10 text-black hover:bg-black hover:text-white transition-all duration-200 text-base sm:text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 sm:w-6 sm:h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="hidden sm:inline">Powrót do listy projektów</span>
          <span className="sm:hidden">Projekty</span>
        </Link>
      </div>
      {project.sliderImages && project.sliderImages.length > 0 && (
        <div className="flex flex-col items-center w-full h-full">
          <div className="relative lg:w-[calc(100vw-16rem)] w-screen h-screen">
            {project.mainImage && (
              <ViewTransition name={`project-image-${project.slug}`}>
                <Image
                  fill
                  src={
                    project.mainImage.url.startsWith("http")
                      ? project.mainImage.url
                      : `${config.api}${project.mainImage.url}`
                  }
                  alt={
                    project.mainImage.alternativeText ||
                    `Main Image for ${project.title}`
                  }
                  className="object-cover"
                />
              </ViewTransition>
            )}
            <div
              className="
                            absolute
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            bg-black/10
                            backdrop-blur-md
                            rounded-md
                            px-4
                            py-2
                            text-white
                            font-semibold
                            text-lg
                            select-none
                            pointer-events-none
                        "
            >
              {project.year}
            </div>
          </div>

          {project.sliderImages.map((img, index) => (
            <div
              key={index}
              className="relative lg:w-[calc(100vw-16rem)] w-screen h-screen"
            >
              <Image
                fill
                src={
                  img.url.startsWith("http")
                    ? img.url
                    : `${config.api}${img.url}`
                }
                alt={img.alternativeText || `Slider Image ${index + 1}`}
                className="object-cover"
              />
              <div
                className="
                            absolute
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            bg-black/10
                            backdrop-blur-md
                            rounded-md
                            px-4
                            py-2
                            text-white
                            font-semibold
                            text-lg
                            select-none
                            pointer-events-none
                        "
              >
                {project.year}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 lg:left-32 right-0 z-10 p-6 lg:w-[calc(100vw-16rem)] justify-center text-white bg-black/40 backdrop-blur-md">
        <h3 className="text-[clamp(1rem,2vw,4rem)] font-bold">
          {project.title.toUpperCase()}
        </h3>
        <p
          className="text-[clamp(0.8rem,1vw,1.5rem)] max-w-7xl"
          style={{ lineHeight: "1.5" }}
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}
