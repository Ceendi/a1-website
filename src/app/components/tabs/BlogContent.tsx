export default function BlogContent() {
  return (
    <div className="w-screen h-screen overflow-y-auto lg:ml-72 lg:mr-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="h-1/4 flex items-center justify-center border-b border-gray-300"
        >
          <h2 className="text-4xl font-semibold">Testowy blok #{i + 1}</h2>
        </div>
      ))}
    </div>
  );
}
