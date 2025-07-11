// import Image from "next/image";
import {unstable_ViewTransition as ViewTransition} from "react";

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
            <svg className="absolute bottom-0 right-0 w-[calc(64vw-16rem)] h-[60vh]">
                <defs>
                    <clipPath id="curve-br" clipPathUnits="objectBoundingBox">
                        <path d="M 1 1 L 0 1 C 0.1 0, 0.1 0.2, 1 0 Z" />
                    </clipPath>
                </defs>

                {/* prostokąt wypełniony stałym kolorem */}
                <image
                    href="/image/partner1.jpg"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#curve-br)"
                />
            </svg>
            <svg className="absolute bottom-0 left-[256px] w-[40vw] h-[60vh]">
                <defs>
                    <clipPath id="curve-bl" clipPathUnits="objectBoundingBox">
                        <path d="M 0 1 L 0 0.3 C 1 0, 1 0.2, 0.9 1 Z" />
                    </clipPath>
                </defs>

                {/* prostokąt wypełniony stałym kolorem */}
                <image
                    href="/image/partner2.jpg"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#curve-bl)"
                />
            </svg>
            <svg className="absolute top-0 right-0 w-[60vw] h-[50vh]">
                <defs>
                    <clipPath id="curve-tr" clipPathUnits="objectBoundingBox">
                        <path d="M 1 0 L 1 0.8 C 0.3 0.95, 0.25 1.2,0 0 Z" />
                    </clipPath>
                </defs>

                {/* prostokąt wypełniony stałym kolorem */}
                <image
                    href="/image/partner3.jpg"
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                    clipPath="url(#curve-tr)"
                />
            </svg>
        </ViewTransition>
    );
}

