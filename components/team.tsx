import Image from "next/image";
import BlurredShapeGray from "@/public/images/blurred-shape-gray.svg";
import Avatar01 from "@/public/images/testimonial-01.jpg";
import Avatar02 from "@/public/images/testimonial-02.jpg";
import Avatar03 from "@/public/images/testimonial-03.jpg";
import Ravindra from "@/public/images/Ravindra.png";
import Nakshatra from "@/public/images/Nakshatra.jpeg";
import Harsh from "@/public/images/Harsh.jpeg";
import Kamal from "@/public/images/Kamal.jpeg";
import Kartikey from "@/public/images/Kartikey.jpeg";
import Avatar09 from "@/public/images/testimonial-09.jpg";

const coreTeam = [
  { name: "Umesh Sharma", role: "Managing Director", avatar: Avatar01 },
  { name: "Manish Sharma", role: "Founder & CEO", avatar: Avatar02 },
  { name: "Sunil Kumar", role: "Chief Sales Officer", avatar: Avatar03 },
  { name: "Monika Sharma", role: "Head of Engineering", avatar: Avatar03 },
  { name: "Ravindra Sharma", role: "Head of Marketing", avatar: Ravindra },
  { name: "Nakshtra Singh Bhati", role: "Engineering Manager", avatar: Nakshatra },
  { name: "Harsh Shrivastav", role: "Engineering Manager", avatar: Harsh },
  { name: "Kamal Gaur", role: "Senior Developer", avatar: Kamal },
  { name: "Kartikey Purohit", role: "Senior Developer", avatar: Kartikey },
];

const guidingTeam = [
  {
    name: "Mukesh Purohit",
    role: "Mentor",
    avatar: Avatar09,
    bio: "Leading the technical vision and strategic guidance for our platform development.",
  },
  {
    name: "Prashant Kumar Jinega",
    role: "Mentor",
    avatar: Avatar01,
    bio: "Leading the technical vision and strategic guidance for our platform development.",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative">
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
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">

          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Our People
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Meet the Team
            </h2>
            <p className="text-lg text-indigo-200/65">
              The talented people behind InfraGlide who are passionate about
              simplifying cloud infrastructure for everyone.
            </p>
          </div>

          {/* Core team grid */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 mb-16">
            {coreTeam.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-5 text-center backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="mb-4 flex justify-center">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-indigo-500/30">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </div>
                <h3 className="font-nacelle text-sm font-semibold text-gray-200">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs text-indigo-200/65">{member.role}</p>
              </div>
            ))}
          </div>

          {/* Guiding team */}
          <div className="mx-auto max-w-3xl pb-8 text-center">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-indigo-200/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-indigo-200/50">
              <span className="inline-flex bg-linear-to-r from-indigo-500 to-indigo-200 bg-clip-text text-transparent">
                Guiding Lights
              </span>
            </div>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {guidingTeam.map((member) => (
              <div
                key={member.name}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-indigo-500/30">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-nacelle text-base font-semibold text-gray-200">
                      {member.name}
                    </h3>
                    <p className="text-sm text-indigo-400">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-indigo-200/65">{member.bio}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
