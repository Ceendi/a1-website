import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";

export default function About() {
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
      <div className="absolute top-0 right-0">
          <Image
              src="/image/partner2.jpg"
              alt="Obrazek 2"
              width={192}
              height={224}
              className="object-cover"
          />
      </div>


      <div className="min-h-screen flex items-center justify-center">
        {/* Kontener elipsy */}
        <div className="relative w-96 h-72">
          {/* Lewy obraz */}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
            <div className="w-48 h-56 rounded-3xl overflow-hidden">
              <Image
                  src="/image/partner1.jpg"
                  alt="Obrazek 1"
                  width={192}
                  height={224}
                  className="object-cover"
              />
            </div>
          </div>
          {/* Górny obraz */}
          <div className="absolute top-0 right-full">
            <div className="w-48 h-56 rounded-3xl overflow-hidden">
              <Image
                  src="/image/partner2.jpg"
                  alt="Obrazek 2"
                  width={192}
                  height={224}
                  className="object-cover"
              />
            </div>
          </div>
          {/* Prawy obraz */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
            <div className="w-48 h-56 rounded-3xl overflow-hidden">
              <Image
                  src="/image/partner3.jpg"
                  alt="Obrazek 3"
                  width={192}
                  height={224}
                  className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
