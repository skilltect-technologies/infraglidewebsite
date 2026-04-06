"use client";

import { useState, useEffect, useCallback } from "react";

// Professional Unsplash images relevant to cloud infrastructure & DevOps
const slides = [
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
    label: "Cloud Infrastructure",
    caption: "Deploy and manage multi-cloud infrastructure from a single visual interface",
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    label: "Data Center Management",
    caption: "Full visibility and control over your servers, networks, and storage",
  },
  {
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80",
    label: "DevOps Pipelines",
    caption: "Automate CI/CD workflows and infrastructure deployments with confidence",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    label: "Analytics & Insights",
    caption: "Real-time dashboards to monitor cost, performance, and compliance",
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
    label: "Team Collaboration",
    caption: "Role-based access and shared workspaces for engineering teams of any size",
  },
  {
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80",
    label: "Secure by Default",
    caption: "RBAC, SSO, audit logging and drift detection built into every deployment",
  },
];

export default function HeroBannerSlider() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = () => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  };

  // Auto-advance every 4 s, paused while hovered
  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [isHovered, next]);

  return (
    <div
      className="relative mx-auto w-full overflow-hidden rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-aos="fade-up"
      data-aos-delay={200}
    >
      {/* Glow border */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none z-10" />

      {/* Slides */}
      <div className="relative aspect-[16/8] w-full bg-gray-900">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={slide.label}
              className="h-full w-full object-cover object-top"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-950/10 to-transparent" />
          </div>
        ))}

        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 pb-5">
          <span className="mb-1 inline-block rounded-full bg-indigo-500/20 px-3 py-0.5 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/30">
            {slides[current].label}
          </span>
          <p className="text-sm text-gray-300/80">{slides[current].caption}</p>
        </div>

        {/* Prev button */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/60 text-gray-300 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-gray-800 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Next button */}
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/60 text-gray-300 ring-1 ring-white/10 backdrop-blur-sm transition hover:bg-gray-800 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-14 right-6 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-indigo-400"
                : "w-1.5 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
