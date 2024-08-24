import ParticlesReveal from "@/components/custom/particles-reveal"; // update path acc to your setup
import React from "react";

const GridItems = [
  {
    title: "Grid Reveal",
    description: "Reveals grid particles with animation",
    info: ["Enter text here", "Enter text here", "Enter text here"],
  },
  {
    title: "Grid Reveal",
    description: "Reveals grid particles with animation",
    info: ["Enter text here", "Enter text here", "Enter text here"],
  },
  {
    title: "Grid Reveal",
    description: "Reveals grid particles with animation",
    info: ["Enter text here", "Enter text here", "Enter text here"],
  },

];
const ParticlesRevealGridDemo = () => {
  return (
    <div
      className="w-full relative py-16
    flex-1 grid grid-cols-1 gap-6 p-4
                      sm:grid-cols-2 
                      md:grid-cols-2
                      lg:grid-cols-3
                      justify-items-center content-start
    "
    >
      {GridItems.map((item, index) => (
        <ParticlesReveal
          key={index}
          width="fit-content"
          className="bg-lightone dark:bg-darkone"
          duration={1.5}
        >
          <div className="max-w-sm min-h-40 text-white rounded-md border p-3 border-gray-500">
            <h1 className="text-xl font-semibold ">{item.title}</h1>
            <p className=" font-semibold ">{item.description}</p>
            <ul className="text-sm font-semibold ">
              {item.info.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>
        </ParticlesReveal>
      ))}
    </div>
  );
};

export default ParticlesRevealGridDemo;
