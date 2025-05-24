export default function About() {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div
          className="text-center mb-16"
          style={{ viewTransitionName: "hero-content" }}
        >
          <h1 className="text-5xl font-extralight mb-6">
            O <span className="text-gray-400">Nas</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Poznaj naszą historię, misję i zespół, który tworzy przyszłość
            internetu
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <h2 className="text-3xl font-light mb-6 text-white">Nasza Misja</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Jesteśmy zespołem pasjonatów technologii, który wierzy w siłę
              innowacji i kreatywności. Naszą misją jest tworzenie wyjątkowych
              doświadczeń, które łączą funkcjonalność z pięknem.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Jesteśmy firmą architektoniczną, która tworzy wizualne rozwiązania
              dla klientów. Pasją naszego zespołu jest tworzenie wizualnych
              rozwiązań, które są niezwykłe i piękne. Cechujemy się
              innowacyjnością i kreatywnością.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
