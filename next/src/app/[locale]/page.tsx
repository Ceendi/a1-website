import { unstable_ViewTransition as ViewTransition } from "react";
import Image from "next/image";

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
      <div className="min-h-screen absolute top-0 left-0 pl-16 pt-10">
        <div className="text-start">
          <div className="mb-8">
            <div
              style={{ fontFamily: "Arial, sans-serif" }}
              className="text-3xl tracking-[18px] font-light ml-[65]"
            >
              pracownia architektoniczna
            </div>
            <div
              style={{ fontFamily: '"Viner Hand ITC", cursive' }}
              className="text-8xl ml-[95] mt-[30]"
            >
              A<span className="text-red-600">1</span> Sp. z o.o.
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
          </div>

          <div
            className="
                    w-[800px]
                    overflow-hidden
                    bg-gray-500
                    ml-16 mt-[20px]
                    "
            style={{
              height: "calc(100vh - 255px)",
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
      </div>
    </ViewTransition>
  );
}
