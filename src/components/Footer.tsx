import React from 'react';
import { Instagram, Globe, Linkedin } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import logoUrl from "@/assets/infraglide-logo.webp";

const NAV_COLS = [
  {
    h: "Product",
    l: [
      { name: "Features", path: "/#features" },
      { name: "Documentation", path: "https://docs.infraglide.com" },
      { name: "Templates", path: "/templates" },

    ],
  },
  {
    h: "Company",
    l: [
      { name: "About", path: "/about" },
      { name: "Team", path: "/team" },
      { name: "Contact", path: "/contact" },
    ],
  },
  {
    h: "Legal & Security",
    l: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      { name: "Security", path: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="border-t py-14 mt-10 z-[100] relative bg-[var(--ig-bg)]"
      style={{ borderColor: "rgba(138,83,214,.15)" }}
      aria-label="InfraGlide site footer"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-4 gap-10">
        {/* Brand column */}
        <div>
          <Link to="/" aria-label="InfraGlide — Home">
            <img
              src={logoUrl}
              alt="InfraGlide logo"
              className="h-9 w-auto mb-4 dark:invert dark:hue-rotate-180 dark:brightness-125"
              width={120}
              height={36}
              loading="lazy"
            />
          </Link>
          <p className="text-sm text-[var(--ig-muted)] max-w-xs leading-relaxed mb-4">
            The AI-powered visual cloud infrastructure platform for&nbsp;
            <strong className="font-semibold text-[var(--ig-text)]">AWS</strong>,{" "}
            <strong className="font-semibold text-[var(--ig-text)]">Azure</strong>, and{" "}
            <strong className="font-semibold text-[var(--ig-text)]">GCP</strong>.
            Terraform-native. Drift-aware. Collaborative.
          </p>
          <p className="text-xs text-[var(--ig-dim)]">
            <span aria-label="Office locations">Delhi · Bangalore · Jodhpur</span>
          </p>
          <a
            href="mailto:connect@infraglide.com"
            className="text-xs text-[var(--ig-muted)] hover:text-[#8A53D6] transition-colors mt-2 inline-block"
            aria-label="Email InfraGlide"
          >
            connect@infraglide.com
          </a>
        </div>

        {/* Link columns */}
        {NAV_COLS.map((col) => (
          <nav key={col.h} aria-label={`${col.h} links`}>
            <div className="text-xs uppercase tracking-widest text-[var(--ig-accent)] mb-4 font-bold">
              {col.h}
            </div>
            <ul className="space-y-3" role="list">
              {col.l.map((link) => (
                <li key={link.name}>
                  {link.path.startsWith('http') ? (
                    <a
                      href={link.path}
                      className="text-sm font-medium text-[var(--ig-muted)] hover:text-[var(--ig-text)] transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-sm font-medium text-[var(--ig-muted)] hover:text-[var(--ig-text)] transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="mx-auto max-w-6xl px-6 mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
        style={{ borderColor: "rgba(138,83,214,.12)" }}
      >
        <p className="text-xs font-medium text-[var(--ig-dim)]">
          © {new Date().getFullYear()} InfraGlide Labs Pvt. Ltd. All rights reserved.
          <span className="block mt-1">
            This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ig-text)] transition-colors">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--ig-text)] transition-colors">Terms of Service</a> apply.
          </span>
        </p>

        {/* Social links */}
        <div className="flex items-center gap-5 text-[var(--ig-muted)]" aria-label="Skilltect social media">
          <a
            href="https://www.skilltect.com/"
            aria-label="Skilltect Website"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-[var(--ig-text)] transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
          <a
            href="https://www.instagram.com/skilltect_technologies/"
            aria-label="Skilltect on Instagram"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-[var(--ig-text)] transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://in.linkedin.com/company/skilltect"
            aria-label="Skilltect on LinkedIn"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-[var(--ig-text)] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
