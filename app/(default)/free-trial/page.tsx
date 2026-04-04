export const metadata = {
  title: "Start Free Trial - InfraGlide",
  description:
    "Sign up for a 7-day free trial of InfraGlide. Full access to all features. No credit card required.",
};

import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Image from "next/image";
import FreeTrialForm from "@/components/free-trial-form";

export default function FreeTrial() {
  return (
    <section className="relative">
      {/* Background decoration */}
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

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                7 Days Free · No Credit Card
              </span>
            </div>
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Sign Up for Free
            </h1>
            <p className="text-lg text-indigo-200/65">
              Get full access to all InfraGlide features for 7 days — no payment
              details required.
            </p>
          </div>

          <FreeTrialForm />
        </div>
      </div>
    </section>
  );
}
