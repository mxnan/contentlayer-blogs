import { cn } from "@/lib/utils";
import React from "react";
import ParticlesReveal from "./particles-reveal";

const H1Reveal = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    
      <ParticlesReveal
        width="fit-content"
        className="bg-lightone dark:bg-darkone"
        duration={1.5}
      >
        <h1
          className={cn(
            "pr-16 text-[3rem] md:text-[4rem] xl:text-[6rem]  drop-shadow-xl font-bold  uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white to-lightone dark:to-darkone",
            className
          )}
        >
          {children}
        </h1>
      </ParticlesReveal>
 
  );
};

export default H1Reveal;
