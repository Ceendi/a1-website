import { version, unstable_ViewTransition as ViewTransition } from "react";

export default function Projects() {
  const projects = [
    { title: "Projekt Alpha", description: "Innowacyjne rozwiązanie webowe" },
    { title: "Projekt Beta", description: "Aplikacja mobilna nowej generacji" },
    { title: "Projekt Gamma", description: "System zarządzania treścią" },
  ];

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
      <div className="min-h-screen px-6 py-12 lg:ml-32 lg:mr-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extralight mb-6">
              Nasze <span className="text-gray-400">Projekty</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Poznaj nasze najnowsze realizacje i innowacyjne rozwiązania
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
              >
                <h3 className="text-2xl font-light mb-4">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
