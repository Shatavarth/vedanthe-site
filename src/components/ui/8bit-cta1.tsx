import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Reimplemented against the site's own Card/typography system rather than
// 8bitcn's pixel-art "8bit-card" — a retro arcade aesthetic doesn't fit the
// villa/serif brand, no matter the color palette. Structure and props kept
// faithful to the original CTA1 block.
export interface ComparisonRow {
  feature: string;
  theirs: string;
  yours: string;
}

interface CTA1Props {
  className?: string;
  description?: string;
  rows?: ComparisonRow[];
  theirsLabel?: string;
  title?: string;
  yoursLabel?: string;
}

const defaultRows: ComparisonRow[] = [
  { feature: "Longevity", yours: "8–12 hours, worn close", theirs: "3–4 hours, fades fast" },
  { feature: "Ingredients", yours: "Alcohol-free oil", theirs: "High alcohol content" },
  { feature: "How It Wears", yours: "Warms with your skin", theirs: "Sprayed on, fades unevenly" },
  { feature: "On the Go", yours: "Rollon, spill-proof", theirs: "Glass bottle, breaks & spills" },
];

export default function CTA1({
  title = "The Oil Difference",
  description = "Two ways to wear a scent. Only one lasts until dusk.",
  yoursLabel = "VEDANTHÈ",
  theirsLabel = "Traditional Fragrance",
  rows = defaultRows,
  className,
}: CTA1Props) {
  return (
    <section className={cn("comparison", className)}>
      {(title || description) && (
        <div className="section-head">
          {title && <h2>{title}</h2>}
          {description && <p className="section-head__body">{description}</p>}
        </div>
      )}

      <Card className="comparison__card">
        <CardHeader className="comparison__head">
          <div className="comparison__row comparison__row--head">
            <CardTitle className="comparison__col comparison__col--label">
              Feature
            </CardTitle>
            <CardTitle className="comparison__col comparison__col--yours">
              {yoursLabel}
            </CardTitle>
            <CardTitle className="comparison__col comparison__col--theirs">
              {theirsLabel}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="comparison__body">
          {rows.map((row) => (
            <div className="comparison__row" key={row.feature}>
              <span className="comparison__feature">{row.feature}</span>
              <span className="comparison__value comparison__value--yours">
                <Check className="comparison__icon comparison__icon--yours" aria-hidden="true" />
                {row.yours}
              </span>
              <span className="comparison__value comparison__value--theirs">
                <X className="comparison__icon comparison__icon--theirs" aria-hidden="true" />
                {row.theirs}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
