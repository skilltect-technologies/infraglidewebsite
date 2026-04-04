export const metadata = {
  title: "Blog - InfraGlide",
  description: "Insights, tutorials, and best practices on cloud infrastructure, Terraform, and DevOps.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Link from "next/link";

const posts = [
  {
    category: "Tutorial",
    date: "March 28, 2026",
    title: "How to Deploy a Multi-Region AWS Setup in Under 10 Minutes",
    excerpt:
      "Walk through creating a highly available, multi-region AWS architecture using InfraGlide's visual designer and Terraform auto-generation.",
    readTime: "8 min read",
  },
  {
    category: "Best Practices",
    date: "March 20, 2026",
    title: "5 Terraform Patterns Every Cloud Engineer Should Know",
    excerpt:
      "From module composition to workspace isolation, these Terraform patterns will make your infrastructure codebases more maintainable and scalable.",
    readTime: "6 min read",
  },
  {
    category: "Product",
    date: "March 12, 2026",
    title: "Introducing Drift Detection: Know When Your Infrastructure Changes",
    excerpt:
      "Infrastructure drift is a silent threat. Learn how InfraGlide's new Drift Detection feature keeps your actual infrastructure in sync with your desired state.",
    readTime: "5 min read",
  },
  {
    category: "DevOps",
    date: "March 5, 2026",
    title: "Cutting Cloud Costs by 40%: Real Strategies That Work",
    excerpt:
      "We analysed thousands of deployments and found the most impactful ways teams waste cloud budget — and how to fix them without sacrificing reliability.",
    readTime: "10 min read",
  },
  {
    category: "Security",
    date: "February 22, 2026",
    title: "Zero-Trust Infrastructure: How to Implement RBAC at Scale",
    excerpt:
      "Role-based access control is table stakes for enterprise infrastructure. Here's how to design RBAC policies that are both secure and operationally practical.",
    readTime: "7 min read",
  },
  {
    category: "Tutorial",
    date: "February 14, 2026",
    title: "Migrating from Manual Terraform to InfraGlide in 4 Steps",
    excerpt:
      "Already managing Terraform manually? Learn how to import your existing state files and modules into InfraGlide without disrupting running infrastructure.",
    readTime: "9 min read",
  },
];

const categoryColor: Record<string, string> = {
  Tutorial: "bg-indigo-500/20 text-indigo-300",
  "Best Practices": "bg-emerald-500/20 text-emerald-300",
  Product: "bg-blue-500/20 text-blue-300",
  DevOps: "bg-purple-500/20 text-purple-300",
  Security: "bg-amber-500/20 text-amber-300",
};

export default function Blog() {
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
                InfraGlide Blog
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Insights & Tutorials
            </h1>
            <p className="text-lg text-indigo-200/65">
              Deep dives on cloud infrastructure, DevOps, Terraform, and how teams are building better systems.
            </p>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.title}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:before:[background:linear-gradient(to_right,var(--color-indigo-800),var(--color-indigo-700),var(--color-indigo-800))_border-box] transition-all"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${categoryColor[post.category] ?? "bg-gray-500/20 text-gray-300"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-indigo-200/45">{post.date}</span>
                </div>
                <h2 className="mb-2 font-nacelle text-base font-semibold text-gray-200 group-hover:text-indigo-300 transition-colors">
                  {post.title}
                </h2>
                <p className="mb-4 flex-1 text-sm text-indigo-200/65">{post.excerpt}</p>
                <span className="text-xs text-indigo-200/45">{post.readTime}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
