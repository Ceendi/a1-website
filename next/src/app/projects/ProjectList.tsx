"use client";

import { Project } from "../Types";

interface Props {
  projects: Project[];
  montserratClass?: string;
  onSelect?: (project: Project) => void;
}

export default function ProjectList({
  projects,
  montserratClass = "",
  onSelect,
}: Props) {
  return (
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
                  <button
                    type="button"
                    onClick={() => onSelect && onSelect(project)}
                    className="relative block w-full p-0 m-0 text-left border-0 bg-transparent"
                  >
                    <img
                      width={2000}
                      height={1000}
                      src={project.mainImage.url}
                      alt={
                        project.mainImage.alternativeText ||
                        "Main project Image"
                      }
                      className="w-full h-auto block transition-transform duration-300 ease-in-out lg:group-hover:scale-105"
                      loading="lazy"
                    />
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
                  </button>
                )}

                <h3
                  className={`sm:block hidden text-[clamp(1rem,2vw,4rem)] font-bold absolute top-[0px] bg-black/20 backdrop-blur-[6px] border border-white/60 ${
                    !isEven
                      ? "lg:rounded-br-none lg:rounded-tl-none rounded-tr-[10px] rounded-bl-[10px]"
                      : "rounded-tr-none rounded-bl-none rounded-tl-[10px] rounded-br-[10px]"
                  } p-3 m-5 text-white ${montserratClass} ${
                    isEven ? "left-[0px]" : "right-[0px]"
                  }`}
                >
                  {project.title.toUpperCase()}
                </h3>

                <div className="lg:hidden block">
                  <button
                    type="button"
                    onClick={() => onSelect && onSelect(project)}
                    className="w-full text-left"
                  >
                    <h3
                      className={`sm:hidden block text-[clamp(1rem,2vw,2.5rem)] font-bold bg-black/90 backdrop-blur-[6px] p-3 text-white ${montserratClass}`}
                    >
                      {project.title.toUpperCase()}
                    </h3>

                    <div
                      className={`p-4 rounded-bl-[30px] rounded-br-[30px] text-black bg-white/80 border border-black/60 ${montserratClass}`}
                    >
                      {project.description}
                    </div>
                  </button>
                </div>

                <div
                  className={`lg:block hidden lg:absolute lg:bottom-0 p-3 lg:m-5 ${
                    isEven ? "lg:right-0" : "lg:left-0"
                  } lg:text-[clamp(0.5rem,0.9vw,2rem)] lg:bg-black/20  backdrop-blur-[6px] border lg:border-white/60 border-black/60 p-4 ${
                    !isEven
                      ? "lg:rounded-br-none lg:rounded-tl-none rounded-tr-[10px] rounded-bl-[10px]"
                      : "rounded-tr-none rounded-bl-none rounded-tl-[10px] rounded-br-[10px]"
                  } text-black lg:text-white max-w-full lg:max-w-[30%] ${montserratClass}`}
                >
                  {project.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
