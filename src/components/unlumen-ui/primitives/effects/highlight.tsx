"use client";

// NOTE: this file was not part of the component snippet that was pasted in —
// `motion-navigation-menu.tsx` imports it from "unlumen-ui", a separate
// component library whose source isn't available here. This is a from-scratch
// reimplementation matching the API the nav menu expects (Highlight as a
// hover-tracking container, HighlightItem as a registered child), so the
// sliding highlight-behind-the-hovered-item effect actually works.

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { motion, type Transition } from "framer-motion";

import { cn } from "@/lib/utils";

type HighlightContextValue = {
  hover: boolean;
  setHoveredId: React.Dispatch<React.SetStateAction<string | null>>;
  registerItem: (id: string, el: HTMLElement | null) => void;
};

const HighlightContext = React.createContext<HighlightContextValue | null>(
  null,
);

let uid = 0;
function useStableId(id?: string) {
  const ref = React.useRef(id ?? `highlight-item-${(uid += 1)}`);
  return id ?? ref.current;
}

type HighlightProps = Omit<React.ComponentPropsWithRef<"div">, "children"> & {
  mode?: "parent" | "children";
  hover?: boolean;
  controlledItems?: boolean;
  containerClassName?: string;
  transition?: Transition;
  children: React.ReactNode;
};

function Highlight({
  mode = "parent",
  hover = false,
  // Accepted for API compatibility with the pasted component; this
  // reimplementation always re-measures items on hover rather than requiring
  // a pre-registered, fixed item list.
  controlledItems: _controlledItems,
  className,
  containerClassName,
  style,
  transition,
  children,
  ...props
}: HighlightProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemsRef = React.useRef(new Map<string, HTMLElement>());
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [bounds, setBounds] = React.useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const registerItem = React.useCallback((id: string, el: HTMLElement | null) => {
    if (el) itemsRef.current.set(id, el);
    else itemsRef.current.delete(id);
  }, []);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    const el = hoveredId ? itemsRef.current.get(hoveredId) : null;

    if (!container || !el) {
      setBounds(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setBounds({
      top: elRect.top - containerRect.top,
      left: elRect.left - containerRect.left,
      width: elRect.width,
      height: elRect.height,
    });
  }, [hoveredId]);

  const contextValue = React.useMemo(
    () => ({ hover, setHoveredId, registerItem }),
    [hover, registerItem],
  );

  return (
    <HighlightContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn("relative", containerClassName)}
        {...props}
      >
        {mode === "parent" && (
          <motion.div
            aria-hidden="true"
            className={cn("absolute", className)}
            style={style}
            initial={false}
            animate={{
              opacity: bounds ? 1 : 0,
              top: bounds?.top ?? 0,
              left: bounds?.left ?? 0,
              width: bounds?.width ?? 0,
              height: bounds?.height ?? 0,
            }}
            transition={
              transition ?? { type: "spring", stiffness: 350, damping: 32, bounce: 0 }
            }
          />
        )}
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

type HighlightItemProps = React.ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
  id?: string;
};

function HighlightItem({
  asChild,
  id,
  onPointerEnter,
  onPointerLeave,
  ...props
}: HighlightItemProps) {
  const context = React.useContext(HighlightContext);
  const itemId = useStableId(id);
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      ref={(el: HTMLElement | null) => context?.registerItem(itemId, el)}
      onPointerEnter={(event: React.PointerEvent<HTMLElement>) => {
        onPointerEnter?.(event);
        if (context?.hover) context.setHoveredId(itemId);
      }}
      onPointerLeave={(event: React.PointerEvent<HTMLElement>) => {
        onPointerLeave?.(event);
        if (context?.hover) {
          context.setHoveredId((current) => (current === itemId ? null : current));
        }
      }}
    />
  );
}

export { Highlight, HighlightItem };
