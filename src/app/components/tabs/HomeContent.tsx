import Image from "next/image";

export default function HomeContent() {
  return (
    <div className="w-screen h-screen flex items-center justify-center lg:ml-24 lg:mr-72">
      <div className="relative w-full h-full">
        <Image
          src="/CHORWACJA1.jpg"
          alt="Chorowacja"
          fill
          priority
          quality={50}
          style={{
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
