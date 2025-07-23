import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
      <div className="min-h-screen w-full h-screen overflow-hidden top-0 left-0 lg:ml-16 lg:mr-48 mesh">
        <div
          className={`mt-8 mb-8 ml-12 ${montserrat.className} font-bold mr-12`}
        >
          <div className="text-xl sm:text-2xl md:text-3xl tracking-[10px] sm:tracking-[14px] md:tracking-[18px] font-light ml-2 sm:ml-[30px] md:ml-[65px]">
            pracownia architektoniczna
          </div>
          <div className="text-4xl sm:text-6xl md:text-8xl ml-2 sm:ml-[40px] md:ml-[95px] mt-[10px] sm:mt-[20px] md:mt-[30px]">
            A<span className="text-red-600">1</span> Sp. z o.o.
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        </div>

        <div
          className="
                    w-[80vw]
                    sm:w-[70vw]
                    lg:w-[50vw]
                    overflow-hidden
                    bg-gray-500
                    ml-[16px] mt-[20px]
                    h-[calc(100vh-151px)]
                    sm:h-[calc(100vh-189px)]
                    md:h-[calc(100vh-235px)]
                    "
          style={{
            clipPath:
              "polygon(0% 0%, calc(100% - (100vh - 255px) * 0.15) 0%, 100% 100%, calc((100vh - 255px) * 0.15) 100%)",
          }}
        >
          <Image
            fill
            src="/image/dekor.jpg"
            alt=""
            className="w-full h-full
                            object-cover object-center
                            "
          />
        </div>
      </div>
    </ViewTransition>
  );
}
