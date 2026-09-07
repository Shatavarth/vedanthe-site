"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
// Reskinned for VEDANTHÈ: no separate webfont import (reuses the site's own
// --serif/--sans, already loaded in index.html) and every color derives from
// the brand tokens instead of generic shadcn --primary/--secondary/--destructive
// (which this project never defines, since it isn't shadcn's default-gray
// theme). --background/--foreground are overridden locally to the dark
// maroon/ivory pair this glass aesthetic is designed for, rather than the
// page's light ivory/ink default — everything else (pills, glow, grid) is
// the original component's own theme-adaptive color-mix() math, unchanged.
const STYLES = `
.cinematic-footer-wrapper {
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;

  --background: var(--maroon-deep);
  --foreground: var(--ivory);
  --primary: var(--gold);
  --secondary: var(--maroon);
  --muted-foreground: rgb(248 243 234 / 0.6);
  --border: rgb(201 161 90 / 0.18);

  --pill-bg-1: color-mix(in oklch, var(--foreground) 3%, transparent);
  --pill-bg-2: color-mix(in oklch, var(--foreground) 1%, transparent);
  --pill-shadow: color-mix(in oklch, var(--background) 50%, transparent);
  --pill-highlight: color-mix(in oklch, var(--foreground) 10%, transparent);
  --pill-inset-shadow: color-mix(in oklch, var(--background) 80%, transparent);
  --pill-border: color-mix(in oklch, var(--foreground) 8%, transparent);

  --pill-bg-1-hover: color-mix(in oklch, var(--foreground) 8%, transparent);
  --pill-bg-2-hover: color-mix(in oklch, var(--foreground) 2%, transparent);
  --pill-border-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
  --pill-shadow-hover: color-mix(in oklch, var(--background) 70%, transparent);
  --pill-highlight-hover: color-mix(in oklch, var(--foreground) 20%, transparent);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 40s linear infinite;
}

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 3%, transparent) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in oklch, var(--primary) 15%, transparent) 0%,
    color-mix(in oklch, var(--secondary) 15%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
      0 10px 30px -10px var(--pill-shadow),
      inset 0 1px 1px var(--pill-highlight),
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
      0 20px 40px -10px var(--pill-shadow-hover),
      inset 0 1px 1px var(--pill-highlight-hover);
  color: var(--foreground);
}

.footer-giant-bg-text {
  font-family: var(--serif);
  font-size: 20vw;
  line-height: 0.85;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklch, var(--primary) 12%, transparent);
  background: linear-gradient(180deg, color-mix(in oklch, var(--primary) 16%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  font-family: var(--serif);
  background: linear-gradient(180deg, var(--primary) 0%, color-mix(in oklch, var(--primary) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in oklch, var(--primary) 20%, transparent));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE (Zero Dependency)
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. MAIN COMPONENT
// -------------------------------------------------------------------------
const MARQUEE_PHRASES = [
  "Hand-Poured in Tuscany",
  "Small-Batch Crafted",
  "Alcohol-Free Oil",
  "Worn Close, Remembered Longer",
  "The Villa Ritual",
];

const MarqueeItem = () => (
  <div className="flex items-center space-x-12 px-6">
    {MARQUEE_PHRASES.map((phrase, i) => (
      <React.Fragment key={phrase}>
        <span>{phrase}</span>
        <span className="text-primary/60">✦</span>
      </React.Fragment>
    ))}
  </div>
);

const SOCIAL_LINKS = [
  { label: "IG", name: "Instagram", href: "#top" },
  { label: "X", name: "X", href: "#top" },
  { label: "TT", name: "TikTok", href: "#top" },
];

export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "10vh", scale: 0.8, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 40%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <div
        id="footer"
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-background text-foreground cinematic-footer-wrapper">
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[80px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[5vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            VEDANTHÈ
          </div>

          {/* Diagonal Sleek Marquee (top of footer) */}
          <div className="absolute top-12 left-0 w-full overflow-hidden border-y border-border/50 bg-background/60 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.3em] text-muted-foreground uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* Main center content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-3xl mx-auto">
            <h2
              ref={headingRef}
              className="text-5xl md:text-7xl font-semibold footer-text-glow tracking-tight mb-10 text-center uppercase"
            >
              The Villa Awaits
            </h2>

            <div ref={linksRef} className="flex flex-col items-center gap-5 w-full">
              <div className="flex flex-wrap justify-center gap-4 w-full [perspective:1000px]">
                <MagneticButton
                  as="a"
                  href="#collections"
                  className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  Shop the Collection
                </MagneticButton>

                <MagneticButton
                  as="a"
                  href="mailto:mary@vedanthe.com"
                  className="footer-glass-pill px-10 py-5 rounded-full text-foreground font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  Get in Touch
                </MagneticButton>
              </div>

              <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full [perspective:1000px]">
                <MagneticButton as="a" href="#top" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">
                  Our Story
                </MagneticButton>
                <MagneticButton as="a" href="#top" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">
                  Gift Sets
                </MagneticButton>
                <MagneticButton as="a" href="#top" className="footer-glass-pill px-6 py-3 rounded-full text-muted-foreground font-medium text-xs md:text-sm hover:text-foreground">
                  FAQ
                </MagneticButton>
                <MagneticButton as="a" href="/contact" className="footer-glass-pill px-6 py-3 rounded-full text-primary font-medium text-xs md:text-sm hover:text-foreground">
                  Give $10, Get $10
                </MagneticButton>
              </div>

              <p className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase mt-2">
                Sign up for 10% off your first order
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="footer-glass-pill flex items-center gap-1 rounded-full p-1.5 w-full max-w-sm"
              >
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  aria-label="Email address"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-xs md:text-sm font-bold text-[var(--maroon-deep)] transition-opacity hover:opacity-90"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom bar / credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 [perspective:1000px]">
            <div className="text-muted-foreground text-[10px] md:text-xs font-semibold tracking-widest uppercase order-3 md:order-1">
              © {new Date().getFullYear()} VEDANTHÈ. All rights reserved.
            </div>

            <div className="flex items-center gap-2 order-1 md:order-2 [perspective:1000px]">
              {SOCIAL_LINKS.map((social) => (
                <MagneticButton
                  key={social.name}
                  as="a"
                  href={social.href}
                  aria-label={social.name}
                  className="footer-glass-pill w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground text-[11px] font-bold"
                >
                  {social.label}
                </MagneticButton>
              ))}
            </div>

            <MagneticButton
              as="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-muted-foreground hover:text-foreground group order-2 md:order-3"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
