export const metadata = {
  title: "Careers - InfraGlide",
  description: "Join the InfraGlide team — help us make cloud infrastructure simple for every engineering team.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Link from "next/link";

const openings = [
  {
    title: "Senior Full-Stack Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Infrastructure Engineer (Terraform)",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Product Manager — Platform",
    team: "Product",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "DevRel Engineer",
    team: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Enterprise Account Executive",
    team: "Sales",
    location: "Remote / India",
    type: "Full-time",
  },
  {
    title: "Solutions Engineer",
    team: "Sales",
    location: "Remote",
    type: "Full-time",
  },
];

const perks = [
  { emoji: "🌍", title: "Fully Remote", description: "Work from anywhere in the world. We build async-first." },
  { emoji: "🏥", title: "Health Coverage", description: "Comprehensive health, dental, and vision insurance." },
  { emoji: "📚", title: "Learning Budget", description: "$1,500/year for courses, books, and conferences." },
  { emoji: "🖥️", title: "Home Office Setup", description: "One-time stipend to build your ideal workspace." },
  { emoji: "🚀", title: "Equity", description: "Meaningful equity — you share in what we build together." },
  { emoji: "🧘", title: "Flexible PTO", description: "Generous, flexible time off. We trust you to recharge." },
];

export default function Careers() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                We&apos;re Hiring
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Build the future of infrastructure
            </h1>
            <p className="text-lg text-indigo-200/65">
              Join a remote-first team on a mission to make cloud infrastructure management simple for every engineering team on the planet.
            </p>
          </div>

          {/* Perks */}
          <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {perks.map((perk) => (
              <div
                key={perk.title}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-2 text-2xl">{perk.emoji}</div>
                <h3 className="mb-1 text-sm font-semibold text-gray-200">{perk.title}</h3>
                <p className="text-xs text-indigo-200/65">{perk.description}</p>
              </div>
            ))}
          </div>

          {/* Open roles */}
          <h2 className="mb-6 font-nacelle text-xl font-semibold text-gray-200">Open Positions</h2>
          <div className="space-y-3">
            {openings.map((role) => (
              <div
                key={role.title}
                className="group relative flex flex-wrap items-center justify-between gap-4 overflow-hidden rounded-xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 px-6 py-4 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-700),var(--color-indigo-800))_border-box] transition-all"
              >
                <div>
                  <p className="font-medium text-gray-200 group-hover:text-indigo-300 transition-colors">
                    {role.title}
                  </p>
                  <p className="text-sm text-indigo-200/65">{role.team}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-indigo-200/65">{role.location}</span>
                  <span className="rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-xs text-indigo-300">
                    {role.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* No role listed? */}
          <div className="mt-12 text-center">
            <p className="mb-4 text-indigo-200/65">
              Don&apos;t see a role that fits? We&apos;re always interested in hearing from great people.
            </p>
            <Link
              href="/contact"
              className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
