"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// ─── Reusable animation variants ───────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const staggerContainerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Scroll-triggered section wrapper ──────────────────────────────────────
export function FadeUpSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger children in view ───────────────────────────────────────────────
export function StaggerSection({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Stagger child item ─────────────────────────────────────────────────────
export function StaggerItem({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated counter ───────────────────────────────────────────────────────
export function AnimatedNumber({ value, suffix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {value}{suffix}
    </motion.span>
  );
}

// ─── Hover card wrapper ─────────────────────────────────────────────────────
export function HoverCard({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(8,127,104,0.10)" }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Pulse dot ─────────────────────────────────────────────────────────────
export function PulseDot({ color = "bg-emerald-500", size = "w-2.5 h-2.5" }) {
  return (
    <span className="relative flex items-center justify-center">
      <motion.span
        className={`absolute rounded-full ${color} opacity-60`}
        style={{ width: "100%", height: "100%" }}
        animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className={`relative rounded-full ${color} ${size}`} />
    </span>
  );
}

// ─── Floating badge animation ───────────────────────────────────────────────
export function FloatingBadge({ children, className = "" }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Page entrance wrapper ──────────────────────────────────────────────────
export function PageEntrance({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Shimmer skeleton ───────────────────────────────────────────────────────
export function ShimmerBox({ className = "h-8 w-full" }) {
  return (
    <motion.div
      className={`rounded-xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 ${className}`}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      style={{ backgroundSize: "200% 100%" }}
    />
  );
}
