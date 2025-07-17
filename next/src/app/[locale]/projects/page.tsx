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
        <div className={`mt-8 mb-8 ml-8 ${montserrat.className} font-bold`}>
          <div className="text-xl sm:text-2xl md:text-3xl tracking-[10px] sm:tracking-[14px] md:tracking-[18px] font-light ml-2 sm:ml-[30px] md:ml-[65px]">
            pracownia architektoniczna
          </div>
          <div className="text-4xl sm:text-6xl md:text-8xl ml-2 sm:ml-[40px] md:ml-[95px] mt-[10px] sm:mt-[20px] md:mt-[30px]">
            A<span className="text-red-600">1</span> Sp. z o.o.
          </div>
        </div>

        <div className={`grid gap-8`}>
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="p-8 bg-white/5 border border-white/10"
              >
                <div
                  className={`flex flex-col lg:flex-row items-center ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  } gap-8 w-full`}
                >
                  <div className="relative w-full lg:w-[75%] overflow-hidden group rounded-[30px]">
                    {project.mainImage && (
                      <Link
                        href="/projects/[id]"
                        as={`/projects/${project.slug}`}
                      >
                        {/* <ViewTransition name={`project-image-${project.slug}`}> */}
                        <div className="relative w-full h-auto">
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
                            className="w-full h-auto transition-transform duration-300 ease-in-out lg:group-hover:scale-105"
                          />
                          {/* border w srodku zdjec */}
                          <div className="hidden sm:block absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                            <div
                              className="absolute"
                              style={{
                                top: "20px",
                                left: "20px",
                                right: "20px",
                                bottom: "20px",
                                border: "1px solid rgba(255,255,255,0.6)",
                                borderRadius: "10px",
                                opacity: 0.8,
                              }}
                            ></div>
                          </div>
                        </div>
                        {/* </ViewTransition> */}
                      </Link>
                    )}

                    {/* title na desktopie */}
                    <h3
                      className={`sm:block hidden text-[clamp(1rem,2vw,4rem)] font-bold absolute top-[0px]
                            bg-black/20 backdrop-blur-[6px] border border-white/60
                            ${
                              !isEven
                                ? "lg:rounded-br-none lg:rounded-tl-none rounded-tr-[10px] rounded-bl-[10px]"
                                : "rounded-tr-none rounded-bl-none rounded-tl-[10px] rounded-br-[10px]"
                            } p-3 m-5 text-white ${montserrat.className} 
                            ${isEven ? "left-[0px]" : "right-[0px]"}`}
                    >
                      {project.title.toUpperCase()}
                    </h3>

                    {/* title i description na mobile */}
                    <div className="sm:hidden block">
                      <Link
                        href="/projects/[id]"
                        as={`/projects/${project.slug}`}
                      >
                        <h3
                          className={`text-[clamp(1rem,2vw,2.5rem)] font-bold bg-black/70 backdrop-blur-[6px] p-3 text-white ${montserrat.className}`}
                        >
                          {project.title.toUpperCase()}
                        </h3>

                        <div
                          className={`
                              p-4 rounded-bl-[30px] rounded-br-[30px] text-black bg-white/80 border border-black/60 ${montserrat.className}`}
                        >
                          {project.description}
                        </div>
                      </Link>
                    </div>

                    {/* description na desktopie */}
                    <div
                      className={`sm:block hidden
                            lg:absolute lg:bottom-0 p-3 lg:m-5 ${
                              isEven ? "lg:right-0" : "lg:left-0"
                            } lg:text-[clamp(0.5rem,0.9vw,2rem)]
                            lg:bg-black/20  backdrop-blur-[6px] border lg:border-white/60 border-black/60 
                            p-4 ${
                              !isEven
                                ? "lg:rounded-br-none lg:rounded-tl-none rounded-tr-[10px] rounded-bl-[10px]"
                                : "rounded-tr-none rounded-bl-none rounded-tl-[10px] rounded-br-[10px]"
                            } text-black lg:text-white 
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
