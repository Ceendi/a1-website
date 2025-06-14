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
      {/*LEWY DÓŁ*/}
      <div className="min-h-screen flex">
        <div
            className="absolute bottom-0 left-[256] w-[40vw] h-[60vh] bg-blue-500"
            style={{
                WebkitMaskImage: "url('/image/btmlft.svg')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskImage: "url('/image/btmlft.svg')",
                maskRepeat: "no-repeat",
                maskSize: "cover",
              // WebkitClipPath: 'path("M0 0 C 210.928 115.417, 323.803 119.017, 349.428 175.985 C 371.194 224.375, 369.288 329.203, 343.71 490.47 L 349.428 490.47 L 0 490.47 Z")',
            }}
        >
          {/*<Image*/}
          {/*    src="/image/partner1.jpg"*/}
          {/*    alt="Obrazek 1"*/}
          {/*    fill*/}
          {/*    className="object-cover"*/}
          {/*/>*/}
        </div>
        {/*PRAWY GÓRA*/}
        <div
            className="absolute top-0 right-0 w-[60vw] h-[50vh] bg-red-500"
            style={{
                WebkitMaskImage: "url('/image/topright.svg')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                // maskImage: "url('/image/tprght.svg')",
                // maskRepeat: "no-repeat",
                // maskSize: "fill",
            }}
        >
          {/*<Image*/}
          {/*    src="/image/partner1.jpg"*/}
          {/*    alt="Obrazek 1"*/}
          {/*    fill*/}
          {/*    className="object-cover"*/}
          {/*/>*/}
        </div>
        {/*PRAWY DÓŁ*/}
        <div
            className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-green-500"
            style={{
                WebkitMaskImage: "url('/image/btmrt.svg')",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "cover",
                maskImage: "url('/image/btmrt.svg')",
                maskRepeat: "no-repeat",
                maskSize: "cover",
            }}
        >
          {/*<Image*/}
          {/*    src="/image/partner1.jpg"*/}
          {/*    alt="Obrazek 1"*/}
          {/*    fill*/}
          {/*    className="object-cover"*/}
          {/*/>*/}
        </div>
      </div>


      {/*<div className="min-h-screen flex items-center justify-center">*/}
      {/*  /!* Kontener elipsy *!/*/}
      {/*  <div className="relative w-96 h-72">*/}
      {/*    /!* Lewy obraz *!/*/}
      {/*    <div className="absolute top-1/2 left-0 transform -translate-y-1/2">*/}
      {/*      <div className="w-48 h-56 rounded-3xl overflow-hidden">*/}
      {/*        <Image*/}
      {/*            src="/image/partner1.jpg"*/}
      {/*            alt="Obrazek 1"*/}
      {/*            width={192}*/}
      {/*            height={224}*/}
      {/*            className="object-cover"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* Górny obraz *!/*/}
      {/*    <div className="absolute top-0 right-full">*/}
      {/*      <div className="w-48 h-56 rounded-3xl overflow-hidden">*/}
      {/*        <Image*/}
      {/*            src="/image/partner2.jpg"*/}
      {/*            alt="Obrazek 2"*/}
      {/*            width={192}*/}
      {/*            height={224}*/}
      {/*            className="object-cover"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    /!* Prawy obraz *!/*/}
      {/*    <div className="absolute top-1/2 right-0 transform -translate-y-1/2">*/}
      {/*      <div className="w-48 h-56 rounded-3xl overflow-hidden">*/}
      {/*        <Image*/}
      {/*            src="/image/partner3.jpg"*/}
      {/*            alt="Obrazek 3"*/}
      {/*            width={192}*/}
      {/*            height={224}*/}
      {/*            className="object-cover"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </ViewTransition>
  );
}

