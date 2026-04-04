export const metadata = {
  title: "Changelog - InfraGlide",
  description: "See what's new in InfraGlide â€” release notes, improvements, and bug fixes.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";

type ChangeEntry = {
  category: string;
  items: string[];
};

type Release = {
  version: string;
  date: string;
  latest?: boolean;
  sections: { type: "feature" | "bugfix" | "note"; heading: string; entries: ChangeEntry[] }[];
};

const releases: Release[] = [
  {
    version: "2026.03.12",
    date: "Mar 27, 2026",
    latest: true,
    sections: [
      {
        type: "bugfix",
        heading: "Bug Fixes",
        entries: [
          {
            category: "Leftbar",
            items: [
              "Restored the default leftbar width for users without AI chat enabled (private alpha), providing a more comfortable design workspace and bringing back the expected layout behavior.",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "2026.03.11",
    date: "Mar 26, 2026",
    sections: [
      {
        type: "bugfix",
        heading: "Bug Fixes",
        entries: [
          {
            category: "Node / Containers",
            items: [
              "Line and arrow shapes now validate correctly, so these diagram elements work more reliably in real architectures.",
              "Text and other nodes now consistently respect minimum sizing rules, preventing save and rendering issues in edge-case layouts.",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "2026.03.10",
    date: "Mar 26, 2026",
    sections: [
      {
        type: "feature",
        heading: "Features and Improvements",
        entries: [
          {
            category: "New architecture",
            items: [
              "The new architecture screen now prioritizes Create from scratch as the first option, making the most common starting path quicker to access.",
            ],
          },
        ],
      },
      {
        type: "bugfix",
        heading: "Bug Fixes",
        entries: [
          {
            category: "Import from cloud provider",
            items: [
              "Cloud import failures now display clear, dedicated error messages in the interface, helping teams diagnose issues and recover faster.",
            ],
          },
        ],
      },
    ],
  },
  {
    version: "2026.03.9",
    date: "Mar 19, 2026",
    sections: [
      {
        type: "bugfix",
        heading: "Bug Fixes",
        entries: [
          {
            category: "Design area / diagram",
            items: [
              "Deleting nodes now reliably cleans up related connectors, preventing diagram inconsistencies during node removal workflows.",
            ],
          },
          {
            category: "Resource Configurator",
            items: [
              "Switching between modules now correctly keeps each module's own card data, avoiding unintended overwrites when editing.",
            ],
          },
        ],
      },
      {
        type: "note",
        heading: "Notes",
        entries: [
          {
            category: "",
            items: [
              'The "Create with AI" option has been removed from the new architecture flow. Its successor will soon be released under alpha feature flag. Contact the support team if you want to be on the Alpha waiting list.',
            ],
          },
        ],
      },
    ],
  },
  {
    version: "2026.03.8",
    date: "Mar 18, 2026",
    sections: [
      {
        type: "feature",
        heading: "Features and Improvements",
        entries: [
          {
            category: "Design area / diagram",
            items: [
              "Architecture revision history is now more resilient by keeping a larger recent revision window (10), making rollback and recovery safer when users need to restore a previous working state.",
            ],
          },
        ],
      },
      {
        type: "bugfix",
        heading: "Bug Fixes",
        entries: [
          {
            category: "RBAC/Permissions",
            items: [
              "Permission policy initialization was stabilized to ensure access rules are created and updated more reliably, reducing risk of inconsistent authorization behavior across organizations and projects.",
            ],
          },
        ],
      },
    ],
  },
];

const sectionStyle = {
  feature: {
    icon: "✨",
    heading: "text-emerald-300",
    dot: "bg-emerald-500",
    badge: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/20",
  },
  bugfix: {
    icon: "🐛",
    heading: "text-blue-300",
    dot: "bg-blue-500",
    badge: "bg-blue-500/15 text-blue-400 ring-blue-500/20",
  },
  note: {
    icon: "📝",
    heading: "text-amber-300",
    dot: "bg-amber-500",
    badge: "bg-amber-500/15 text-amber-400 ring-amber-500/20",
  },
};

export default function Changelog() {
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
          <div className="pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                What&apos;s New
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Changelog
            </h1>
            <p className="text-lg text-indigo-200/65">
              New features, improvements, and fixes â€” updated with every release.
            </p>
          </div>

          {/* Two-column layout: sidebar + main */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
            {/* Sidebar â€” version index */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-2">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Versions
                </p>
                {releases.map((r) => (
                  <a
                    key={r.version}
                    href={`#v${r.version}`}
                    className="flex items-center gap-2 text-sm text-indigo-200/55 hover:text-indigo-300 transition-colors"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500/50" />
                    {r.version}
                  </a>
                ))}
              </div>
            </aside>

            {/* Main content */}
            <div className="space-y-10">
              {releases.map((release) => (
                <div
                  key={release.version}
                  id={`v${release.version}`}
                  className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-8 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
                >
                  {/* Release header */}
                  <div className="mb-6 flex flex-wrap items-center gap-3">
                    <span className="font-nacelle text-lg font-semibold text-gray-100">
                    {release.version}
                    </span>
                    {release.latest && (
                      <span className="inline-flex items-center rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                        Latest
                      </span>
                    )}
                    <span className="ml-auto text-sm text-indigo-200/45">{release.date}</span>
                  </div>

                  {/* Sections */}
                  <div className="space-y-6">
                    {release.sections.map((section, si) => {
                      const style = sectionStyle[section.type];
                      return (
                        <div key={si}>
                          <h3 className={`mb-4 flex items-center gap-2 text-sm font-semibold ${style.heading}`}>
                            {style.icon} {section.heading}
                          </h3>
                          <div className="space-y-4">
                            {section.entries.map((entry, ei) => (
                              <div key={ei} className="pl-5">
                                {entry.category && (
                                  <p className="mb-2 text-xs font-semibold text-gray-400">
                                    {entry.category}
                                  </p>
                                )}
                                <ul className="space-y-2">
                                  {entry.items.map((item, ii) => (
                                    <li key={ii} className="flex items-start gap-2 text-sm text-indigo-200/65">
                                      <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
