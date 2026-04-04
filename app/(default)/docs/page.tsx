export const metadata = {
  title: "Documentation - InfraGlide",
  description:
    "Everything you need to get started with InfraGlide — guides, API references, and tutorials.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Link from "next/link";

const sections = [
  {
    category: "Getting Started",
    items: [
      { title: "Introduction", description: "What InfraGlide is and how it works." },
      { title: "Quick Start Guide", description: "Deploy your first infrastructure in under 10 minutes." },
      { title: "Installation & Setup", description: "Install and configure InfraGlide for your team." },
      { title: "Core Concepts", description: "Understand projects, modules, providers, and workspaces." },
    ],
  },
  {
    category: "Cloud Providers",
    items: [
      { title: "AWS Integration", description: "Configure and deploy resources on Amazon Web Services." },
      { title: "Azure Integration", description: "Connect and manage Microsoft Azure infrastructure." },
      { title: "GCP Integration", description: "Deploy workloads on Google Cloud Platform." },
      { title: "Multi-Cloud Setup", description: "Manage cross-cloud deployments from a single place." },
    ],
  },
  {
    category: "Terraform",
    items: [
      { title: "Terraform Code Generation", description: "Auto-generate production-ready Terraform from visual diagrams." },
      { title: "Module Library", description: "Browse and use public and private Terraform modules." },
      { title: "Remote Backend", description: "Securely store Terraform state in InfraGlide's remote backend." },
      { title: "Terraform Migration", description: "Import existing Terraform projects into InfraGlide." },
    ],
  },
  {
    category: "Security & Compliance",
    items: [
      { title: "RBAC", description: "Set up role-based access control for your team." },
      { title: "SSO & LDAP", description: "Integrate with your identity provider." },
      { title: "Audit Logging", description: "Track every change made to your infrastructure." },
      { title: "Drift Detection", description: "Automatically detect and alert on infrastructure drift." },
    ],
  },
  {
    category: "API Reference",
    items: [
      { title: "REST API Overview", description: "Authenticate and interact with the InfraGlide API." },
      { title: "Deployments API", description: "Trigger and manage deployments programmatically." },
      { title: "Modules API", description: "Create and manage your module registry via API." },
      { title: "Webhooks", description: "Receive real-time events for deployments and changes." },
    ],
  },
];

export default function Documentation() {
  return (
    <section id="docs" className="relative">
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
                Documentation
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Build faster with InfraGlide
            </h1>
            <p className="text-lg text-indigo-200/65">
              Comprehensive guides, tutorials, and API references to help you get the most out of InfraGlide.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-14">
            {sections.map((section) => (
              <div key={section.category}>
                <h2 className="mb-6 font-nacelle text-xl font-semibold text-gray-200">
                  {section.category}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-700),var(--color-indigo-800))_border-box] transition-all"
                    >
                      <h3 className="mb-1 font-nacelle text-sm font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-indigo-200/65">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="mb-4 text-indigo-200/65">Can&apos;t find what you&apos;re looking for?</p>
            <Link
              href="/schedule-demo"
              className="btn bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
