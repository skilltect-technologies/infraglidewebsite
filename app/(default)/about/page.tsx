export const metadata = {
  title: "About Us - InfraGlide",
  description: "Learn about InfraGlide's mission to make cloud infrastructure management simple and accessible for every team.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Companies using InfraGlide" },
  { value: "3M+", label: "Infrastructure deployments" },
  { value: "40%", label: "Average cost reduction" },
  { value: "99.9%", label: "Platform uptime SLA" },
];

const values = [
  {
    title: "Simplicity First",
    description:
      "We believe infrastructure management should be accessible to every engineer, not just specialists. Every feature we build prioritises clarity over complexity.",
  },
  {
    title: "Security by Default",
    description:
      "Security is not an afterthought. RBAC, audit logging, SSO, and compliance controls are built into the core platform — not bolt-ons.",
  },
  {
    title: "Open & Interoperable",
    description:
      "We build on open standards like Terraform and support all major cloud providers. No vendor lock-in, ever.",
  },
  {
    title: "Customer Obsessed",
    description:
      "Our roadmap is driven by customer feedback. We ship fast, listen harder, and measure success by the outcomes our customers achieve.",
  },
];

export default function About() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShape} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Our Story
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              We&apos;re making cloud infrastructure simple
            </h1>
            <p className="text-lg text-indigo-200/65">
              InfraGlide was founded with a single belief: managing cloud infrastructure should not require a team of specialists. We build tools that let any engineering team deploy, manage, and scale with confidence.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 text-center backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <p className="font-nacelle text-3xl font-semibold text-indigo-400">{stat.value}</p>
                <p className="mt-1 text-sm text-indigo-200/65">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission */}
          <div className="mb-16 mx-auto max-w-3xl rounded-2xl bg-linear-to-br from-indigo-900/40 via-indigo-800/20 to-gray-900/50 p-8 text-center before:pointer-events-none relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-600),var(--color-indigo-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
            <h2 className="mb-3 font-nacelle text-xl font-semibold text-gray-100">Our Mission</h2>
            <p className="text-indigo-200/65">
              To democratise cloud infrastructure management — giving every engineering team the power to build, deploy, and scale securely, without needing deep infrastructure expertise.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="mb-8 text-center font-nacelle text-2xl font-semibold text-gray-200">
              What we stand for
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                >
                  <h3 className="mb-2 font-nacelle text-base font-semibold text-gray-200">{v.title}</h3>
                  <p className="text-sm text-indigo-200/65">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="mb-4 text-indigo-200/65">Ready to see it in action?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/free-trial"
                className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Start Free Trial
              </Link>
              <Link
                href="/schedule-demo"
                className="btn relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Schedule Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
