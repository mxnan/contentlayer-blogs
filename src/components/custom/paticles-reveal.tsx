"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import Particles from "./particles";


interface ParticlesRevealProps {
  children: JSX.Element;
  width?: "fit-content" | "100%";
  className?: string;
  duration?: number;
}

export const ParticlesReveal = ({
  children,
  width,
  className,
  duration,
}: ParticlesRevealProps) => {
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      slideControls.start("visible");
      mainControls.start("visible");
    } else {
      slideControls.start("hidden");
      mainControls.start("hidden");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -100 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ? duration : 0.7, delay: 0.25 }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: { top: 0 },
          visible: { top: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        className={cn("rounded-xl", className)}
        transition={{
          duration: duration ? duration : 0.5,
          ease: "easeIn",
          type: "tween",
        }}
        style={{
          position: "absolute",
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
        }}
      >
        {" "}
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={"#6b7280"}
          refresh
        />
      </motion.div>
    </div>
  );
};

export default ParticlesReveal;
