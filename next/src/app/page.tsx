import {unstable_ViewTransition as ViewTransition} from "react";

import {Montserrat} from "next/font/google";

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

            {/*zmienić margines potem*/}
            <div className="min-h-screen w-full h-screen overflow-hidden top-0 left-0 lg:ml-16 lg:mr-16 mesh">

                <div className="lg:mx-[5vw]">

                    <div className={`h-2/10 mt-8 mb-8 ml-12 ${montserrat.className} font-bold mr-12`}>
                        <div className="text-xl tracking-[10px] font-light ml-2">
                            pracownia architektoniczna
                        </div>
                        <div className="text-4xl ml-2 mt-[10px]">
                            A<span className="text-red-600">1</span> Sp. z o.o.
                        </div>
                    </div>

                    {/*<div className="flex justify-center">*/}
                    {/*  <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>*/}
                    {/*</div>*/}


                    <div className="flex flex-col lg:flex-row">
                        <div
                            className="
                    relative
                    lg:w-[70%] w-[90%]
                    mx-auto lg:mx-0
                    lg:h-[70%] h-[40%]
                    {/*bg-gray-500*/}
                    "
                            // style={{
                            //   clipPath:
                            //     "polygon(0% 0%, calc(100% - (100vh - 255px) * 0.15) 0%, 100% 100%, calc((100vh - 255px) * 0.15) 100%)",
                            // }}
                        >
                            <img
                                src="/image/dekor.jpg"
                                alt="Główne zdjęcie"
                                className="w-full h-full rounded-[30px]
                            object-cover object-center
                            "
                            />
                            <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                                <div
                                    className="absolute"
                                    style={{
                                        top: "15px",
                                        left: "15px",
                                        right: "15px",
                                        bottom: "15px",
                                        border: "2px solid rgba(255,255,255,0.6)",
                                        borderRadius: "15px",
                                        opacity: 0.8,
                                    }}
                                ></div>
                            </div>
                            <div className="absolute right-[5%] top-[10%] h-[100%]">
                                <img
                                    src="/image/PencilRender_HIGHER_RES.png"
                                    alt="Rysunek ołówka"
                                    className="h-full w-[100%]
                            "
                                />
                            </div>
                        </div>
                        <div
                            className="relative mx-auto top-[10vh] w-[300px] h-[400px] flex flex-col items-left justify-start p-3 pl-7">

                            <h2 className="tracking-[0.2em] text-sm mb-8">KONTAKT:</h2>

                            <div className="mb-16 text-left">
                                <p className="text-[1.2rem]">Paweł Szypulski</p>
                                <p className="text-sm pl-4">tel. 693 453 825</p>
                            </div>

                            <div className="mb-16 text-left">
                                <p className="text-[1.2rem]">Sylwia Melon - Szypulska</p>
                                <p className="text-sm pl-4">tel. 609 704 434</p>
                            </div>

                            <div className="mt-auto mb-10 text-left">
                                <p className="text-[1.2rem]">biuro@a1arch.pl</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </ViewTransition>
    );
}
