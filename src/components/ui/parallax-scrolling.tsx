'use client';

import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// The pasted component shipped with no CSS at all (every .parallax* class
// was undefined) and two bugs that would break the rest of the site:
//   1. Cleanup called `ScrollTrigger.getAll().forEach(st => st.kill())` —
//      that kills EVERY ScrollTrigger on the page, including the footer's
//      (CinematicFooter is mounted on every route via Layout), so visiting
//      Home once and navigating away would silently break the footer
//      animation everywhere else. Scoped to gsap.context() instead.
//   2. The gsap.ticker callback driving Lenis was registered but never
//      removed — a leak that accumulates a new stale callback every time
//      this component remounts. Now stored and removed on cleanup.
export function ParallaxComponent() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const root = parallaxRef.current;
    const triggerElement = root?.querySelector('[data-parallax-layers]');

    const ctx = gsap.context(() => {
      if (!triggerElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          { yPercent: layerObj.yPercent, ease: 'none' },
          idx === 0 ? undefined : '<',
        );
      });
    }, root);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis: Lenis | null = null;
    let rafCallback: ((time: number) => void) | null = null;

    if (!reduceMotion) {
      lenis = new Lenis();
      lenis.on('scroll', ScrollTrigger.update);
      rafCallback = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(rafCallback);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      ctx.revert();
      if (lenis && rafCallback) {
        gsap.ticker.remove(rafCallback);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals" data-parallax-layers>
          <div className="parallax__black-line-overflow" />

          <div className="parallax__layers">
            <img
              src="/hero/villa-facade-night.png"
              loading="eager"
              data-parallax-layer="1"
              alt=""
              aria-hidden="true"
              className="parallax__layer parallax__layer--img parallax__layer--bg"
            />
            <img
              src="/gallery/gallery-2.png"
              loading="eager"
              data-parallax-layer="2"
              alt=""
              aria-hidden="true"
              className="parallax__layer parallax__layer--img parallax__layer--texture"
            />
            <div data-parallax-layer="3" className="parallax__layer parallax__layer--title">
              <span className="parallax__eyebrow">Hand-Poured in Tuscany</span>
              <h1 className="parallax__title">VEDANTHÈ</h1>
              <span className="parallax__subtitle">The Villa Collection</span>
            </div>
          </div>

          <div className="parallax__fade" />
        </div>
      </section>

      <section className="parallax__content">
        <img src="/brand/vedanthe-icon.png" alt="" aria-hidden="true" className="parallax__icon" />
        <p className="parallax__story">
          The Vedanthè Vandelle bundle — 30ml perfume oil paired with a 5ml rollon for
          on-the-go wear, hand-blended and made to last close to the skin.
        </p>
        <Link to="/shop" className="btn btn--primary">
          Shop Now
        </Link>
      </section>
    </div>
  );
}

export default ParallaxComponent;
