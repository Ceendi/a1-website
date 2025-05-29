import { unstable_ViewTransition as ViewTransition } from "react";

export default function Blog() {
  const posts = [
    { title: "Problem wielkiego formatu", date: "24 Maj 2024" },
    { title: "Problem wielkiego formatu", date: "24 Maj 2024" },
    { title: "Problem wielkiego formatu", date: "24 Maj 2024" },
    { title: "Problem wielkiego formatu", date: "24 Maj 2024" },
    { title: "Problem wielkiego formatu", date: "24 Maj 2024" },
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
      <div className="min-h-screen px-6 py-12 pr-6 custom-scrollbar lg:ml-48 lg:mr-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extralight mb-6">
              Nasz <span className="text-gray-400">Blog</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Najnowsze artykuły o technologii i trendach w web developmencie
            </p>
          </div>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-light">{post.title}</h2>
                  <span className="text-gray-500 text-sm">{post.date}</span>
                </div>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </ViewTransition>
  );
}
