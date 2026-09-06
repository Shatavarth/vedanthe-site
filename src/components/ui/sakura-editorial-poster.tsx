"use client";

import { useEffect, useRef, useState } from "react";

export type SakuraEditorialKeyword = {
  label: string;
};

export type SakuraEditorialPosterProps = {
  title?: string;
  keywords?: SakuraEditorialKeyword[];
  headline?: string;
  body?: string;
  subheadline?: string;
  footerLeft?: string;
  footerCenter?: string;
  footerRight?: string;
  socialHandle?: string;
  sceneSrc?: string;
  sceneAlt?: string;
  foregroundSrc?: string | null;
  foregroundAlt?: string;
  height?: string;
  forceProgress?: number;
  preview?: boolean;
  className?: string;
};

export const SAKURA_EDITORIAL_DEFAULT_KEYWORDS: SakuraEditorialKeyword[] = [
  { label: "Hand-Poured" },
  { label: "Tuscany" },
  { label: "Timeless" },
];

const DEFAULT_BODY =
  "The Vedanthè Vandelle bundle — 30ml perfume oil paired with a 5ml rollon for on-the-go wear, hand-blended and made to last close to the skin.";

const FRAME_PAD_CLASS = "p-[clamp(1.25rem,4vmin,2.5rem)]";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function getScrollParent(el: HTMLElement): HTMLElement | Window {
  let node: HTMLElement | null = el.parentElement;
  while (node) {
    const style = window.getComputedStyle(node);
    const oy = style.overflowY;
    const canScroll =
      (oy === "auto" || oy === "scroll" || oy === "overlay") &&
      node.scrollHeight > node.clientHeight + 1;
    if (canScroll) {
      if (node === document.documentElement || node === document.body) {
        return window;
      }
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

function readScrollProgress(
  track: HTMLElement,
  scrollRoot: HTMLElement | Window,
): number {
  const useWindowScroll =
    !(scrollRoot instanceof HTMLElement) ||
    (typeof document !== "undefined" &&
      (scrollRoot === document.documentElement || scrollRoot === document.body));

  if (useWindowScroll) {
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const scrollable = track.offsetHeight - vh;
    if (scrollable <= 0) return 1;
    return clamp01(-rect.top / scrollable);
  }

  const rootRect = scrollRoot.getBoundingClientRect();
  const trackRect = track.getBoundingClientRect();
  const scrollable = track.offsetHeight - scrollRoot.clientHeight;
  if (scrollable <= 0) return 1;
  return clamp01((rootRect.top - trackRect.top) / scrollable);
}

type TitleChar = {
  key: string;
  char: string;
  index: number;
  fromCenter: number;
};

function splitTitleChars(title: string): TitleChar[] {
  const chars = Array.from(title);
  const mid = Math.max(chars.length - 1, 1) / 2;
  return chars.map((char, index) => ({
    key: `${index}-${char === " " ? "sp" : char}`,
    char: char === " " ? " " : char,
    index,
    fromCenter: mid <= 0 ? 0 : Math.abs(index - mid) / mid,
  }));
}

function charReveal(progress: number, fromCenter: number): number {
  const start = fromCenter * 0.55;
  const end = Math.min(1, start + 0.38);
  return clamp01((progress - start) / Math.max(0.001, end - start));
}

function SakuraFitTitle({
  title,
  revealProgress,
}: {
  title: string;
  revealProgress: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [fontPx, setFontPx] = useState<number | null>(null);
  const chars = splitTitleChars(title);
  const titleProgress = clamp01(revealProgress / 0.4);

  useEffect(() => {
    const wrap = wrapRef.current;
    const probe = probeRef.current;
    if (!wrap || !probe) return;

    const PROBE = 100;
    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      const next = (wrap.clientWidth / Math.max(1, probe.scrollWidth)) * PROBE;
      if (!Number.isFinite(next) || next <= 0) return;
      setFontPx(next);
    };

    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    const fonts = document.fonts;
    const onFonts = () => {
      void fonts?.ready.then(fit);
    };
    fonts?.addEventListener?.("loadingdone", onFonts);
    void (async () => {
      try {
        await fonts?.load?.('700 100px "Playfair Display"');
      } catch {
        /* fallback metrics */
      }
      await fonts?.ready;
      fit();
    })();
    fit();

    return () => {
      cancelled = true;
      ro.disconnect();
      fonts?.removeEventListener?.("loadingdone", onFonts);
    };
  }, [title]);

  const titleStyle = {
    fontFamily: "var(--serif)",
    fontWeight: 700,
    letterSpacing: "0.04em",
    WebkitFontSmoothing: "antialiased" as const,
    MozOsxFontSmoothing: "grayscale" as const,
    textRendering: "geometricPrecision" as const,
  };

  return (
    <div
      ref={wrapRef}
      className="absolute inset-x-[4%] top-[4%] z-20 overflow-visible"
    >
      <span
        ref={probeRef}
        aria-hidden
        className="pointer-events-none invisible absolute whitespace-nowrap uppercase leading-none"
        style={{ ...titleStyle, fontSize: 100 }}
      >
        {title}
      </span>
      <h1
        className="text-gold m-0 overflow-visible whitespace-nowrap text-left uppercase leading-none"
        style={{
          ...titleStyle,
          fontSize: fontPx != null ? `${fontPx}px` : "min(36cqw, 52cqh)",
        }}
      >
        {chars.map((item) => {
          const t = charReveal(titleProgress, item.fromCenter);
          const y = (1 - t) * (18 + item.fromCenter * 24);
          const side = item.index < chars.length / 2 ? 1 : -1;
          const x =
            (1 - t) *
            (item.fromCenter > 0.01 ? item.fromCenter * 16 * side : 0);
          return (
            <span
              key={item.key}
              aria-hidden
              className="inline-block"
              style={{
                opacity: t,
                transform: `translate3d(${x}px, ${y}px, 0)`,
              }}
            >
              {item.char}
            </span>
          );
        })}
        <span className="sr-only">{title}</span>
      </h1>
    </div>
  );
}

function SakuraHeroVisual({
  title,
  sceneSrc,
  sceneAlt,
  foregroundSrc,
  foregroundAlt,
  revealProgress,
}: {
  title: string;
  sceneSrc: string;
  sceneAlt: string;
  foregroundSrc: string | null;
  foregroundAlt: string;
  revealProgress: number;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={sceneSrc}
          alt={sceneAlt}
          className="absolute inset-0 h-full w-full scale-105 object-cover object-center"
          draggable={false}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.22] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          aria-hidden
          className="from-maroon-deep/70 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
        />
      </div>

      <SakuraFitTitle title={title} revealProgress={revealProgress} />

      {foregroundSrc ? (
        <img
          src={foregroundSrc}
          alt={foregroundAlt}
          className="drop-shadow-maroon-deep/35 pointer-events-none absolute bottom-0 left-1/2 z-30 h-auto w-[min(92%,78cqh)] -translate-x-[40%] object-contain object-bottom"
          draggable={false}
        />
      ) : null}

      <div
        aria-hidden
        className="to-white/25 pointer-events-none absolute inset-0 z-[35] bg-gradient-to-b from-transparent via-transparent"
      />
    </div>
  );
}

function SakuraEditorialCopy({
  keywordItems,
  headline,
  body,
  subheadline,
  footerLeft,
  footerCenter,
  footerRight,
  socialHandle,
}: {
  keywordItems: SakuraEditorialKeyword[];
  headline: string;
  body: string;
  subheadline: string;
  footerLeft: string;
  footerCenter: string;
  footerRight: string;
  socialHandle?: string;
}) {
  return (
    <div className="text-ivory relative flex min-h-[38%] flex-col border-0 bg-transparent p-[clamp(1.1rem,4.5cqw,2.25rem)]">
      <div
        aria-hidden
        className="from-maroon/90 via-maroon-deep/55 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
      />
      <div className="text-ivory/70 relative z-10 flex items-start justify-between gap-3 text-[clamp(9px,1.7cqw,11px)] font-light tracking-[0.16em] uppercase">
        {keywordItems.map((item) => (
          <span key={item.label}>{item.label}</span>
        ))}
      </div>

      <h2
        className="text-gold relative z-10 mt-[clamp(0.7rem,2.2cqw,1.15rem)] text-[clamp(1.2rem,3.6cqw,1.7rem)] leading-[1.3] font-semibold"
        style={{ fontFamily: "var(--serif)" }}
      >
        {headline}
      </h2>

      <p className="text-ivory/85 relative z-10 mt-[clamp(0.5rem,1.6cqw,0.75rem)] max-w-[62%] text-[clamp(10px,1.7cqw,12px)] leading-[1.55] font-light">
        {body}
      </p>

      <p
        className="text-ivory relative z-10 mt-[clamp(0.65rem,2cqw,0.95rem)] text-[clamp(0.95rem,2.6cqw,1.2rem)] leading-[1.35] font-medium"
        style={{ fontFamily: "var(--sans)" }}
      >
        {subheadline}
      </p>

      <div className="text-ivory/75 relative z-10 mt-auto flex items-end justify-between gap-3 pt-[clamp(0.7rem,2.4cqw,1.1rem)] text-[clamp(9px,1.6cqw,11px)] font-light tracking-[0.08em]">
        <span>{footerLeft}</span>
        <span>{footerCenter}</span>
        <span>{footerRight}</span>
      </div>

      {socialHandle ? (
        <span className="text-ivory/40 absolute right-[clamp(0.75rem,4.5cqw,2.25rem)] bottom-[clamp(0.35rem,1.2cqw,0.65rem)] z-10 text-[clamp(9px,2cqw,11px)] font-light tracking-[0.04em]">
          {socialHandle}
        </span>
      ) : null}
    </div>
  );
}

export function SakuraEditorialPoster({
  title = "VEDANTHÈ",
  keywords = SAKURA_EDITORIAL_DEFAULT_KEYWORDS,
  headline = "The Scent of Who You've Become",
  body = DEFAULT_BODY,
  subheadline = "Worn close. Remembered longer.",
  footerLeft = "VEDANTHÈ",
  footerCenter = "The Villa Collection",
  footerRight = String(new Date().getFullYear()),
  socialHandle = "@vedanthe",
  sceneSrc = "/gallery/gallery-1.png",
  sceneAlt = "Villa Sull'Ombra editorial — red curtains and warm light",
  foregroundSrc = null,
  foregroundAlt = "",
  height = "200vh",
  forceProgress,
  preview = false,
  className,
}: SakuraEditorialPosterProps) {
  const trackRef = useRef<HTMLElement>(null);
  const keywordItems = keywords.filter((item) => item.label.trim().length > 0);

  const locked = forceProgress != null && Number.isFinite(forceProgress);
  const [progress, setProgress] = useState(
    forceProgress != null ? clamp01(forceProgress) : 0,
  );
  const [stickyPx, setStickyPx] = useState<number | null>(null);

  const fillViewport = locked || preview;
  const trackHeight = fillViewport ? "auto" : height;
  const useSticky = !locked && !preview;

  useEffect(() => {
    if (locked || preview) {
      setProgress(clamp01(forceProgress ?? 0));
      setStickyPx(null);
      return;
    }

    const track = trackRef.current;
    if (!track) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    const scrollRoot = getScrollParent(track);
    let target = 0;
    let current = 0;
    let raf = 0;
    let running = false;

    const read = () => {
      const fromRoot = readScrollProgress(track, scrollRoot);
      if (scrollRoot === window) return fromRoot;
      const fromWindow = readScrollProgress(track, window);
      return Math.abs(fromWindow - fromRoot) > 0.02 ? fromWindow : fromRoot;
    };

    // Only keep scheduling frames while actively converging on a new scroll
    // position; idle once settled instead of running forever off-screen.
    const loop = () => {
      const delta = target - current;
      current += Math.abs(delta) > 0.35 ? delta * 0.22 : delta * 0.14;
      if (Math.abs(delta) < 0.0008) {
        current = target;
        setProgress(current);
        running = false;
        return;
      }
      setProgress(current);
      raf = window.requestAnimationFrame(loop);
    };

    const ensureRunning = () => {
      if (!running) {
        running = true;
        raf = window.requestAnimationFrame(loop);
      }
    };

    const onScroll = () => {
      target = read();
      ensureRunning();
    };

    const onResize = () => {
      if (scrollRoot === window) {
        setStickyPx(window.innerHeight);
      } else {
        setStickyPx((scrollRoot as HTMLElement).clientHeight);
      }
      target = read();
      ensureRunning();
    };

    onResize();
    target = read();
    current = target;
    setProgress(current);

    const opts: AddEventListenerOptions = { passive: true };
    scrollRoot.addEventListener("scroll", onScroll, opts);
    window.addEventListener("resize", onResize);
    running = true;
    raf = window.requestAnimationFrame(loop);

    return () => {
      scrollRoot.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(raf);
    };
  }, [forceProgress, locked, preview]);

  const revealProgress = locked || preview ? clamp01(forceProgress ?? 0) : progress;
  const copyProgress = clamp01((revealProgress - 0.78) / 0.22);
  const copyOffset = `${(1 - copyProgress) * 100}%`;
  const panelHeight =
    useSticky && stickyPx != null
      ? stickyPx
      : fillViewport
        ? "100%"
        : ("100svh" as const);

  return (
    <section
      ref={trackRef}
      className={cn(
        "bg-ivory relative isolate w-full",
        fillViewport && "h-screen",
        className,
      )}
      style={{
        height: useSticky ? trackHeight : undefined,
        fontFamily: "var(--sans)",
      }}
    >
      <div
        className={cn(
          "box-border w-full overflow-hidden",
          FRAME_PAD_CLASS,
          useSticky ? "sticky top-0" : "relative",
        )}
        style={{ height: panelHeight }}
      >
        <article className="@container shadow-maroon-deep/20 relative flex h-full min-h-0 w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_80px_rgba(58,26,28,0.2)]">
          <div className="@container relative min-h-0 flex-1 overflow-hidden [container-type:size]">
            <SakuraHeroVisual
              title={title}
              sceneSrc={sceneSrc}
              sceneAlt={sceneAlt}
              foregroundSrc={foregroundSrc}
              foregroundAlt={foregroundAlt}
              revealProgress={revealProgress}
            />
          </div>

          <div
            className="absolute inset-x-0 bottom-0 z-30 will-change-transform"
            style={{ transform: `translate3d(0, ${copyOffset}, 0)` }}
          >
            <SakuraEditorialCopy
              keywordItems={keywordItems}
              headline={headline}
              body={body}
              subheadline={subheadline}
              footerLeft={footerLeft}
              footerCenter={footerCenter}
              footerRight={footerRight}
              socialHandle={socialHandle}
            />
          </div>
        </article>
      </div>
    </section>
  );
}

export default SakuraEditorialPoster;
