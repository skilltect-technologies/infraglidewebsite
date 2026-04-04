export const metadata = {
  title: "Privacy Policy - InfraGlide",
  description: "How InfraGlide collects, uses, and protects your personal information.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";

export default function Privacy() {
  return (
    <section className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image className="max-w-none" src={BlurredShapeGray} width={760} height={668} alt="" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Header */}
          <div className="pb-10 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Legal
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-2 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Privacy Policy
            </h1>
            <p className="text-sm text-indigo-200/45">Last updated: April 4, 2026</p>
          </div>

          {/* Content */}
          <div className="prose-custom space-y-8 text-indigo-200/65">
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">1. Information We Collect</h2>
              <p className="text-sm leading-relaxed">We collect information you provide directly to us, such as when you create an account, subscribe to a plan, or contact our support team. This includes your name, email address, company name, and billing information. We also collect usage data — such as features accessed, deployment counts, and error logs — to improve the platform.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">2. How We Use Your Information</h2>
              <p className="text-sm leading-relaxed">We use your information to provide and improve the InfraGlide platform, communicate with you about your account, send product updates and marketing communications (which you can opt out of at any time), comply with legal obligations, and detect and prevent fraud or abuse.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">3. Data Sharing</h2>
              <p className="text-sm leading-relaxed">We do not sell your personal data. We may share information with third-party service providers who assist in operating our platform (such as cloud hosting providers, payment processors, and analytics tools) under strict contractual confidentiality obligations. We may also disclose information when required by law.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">4. Data Retention</h2>
              <p className="text-sm leading-relaxed">We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting support@infraglide.com. We will comply within 30 days, subject to legal retention requirements.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">5. Security</h2>
              <p className="text-sm leading-relaxed">We employ industry-standard security measures including encryption at rest and in transit (TLS 1.2+), SOC 2 Type II compliance, role-based access controls, and regular third-party security audits. No method of transmission over the internet is 100% secure and we cannot guarantee absolute security.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">6. Cookies</h2>
              <p className="text-sm leading-relaxed">We use cookies and similar technologies to keep you logged in, remember preferences, and analyse usage patterns. You can control cookie settings in your browser. Disabling certain cookies may affect platform functionality.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">7. Your Rights</h2>
              <p className="text-sm leading-relaxed">Depending on your jurisdiction, you may have the right to access, correct, delete, or port your personal data. To exercise these rights, contact us at privacy@infraglide.com. We will respond within 30 days.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">8. Contact</h2>
              <p className="text-sm leading-relaxed">For privacy-related enquiries, contact our Data Protection Officer at privacy@infraglide.com.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
