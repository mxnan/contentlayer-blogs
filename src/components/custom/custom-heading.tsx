import { cn } from "@/lib/utils";
import React from "react";
import ParticlesReveal from "./paticles-reveal";


const CustomHeading = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full ">
      <ParticlesReveal width="fit-content" className="bg-stone-200 dark:bg-stone-900" duration={1}>
        <h1
          className={cn(
            "scroll-m-20 pr-16 text-[3rem] md:text-[4rem] xl:text-[6rem] leading-[7rem] drop-shadow-xl font-bold  uppercase tracking-tight",
            className
          )}
        >
          {children}
        </h1>
      </ParticlesReveal>
    </div>
  );
};

export default CustomHeading;
