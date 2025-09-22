export default function Home() {
  return (
    <main className="min-h-screen px-6 md:px-10 py-28">
      {/* Hero section with placeholder content */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8">
        <div className="glass p-6 md:p-8">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
            Building premium, interactive tech experiences
          </h1>
          <p className="mt-4 text-[15px] text-[color:var(--text-secondary)]">
            Developer turned infrastructure and network specialist. I design and build
            playful, performant, enterprise-ready interfaces and tools.
          </p>
          <div className="mt-6 flex gap-3">
            <button className="focus-ring glass px-4 py-2 text-sm">View Projects</button>
            <button className="focus-ring px-4 py-2 text-sm" style={{ border: "1px solid var(--highlight)", borderRadius: "var(--radius)" }}>Contact</button>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="aspect-video glass grid place-items-center">
            <span className="opacity-80 text-sm">Sample video placeholder</span>
          </div>
          <div className="h-40 glass grid place-items-center">
            <span className="opacity-80 text-sm">Sample image placeholder</span>
          </div>
        </div>
      </section>

      {/* Placeholder anchors for nav */}
      <section id="projects" className="max-w-6xl mx-auto mt-20 glass p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured Projects</h2>
        <p className="mt-2 text-[15px] text-[color:var(--text-secondary)]">Coming soon — case studies with problem → approach → impact.</p>
      </section>

      <section id="about" className="max-w-6xl mx-auto mt-10 glass p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">About</h2>
        <p className="mt-2 text-[15px] text-[color:var(--text-secondary)]">Short bio placeholder. Tech background, now focused on hardware, networks, infrastructure.</p>
      </section>

      <section id="contact" className="max-w-6xl mx-auto mt-10 glass p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Contact</h2>
        <p className="mt-2 text-[15px] text-[color:var(--text-secondary)]">Email form placeholder. We’ll wire it to a static-friendly form service.</p>
      </section>
    </main>
  );
}
