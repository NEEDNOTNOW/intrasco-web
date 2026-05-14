import Navbar from "./Navbar";

export default function HomeScreen() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(79,70,229,0.16),_transparent_28%)]" />
        <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-center px-8 py-24 lg:flex-row lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              How Intransco Serves You
            </span>
            <h1 className="mt-8 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
              Digital service management for transport cooperatives.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              Intransco provides end-to-end support for cooperatives: route planning, member management, daily collections, financial reporting, and real-time operations monitoring.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#services"
                className="rounded-2xl bg-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-xl transition hover:bg-indigo-700"
              >
                See our services
              </a>
              <a
                href="#about"
                className="rounded-2xl border border-slate-300 bg-white px-7 py-4 text-base font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Learn how it works
              </a>
            </div>
            <div className="mt-12 grid max-w-xl gap-6 sm:grid-cols-3">
              <div>
                <p className="text-4xl font-bold text-slate-900">250+</p>
                <p className="mt-2 text-sm text-slate-500">Cooperative partners</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900">1,420</p>
                <p className="mt-2 text-sm text-slate-500">Routes managed</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-slate-900">Secure</p>
                <p className="mt-2 text-sm text-slate-500">Data protection for members and fleets</p>
              </div>
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:w-1/2">
            <div className="rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-2xl backdrop-blur-xl">
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-50 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Itransco</p>
                  <h2 className="mt-4 text-2xl font-bold text-slate-900">Trusted by cooperatives that need speed and clarity.</h2>
                  <p className="mt-3 text-slate-600">
                    A simplified portal for operations, finance, and reporting, built for transport companies.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Member signups</p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">+320</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-500">Routes managed</p>
                    <p className="mt-4 text-3xl font-bold text-slate-900">1,420</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Average time saved</p>
                  <p className="mt-4 text-3xl font-bold text-slate-900">92%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Our services</p>
          <h2 className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">How Intransco supports your cooperative</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            From operations management to driver support, Intransco helps cooperatives run safer, smarter, and more profitable transport services.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-8 px-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Operations Coordination",
              desc: "Coordinate routes, trips, and schedules with real-time updates for drivers and dispatch.",
            },
            {
              title: "Member & Driver Management",
              desc: "Keep track of cooperative members, licenses, and onboard drivers in one system.",
            },
            {
              title: "Financial Reporting",
              desc: "Capture fares, collections, and expenses automatically for easier reconciliation.",
            },
            {
              title: "Performance Insights",
              desc: "Review route efficiency, vehicle usage, and revenue trends with clear analytics.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <div className="mb-6 h-14 w-14 rounded-2xl bg-indigo-100 text-center text-3xl font-bold text-indigo-700">✓</div>
              <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-8 lg:flex-row lg:items-center lg:gap-20">
          <div className="lg:w-1/2">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">About Intransco</p>
            <h2 className="mt-4 text-4xl font-black text-slate-900 sm:text-5xl">We help cooperatives deliver better transport services.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Intransco provides technology and service support for route planning, member administration, fare collection, and cooperative performance improvement.
            </p>
            <ul className="mt-8 space-y-4 text-slate-600">
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-indigo-600" />
                Real-time route and schedule coordination for smoother operations.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-indigo-600" />
                Member and driver services that simplify registration, boarding, and payments.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-indigo-600" />
                Reporting tools that help cooperatives improve efficiency and revenue.
              </li>
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">Service delivery</h3>
              <p className="mt-3 text-slate-600">We support cooperative leaders with operational guidance, service monitoring, and regular performance reviews.</p>
            </div>
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-2xl font-semibold text-slate-900">Member support</h3>
              <p className="mt-3 text-slate-600">From driver onboarding to income tracking, we make it easier to manage every part of transport service delivery.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Let's build your solution</p>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">Book a demo or ask about enterprise pricing.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Itransco is built for cooperatives that need reliable transport management and smart reporting tools.
              </p>
            </div>

            <div className="rounded-[32px] bg-slate-800 p-10 shadow-2xl shadow-slate-900/50">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Contact</p>
                  <p className="mt-3 text-lg font-semibold text-white">hello@itransco.com</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Phone</p>
                  <p className="mt-3 text-lg font-semibold text-white">+63 912 345 6789</p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Address</p>
                  <p className="mt-3 text-lg font-semibold text-white">Makati City, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
