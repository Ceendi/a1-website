import { unstable_ViewTransition as ViewTransition } from "react";

export default function Home() {
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
      <div className="min-h-screen flex items-center justify-center px-6 lg:ml-16 lg:mr-48">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-tight">
              Witaj w
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                A1
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Odkryj nasze projekty, przeczytaj bloga i poznaj naszą historię.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
