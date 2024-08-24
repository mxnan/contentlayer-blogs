import ParticlesReveal from "@/components/custom/particles-reveal";
import React from "react";

const ParticlesRevealTextDemo = () => {
  return (
    <div className="w-full h-72 flex items-center justify-center">
      <ParticlesReveal
        width="fit-content"
        className="bg-lightone dark:bg-darkone"
        duration={1.5}
      >
        <h1 className="text-7xl font-semibold text-gray-500">
          Enter text here
        </h1>
      </ParticlesReveal>
    </div>
  );
};

export default ParticlesRevealTextDemo;
