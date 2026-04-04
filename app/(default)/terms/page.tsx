export const metadata = {
  title: "Terms of Service - InfraGlide",
  description: "The terms and conditions governing your use of the InfraGlide platform.",
};

import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";

export default function Terms() {
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
              Terms of Service
            </h1>
            <p className="text-sm text-indigo-200/45">Last updated: April 4, 2026</p>
          </div>

          {/* Content */}
          <div className="space-y-8 text-indigo-200/65">
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">1. Acceptance of Terms</h2>
              <p className="text-sm leading-relaxed">By accessing or using the InfraGlide platform, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, you may not use the platform. These terms govern all users including individuals on free trials and paid plan subscribers.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">2. Use of the Platform</h2>
              <p className="text-sm leading-relaxed">You may use InfraGlide only for lawful purposes and in accordance with these terms. You agree not to use the platform to violate any applicable laws, infringe on the rights of others, transmit malicious code, or attempt to gain unauthorised access to any systems or networks. InfraGlide reserves the right to suspend or terminate accounts that violate these terms.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">3. Accounts & Subscriptions</h2>
              <p className="text-sm leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Subscriptions are billed monthly or annually as selected. You may cancel at any time; cancellation takes effect at the end of the current billing period. We do not offer refunds for partial billing periods except where required by law.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">4. Your Data</h2>
              <p className="text-sm leading-relaxed">You retain ownership of all infrastructure configurations, Terraform code, and data you create using InfraGlide. You grant us a limited licence to host and process this data solely to provide the service. We do not use your infrastructure data to train AI models or share it with third parties except as required to operate the platform.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">5. Service Availability</h2>
              <p className="text-sm leading-relaxed">We aim for 99.9% uptime. Planned maintenance will be announced in advance. We are not liable for downtime caused by factors outside our control including cloud provider outages, DDoS attacks, or force majeure events.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">6. Intellectual Property</h2>
              <p className="text-sm leading-relaxed">InfraGlide and its licensors own all rights to the platform, including all software, logos, trademarks, and documentation. You may not copy, modify, reverse-engineer, or redistribute any part of the platform without prior written consent.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">7. Limitation of Liability</h2>
              <p className="text-sm leading-relaxed">To the extent permitted by law, InfraGlide shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits or data, arising from your use of the platform. Our maximum aggregate liability for any claim is limited to the amount you paid in the 12 months preceding the claim.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">8. Changes to Terms</h2>
              <p className="text-sm leading-relaxed">We may update these terms from time to time. We will notify you by email or in-platform notice at least 14 days before changes take effect. Continued use of the platform after changes indicates your acceptance of the updated terms.</p>
            </div>
            <div>
              <h2 className="mb-3 font-nacelle text-lg font-semibold text-gray-200">9. Contact</h2>
              <p className="text-sm leading-relaxed">For questions about these terms, contact us at legal@infraglide.com.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
