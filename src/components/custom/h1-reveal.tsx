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
    <div className="w-full">
      <ParticlesReveal
        width="fit-content"
        className="bg-lightone dark:bg-darkone"
        duration={1.5}
      >
        <h1
          className={cn(
            "scroll-m-10 pr-16 text-[3rem] md:text-[4rem] xl:text-[6rem] md:leading-[7rem] drop-shadow-xl font-bold  uppercase tracking-tight custom-text-gradient",
            className
          )}
        >
          {children}
        </h1>
      </ParticlesReveal>
    </div>
  );
};

export default H1Reveal;