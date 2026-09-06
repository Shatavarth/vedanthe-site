---
name: ui-ux-pro-max
description: VEDANTHÈ brand design system — colors, typography, spacing, motion, and imagery rules. Use whenever building, editing, or reviewing any page or section of the VEDANTHÈ website so every component matches the same maroon-and-gold luxury brand look.
---

# VEDANTHÈ UI/UX Design Skill

Use this skill whenever building or editing any page/section for the VEDANTHÈ website. Apply these rules consistently across every component so the whole site feels like one brand, not stitched-together sections.

## Color palette

| Role | Hex | Usage |
|---|---|---|
| Primary background | `#572629` (deep maroon — matches real packaging box) | Section backgrounds, navbar, footer |
| Accent / text on dark | `#c9a15a` (gold) | Headlines on maroon, icons, dividers, CTAs |
| Light background | `#f8f3ea` (warm ivory) | Alternating light sections (product grids, carousels) |
| Body text on light | `#2a2020` (near-black warm brown) | Paragraph copy on ivory sections |
| Muted text | `#a88f76` (soft taupe) | Secondary copy, captions, timestamps |

Rule: never place gold text on ivory (low contrast) — gold is reserved for maroon backgrounds. On ivory sections, use the near-black brown for headlines and taupe for secondary text.

## Typography

- **Headlines**: serif display font (e.g. "Playfair Display" or "Cormorant Garamond"), always uppercase or small-caps for section titles, generous letter-spacing (`0.05em`–`0.1em`)
- **Body text**: clean sans-serif (e.g. "Inter" or "Lato"), regular weight, never smaller than 16px on mobile
- **Type scale** (mobile → desktop):
  - H1 (hero headline): 32px → 56px
  - H2 (section title): 24px → 36px
  - H3 (card title): 18px → 22px
  - Body: 16px → 17px
  - Caption/label: 12px → 13px
- Line height: 1.2 for headlines, 1.6 for body copy

## Spacing

- Base unit: 8px — all margins/padding should be multiples of it (8, 16, 24, 32, 48, 64, 96)
- Section vertical padding: 64px on mobile, 120px on desktop
- Card internal padding: 24px
- Gap between grid items: 16px on mobile, 24px on desktop
- Never let text touch a section edge — minimum 16px horizontal padding on mobile

## Motion

- All entrance animations: fade + slight upward translate (`opacity 0→1`, `y: 20px→0`), 400–600ms duration, ease-out
- Stagger children in grids/lists by 80–100ms
- Hover states on cards: subtle lift (`translateY(-4px)`) + soft shadow, 200ms transition
- Never animate on every scroll re-entry — animate once on first appearance only

## Imagery

- Product shots: always on a dark maroon or soft-focus background with warm highlights (never plain white studio backgrounds — breaks the "old Italian villa" mood)
- Decorative accents: gold leaf line-art, smoke, roses — used sparingly as corner/edge accents, never covering focal content
- Border radius: 4px on buttons and inputs (sharp-ish, not pill-shaped — keeps the luxury/heritage feel), 12px on image cards

## Buttons

- Primary CTA: gold background (`#c9a15a`), maroon text (`#3f0f0a`), uppercase label, 4px radius, generous horizontal padding (32px+)
- Secondary/text link: underlined gold text on maroon backgrounds, underlined maroon text on ivory backgrounds
- Always include a visible hover state (slightly darker gold, or underline animation)

## Responsive rules

- Breakpoint: treat anything under 768px as mobile — stack all multi-column layouts to single column
- Never shrink tap targets below 44px height on mobile
- Test every section at 375px width before considering it done
