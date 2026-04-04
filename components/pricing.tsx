import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import BlurredShape from "@/public/images/blurred-shape.svg";
import Link from "next/link";

const standardFeatures = [
  "Unlimited cloud architectures",
  "Unlimited Terraform code generation",
  "Access to all supported cloud providers - AWS, Azure, GCP",
  "Access to public templates",
  "Support of public and private Terraform modules",
  "Unlimited Folders, Projects & Users",
  "Native architecture versioning",
  "Remote Git integration",
  "Remote backend",
  "RBAC",
  "Unlimited deployments",
  "Email Support during the working hours",
  "Community Group Access",
  "Manual Onboarding",
];

const enterpriseFeatures = [
  "Account Manager",
  "Dedicated Support",
  "Chat Support",
  "Audit Logging",
  "SLA",
  "Security & Compliance",
  "SSO",
  "Unlimited Code Base",
  "Custom Integration",
  "Team Collab",
  "Private registry",
  "Import Templates",
  "Self-hosted or single tenant hosting",
  "AI Provisioning",
  "Terraform migration",
  "Private onboarding",
  "Dedicated support via Slack or Chats",
  "Centralized Monitoring, Logging with Topology View",
  "LDAP/AD Integration",
  "HLD/LLD/Architecture Diagram",
  "Cost Optimization Recommendations",
  "Drift Detection",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative">
      {/* Background decorations */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShapeGray}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 translate-x-[20%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src={BlurredShape}
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">

          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Plans for every team
            </h2>
            <p className="text-lg text-indigo-200/65">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>

          {/* Pricing cards */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">

            {/* Standard Plan */}
            <div
              className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              data-aos="fade-up"
            >
              <div className="mb-6">
                <h3 className="mb-1 font-nacelle text-xl font-semibold text-gray-200">
                  Standard
                </h3>
                <p className="text-sm text-indigo-200/65">
                  Perfect for growing teams
                </p>
              </div>

              <div className="mb-6 flex items-end gap-1">
                <span className="font-nacelle text-5xl font-semibold text-gray-100">
                  $99
                </span>
                <span className="mb-1 text-sm text-indigo-200/65">
                  / month per user
                </span>
              </div>

              <Link
                href="/free-trial"
                className="btn mb-8 w-full bg-linear-to-r from-indigo-500 to-indigo-400 bg-[length:100%_100%] bg-[bottom] py-1.5 text-sm font-medium text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Start Free Trial
              </Link>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  What&apos;s included
                </p>
                <ul className="space-y-3">
                  {standardFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-indigo-200/65">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 fill-indigo-500"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.5 11.5L2.5 7.5L3.91 6.09L6.5 8.67L12.09 3.09L13.5 4.5L6.5 11.5Z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div
              className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-900/40 via-indigo-800/20 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-600),var(--color-indigo-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {/* Most Popular badge */}
              <div className="absolute right-6 top-6">
                <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <h3 className="mb-1 font-nacelle text-xl font-semibold text-gray-100">
                  Enterprise
                </h3>
                <p className="text-sm text-indigo-200/65">
                  For large-scale operations
                </p>
              </div>

              <div className="mb-6 flex items-end gap-1">
                <span className="font-nacelle text-5xl font-semibold text-white">
                  $199
                </span>
                <span className="mb-1 text-sm text-indigo-200/65">
                  / month per user
                </span>
              </div>

              <Link
                href="#"
                className="btn mb-8 w-full bg-indigo-500 py-1.5 text-sm font-medium text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-indigo-400"
              >
                Contact Sales
              </Link>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-indigo-300/70">
                  What&apos;s included
                </p>
                <ul className="space-y-3">
                  {enterpriseFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-indigo-200/65">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0 fill-indigo-400"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6.5 11.5L2.5 7.5L3.91 6.09L6.5 8.67L12.09 3.09L13.5 4.5L6.5 11.5Z" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
