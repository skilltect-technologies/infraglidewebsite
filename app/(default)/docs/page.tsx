export const metadata = {
  title: "Documentation - InfraGlide",
  description:
    "Everything you need to know about InfraGlide — guides for My Pipelines, Manage Users, Hub, Architecture, RBAC, and more.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import DocsContent from "@/components/docs-content";

export default function Documentation() {
  return (
    <section id="docs" className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>
      <DocsContent />
    </section>
  );
}
