import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SplitTextProps {
  children: string;
  className?: string;
  style?: React.CSSProperties;
}

// Helper component to split text into characters for staggering animation
const SplitText = ({ children, className = "", style }: SplitTextProps) => {
  const words = children.split(" ");
  return (
    <span className={`inline-flex items-baseline ${className}`} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="split-word inline-flex items-baseline mr-[0.25em]"
        >
          {word.split("").map((char, j) => (
            <span key={j} className="split-char inline-block select-none">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default function TextScrollMarquee() {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;

    // Small timeout to guarantee measurements occur after DOM rendering settles
    const timer = setTimeout(() => {
      if (!triggerRef.current) return;

      ctx = gsap.context(() => {
        // Character-split stagger animation
        const words = gsap.utils.toArray(".split-word") as HTMLElement[];
        words.forEach((word) => {
          const chars = word.querySelectorAll(".split-char");
          gsap.from(chars, {
            yPercent: 85,
            opacity: 0,
            rotateX: -70,
            stagger: 0.04,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: word,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        });
      }, triggerRef);
    }, 100);

    // Refresh ScrollTrigger when fonts load to ensure layout calculations are correct
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      ref={triggerRef}
      className="relative w-full overflow-hidden z-30 flex items-center justify-center py-24 md:py-32"
      style={{
        backgroundColor: "#8A53D6",
      }}
    >
      {/* 1. Dotted Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.45) 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* 2. Full-screen Blur Layer to soften the grid under the text */}
      <div
        className="absolute inset-0 pointer-events-none -[6px] z-10"
        style={{
          background: "radial-gradient(circle at center, transparent 35%, rgba(138, 83, 214, 0.2) 100%)",
        }}
      />

      {/* 3. The Centered Text */}
      <div
        className="relative z-20 flex flex-wrap justify-center items-center text-white text-center"
        style={{
          fontFamily: '"Cabinet Grotesk", "Satoshi", ui-sans-serif, system-ui, sans-serif',
        }}
      >
        <span className="inline-flex items-baseline">
          <SplitText
            className="text-[10vh] md:text-[14vh] font-medium tracking-tight leading-none text-white/90"
            children="one"
          />
        </span>
        <SplitText
          className="text-[11vh] md:text-[15vh] font-serif italic font-semibold leading-none mx-4"
          style={{ fontFamily: "Georgia, serif" }}
          children="playful canvas."
        />
      </div>
    </div>
  );
}
