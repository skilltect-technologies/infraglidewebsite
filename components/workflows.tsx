import Spotlight from "@/components/spotlight";

const features = [
  {
    emoji: "🚀",
    badge: "Fast Deployment",
    title: "Fast Deployment",
    description:
      "Deploy infrastructure in minutes, not hours. Reduce deployment time by up to 80%.",
  },
  {
    emoji: "🔒",
    badge: "Enterprise Security",
    title: "Enterprise Security",
    description:
      "Role-based access control, encryption, and compliance with industry standards.",
  },
  {
    emoji: "📊",
    badge: "Real-time Analytics",
    title: "Real-time Analytics",
    description:
      "Monitor your infrastructure with comprehensive dashboards and insights.",
  },
  {
    emoji: "📄",
    badge: "Multi-Cloud Support",
    title: "Multi-Cloud Support",
    description:
      "Deploy across AWS, Azure, GCP, and on-premises with a single interface.",
  },
  {
    emoji: "👥",
    badge: "Team Collaboration",
    title: "Team Collaboration",
    description:
      "Work together seamlessly with version control and audit trails.",
  },
  {
    emoji: "⚙️",
    badge: "API-First Design",
    title: "API-First Design",
    description:
      "Integrate with your existing tools using our comprehensive REST API.",
  },
];

export default function Workflows() {
  return (
    <section id="features">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Platform Capabilities
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Everything you need to move fast
            </h2>
            <p className="text-lg text-indigo-200/65">
              InfraGlide gives your team the tools to deploy, secure, and scale
              cloud infrastructure without the complexity.
            </p>
          </div>
          {/* Feature cards */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.badge}
                className="group/card relative h-full overflow-hidden rounded-2xl bg-gray-800 p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500 after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950 after:absolute after:inset-0 after:bg-linear-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50">
                  {/* Icon area */}
                  <div className="flex items-center justify-center pt-10 pb-6">
                    <span className="text-5xl" role="img" aria-label={feature.title}>
                      {feature.emoji}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="p-6 pt-0">
                    <div className="mb-3">
                      <span className="btn-sm relative rounded-full bg-gray-800/40 px-2.5 py-0.5 text-xs font-normal before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_bottom,--theme(--color-gray-700/.15),--theme(--color-gray-700/.5))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-gray-800/60">
                        <span className="bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                          {feature.badge}
                        </span>
                      </span>
                    </div>
                    <p className="text-indigo-200/65">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}

