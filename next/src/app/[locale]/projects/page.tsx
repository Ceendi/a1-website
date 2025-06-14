export const revalidate = 300;

import { ImageEntry } from "@/app/Types";
import config from "@/config";
import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Project {
  id: number;
  title: string;
  slug: string;
  year: number;
  description: string;
  mainImage?: ImageEntry;
  sliderImages?: ImageEntry[];
  createdAt: Date;
  updatedAt: Date;
}

const fetchProjects = async (): Promise<Project[]> => {
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
      `${config.api}/api/projects?populate=*&sort=createdAt:asc`,
      reqOptions
    );
    if (!request.ok) {
      console.error(`API returned status ${request.status}`);
      return [];
    }
    const response = await request.json();

    return response.data.map(
      (project: {
        id: number;
        title: string;
        slug: string;
        year: number;
        description: string;
        mainImage?: ImageEntry;
        sliderImages?: ImageEntry[];
        createdAt: string;
        updatedAt: string;
      }): Project => {
        const { id } = project;
        return {
          id,
          title: project.title,
          slug: project.slug,
          year: project.year,
          description: project.description,
          mainImage: project.mainImage,
          sliderImages: project.sliderImages,
          createdAt: new Date(project.createdAt),
          updatedAt: new Date(project.updatedAt),
        };
      }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export default async function Projects() {
  const projects = await fetchProjects();
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
      <div
        className="min-h-screen lg:ml-32 lg:mr-32"
        style={{ fontFamily: '"Viner Hand ITC", cursive' }}
      >
        <div className="text-center mb-8 mt-8">
          <h1 className="text-7xl font-extralight">
            Nasze <span className="text-red-600">Projekty</span>
          </h1>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="p-8 bg-white/5 rounded-2xl border border-white/10"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8`}
                >
                  <div className="relative w-full lg:w-[75%] md:w-[95%]">
                    {project.mainImage && (
                      <Link
                        href="/projects/[id]"
                        as={`/projects/${project.slug}`}
                      >
                        <Image
                          priority={true}
                          width={2000}
                          height={1000}
                          src={
                            project.mainImage.url.startsWith("http")
                              ? project.mainImage.url
                              : `${config.api}${project.mainImage.url}`
                          }
                          alt={
                            project.mainImage.alternativeText ||
                            "Main project Image"
                          }
                          className="rounded-lg w-full h-auto"
                        />
                      </Link>
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
                    <div className="absolute top-4 left-4">
                      <h3
                        className="text-[clamp(1rem,2vw,4rem)] font-bold text-white 
                            bg-black/15 backdrop-blur-[6px] border border-white/10 
                            rounded-lg p-3 shadow-md"
                      >
                        {project.title.toUpperCase()}
                      </h3>
                    </div>

                    <div
                      className="lg:mt-[5%] md:mt-6
                            lg:absolute lg:top-1 lg:right-4 lg:text-[clamp(0.5rem,0.9vw,2rem)]
                            bg-black/15 backdrop-blur-[24px] border border-white/10
                            p-4 rounded-lg text-white shadow-md 
                            max-w-full lg:max-w-[30%]"
                    >
                      {project.description}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ViewTransition>
  );
}
