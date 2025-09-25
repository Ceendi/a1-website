"use client";

import config from "@/config";
import {
  useState,
  useEffect,
  useRef,
  unstable_ViewTransition as ViewTransition,
} from "react";

import { Montserrat } from "next/font/google";
import ProjectList from "./ProjectList";
import ProjectDetail from "./ProjectDetail";
import { ImageEntry, Project } from "../Types";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

type ApiProject = {
  id: number;
  title: string;
  description: string;
  mainImage?: ImageEntry;
  sliderImages?: ImageEntry[];
  createdAt: string;
  updatedAt: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchedRef = useRef(false);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const listScrollYRef = useRef(0);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    const fetchFirstTwo = async () => {
      try {
        const request = await fetch(
          `${config.api}/api/projects?populate=*&sort=createdAt:asc&pagination[limit]=2`
        );
        if (!request.ok) {
          console.error(`API returned status ${request.status}`);
          setProjects([]);
          return;
        }
        const response = await request.json();
        const mappedProjects = response.data.map(
          (project: ApiProject): Project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            mainImage: project.mainImage,
            sliderImages: project.sliderImages,
            createdAt: new Date(project.createdAt),
            updatedAt: new Date(project.updatedAt),
          })
        );
        setProjects(mappedProjects);

        const moreRequest = await fetch(
          `${config.api}/api/projects?populate=*&sort=createdAt:asc&pagination[start]=2`
        );

        if (moreRequest.ok) {
          const moreResponse = await moreRequest.json();
          const moreMapped = moreResponse.data.map(
            (project: ApiProject): Project => ({
              id: project.id,
              title: project.title,
              description: project.description,
              mainImage: project.mainImage,
              sliderImages: project.sliderImages,
              createdAt: new Date(project.createdAt),
              updatedAt: new Date(project.updatedAt),
            })
          );
          setProjects((prev) => [...prev, ...moreMapped]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchFirstTwo();
  }, []);

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
        className={`min-h-screen w-full lg:ml-32 lg:mr-32 mesh`}
        style={{ fontFamily: '"Viner Hand ITC", cursive' }}
      >
        {!selectedProject ? (
          <div>
            <div
              className={`mt-8 mb-8 ml-10 ${montserrat.className} font-bold mr-10`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl tracking-[10px] sm:tracking-[14px] md:tracking-[18px] font-light ml-2 sm:ml-[30px] md:ml-[65px]">
                pracownia architektoniczna
              </div>
              <div className="text-4xl sm:text-6xl md:text-8xl ml-2 sm:ml-[40px] md:ml-[95px] mt-[10px] sm:mt-[20px] md:mt-[30px]">
                A<span className="text-red-600">1</span> Sp. z o.o.
              </div>
            </div>
            <ProjectList
              projects={projects}
              montserratClass={montserrat.className}
              onSelect={(p) => {
                if (typeof window !== "undefined") {
                  listScrollYRef.current = window.scrollY || 0;
                }
                setSelectedProject(p);
                if (typeof window !== "undefined") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
          </div>
        ) : selectedProject ? (
          <ProjectDetail
            project={selectedProject}
            montserratClass={montserrat.className}
            backButton={{
              labelDesktop: "Powrót do listy projektów",
              labelMobile: "Projekty",
              onClick: () => {
                setSelectedProject(null);
                if (typeof window !== "undefined") {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      window.scrollTo({
                        top: listScrollYRef.current || 0,
                        behavior: "smooth",
                      });
                    });
                  });
                }
              },
            }}
          />
        ) : (
          <div>Projekt nie znaleziony</div>
        )}
      </div>
    </ViewTransition>
  );
}
