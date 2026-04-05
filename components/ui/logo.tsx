import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/logo.svg";

export default function Logo() {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center gap-2.5" aria-label="InfraGlide">
      <Image src={logo} alt="InfraGlide Logo" width={32} height={32} />
      <span className="font-nacelle text-sm font-semibold tracking-wide text-gray-100">
        Infra<span className="text-indigo-400">Glide</span>
      </span>
    </Link>
  );
}
