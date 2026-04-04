"use client";

import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
            <Link href="#features" className="text-sm text-gray-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#team" className="text-sm text-gray-300 hover:text-white transition-colors">
              Team
            </Link>
            <Link href="#pricing" className="text-sm text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#docs" className="text-sm text-gray-300 hover:text-white transition-colors">
              Docs
            </Link>
          </nav>

          <ul className="flex items-center gap-3">
            <li>
              <Link
                href="/free-trial"
                className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] mask-exclude before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
              >
                Free Trial
              </Link>
            </li>
            <li>
              <Link
                href="/schedule-demo"
                className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
              >
                Get Demo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
