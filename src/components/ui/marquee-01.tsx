import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee-01-utils/marquee";

const reviews = [
  {
    name: "Elena Rossi",
    username: "@elena.rossi",
    initials: "ER",
    body: "“Sala da Pranzo lasted through an entire dinner party and half the next morning. I've never had an oil hold this close to the skin.”",
  },
  {
    name: "Julien Foret",
    username: "@julienf",
    initials: "JF",
    body: "“Bought La Biblioteca as a gift and my father wore it for a week straight. Ink and smoke, exactly as promised — he won't use anything else now.”",
  },
  {
    name: "Sofia Marchetti",
    username: "@sofia.m",
    initials: "SM",
    body: "The Vandelle bundle is genuinely worth it — the rollon lives in my bag and the full bottle stays on my dresser. Both get used constantly.",
  },
  {
    name: "Amara Whitfield",
    username: "@amarawhitfield",
    initials: "AW",
    body: "“Cruelty-free and it still smells this rich? I was skeptical until I tried La Serra. Linen and marble, cool and quiet, wears beautifully in summer.”",
  },
  {
    name: "Noor Al-Sayed",
    username: "@noor.alsayed",
    initials: "NA",
    body: "“Every part of the unboxing feels considered, down to the little card with the villa story. It's a gift before you've even worn it.”",
  },
  {
    name: "Diego Fontán",
    username: "@diegofontan",
    initials: "DF",
    body: "Ordered twice now and both times the batch number matched the pour date on the card. Small details, but they add up to real trust.",
  },
  {
    name: "Claire Dubois",
    username: "@claire.dubois",
    initials: "CD",
    body: "“Three bottles in and I still notice something new each time — a little more leather, a little more wine. This is the one I keep returning to.”",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  initials,
  name,
  username,
  body,
}: {
  initials: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className="border-border bg-card relative h-full w-64 cursor-pointer overflow-hidden p-4 shadow-none">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="flex flex-row items-center gap-2">
          <span
            className="bg-maroon text-gold flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
            style={{ fontFamily: "var(--serif)" }}
            aria-hidden="true"
          >
            {initials}
          </span>
          <div className="flex flex-col">
            <p className="text-foreground text-sm font-medium">{name}</p>
            <p className="text-muted-foreground text-xs font-medium">
              {username}
            </p>
          </div>
        </div>
        <p className="text-foreground line-clamp-2 text-sm">{body}</p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  );
}
