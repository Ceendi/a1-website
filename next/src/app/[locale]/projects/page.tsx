export const revalidate = 300;

import { ImageEntry } from "@/app/Types";
import config from "@/config";
import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
        className={`min-h-screen w-full lg:ml-32 lg:mr-32`}
        style={{ fontFamily: '"Viner Hand ITC", cursive' }}
      >
        <div className="text-center mb-2 mt-8">
          <h1 className="text-7xl font-extralight">
            Nasze{" "}
            <span className="text-red-600 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              Projekty
            </span>
          </h1>
        </div>

        <div className={`grid gap-8`}>
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
                  } gap-8 w-full`}
                >
                  <div className="relative w-full lg:w-[75%] transition-transform duration-300 ease-in-out hover:scale-[1.02]">
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
                      className={`absolute top-[0.7px] ${
                        isEven ? "left-[0.7px]" : "right-[0.7px]"
                      }`}
                    >
                      <h3
                        className="text-[clamp(1rem,2vw,4rem)] font-bold
                            bg-black/20 backdrop-blur-[6px] border border-white/5 
                            rounded-lg p-3 shadow-md text-red-600"
                      >
                        {project.title.toUpperCase()}
                      </h3>
                    </div>

                    <div
                      className={`lg:mt-[5%] md:mt-6
                            lg:absolute lg:top-1 ${
                              isEven ? "lg:right-0" : "lg:left-0"
                            } lg:text-[clamp(0.5rem,0.9vw,2rem)]
                            lg:bg-black/20  backdrop-blur-[6px] border border-white/5
                            p-4 rounded-lg text-black lg:text-white shadow-md 
                            max-w-full lg:max-w-[30%] ${montserrat.className}`}
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
