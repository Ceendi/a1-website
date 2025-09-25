"use client";

import { unstable_ViewTransition as ViewTransition } from "react";
import { Project } from "../Types";

type BackButtonConfig = {
  labelDesktop: string;
  labelMobile: string;
  onClick: () => void;
};

type ProjectDetailProps = {
  project: Project;
  montserratClass?: string;
  backButton?: BackButtonConfig;
};

export default function ProjectDetail({
  project,
  montserratClass,
  backButton,
}: ProjectDetailProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-300 ${
        montserratClass || ""
      } animate-fade-in`}
    >
      {backButton && (
        <div className="fixed top-4 z-20">
          <button
            type="button"
            onClick={backButton.onClick}
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
            <span className="hidden sm:inline">{backButton.labelDesktop}</span>
            <span className="sm:hidden">{backButton.labelMobile}</span>
          </button>
        </div>
      )}

      {project.sliderImages && project.sliderImages.length > 0 && (
        <div className="flex flex-col items-center w-full h-full">
          <div className="relative lg:w-[calc(100vw-16rem)] w-screen lg:h-screen h-auto animate-slide-up">
            {project.mainImage && (
              <ViewTransition name={`project-image-${project.slug}`}>
                <img
                  src={project.mainImage.url}
                  alt={
                    project.mainImage.alternativeText ||
                    `Main Image for ${project.title}`
                  }
                  className="w-full"
                />
              </ViewTransition>
            )}
          </div>

          {project.sliderImages.map((img, index) => (
            <div
              key={index}
              className="relative lg:w-[calc(100vw-16rem)] w-screen lg:h-screen h-auto animate-fade-in"
            >
              <img
                src={img.url}
                alt={img.alternativeText || `Slider Image ${index + 1}`}
                className="w-full block"
              />
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-0 lg:left-32 right-0 z-10 p-6 lg:w-[calc(100vw-16rem)] justify-center text-white bg-black/40 backdrop-blur-md animate-fade-in">
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
