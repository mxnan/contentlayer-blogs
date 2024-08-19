import ParticlesReveal from "@/components/custom/particles-reveal";
import { cn } from "@/lib/utils";
import React from "react";

const H1revealDemo = ({ className }: { className?: string }) => {
  return (
    <div className="w-full flex-center">
      <ParticlesReveal
        width="fit-content"
        className="bg-lightone dark:bg-darkone"
        duration={1.5}
      >
        <h1
          className={cn(
            "scroll-m-10 pr-16 text-[3rem] md:text-[4rem] xl:text-[6rem] md:leading-[7rem] drop-shadow-xl font-bold  uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-t from-red-300 dark:from-pink-300 to-lightone dark:to-darkone",
            className
          )}
        >
          enter text here
        </h1>
      </ParticlesReveal>
    </div>
  );
};

export default H1revealDemo;
