import ParticlesReveal from "@/components/custom/particles-reveal"; // update path acc to your setup
import React from "react";

const GridItems = [
  {
    title: "Grid Reveal",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ultrices quis nostra facilisis sodales, class maximus pretium porttitor.",
    info: [" text ", " text ", " text "],
  },
  {
    title: "Grid Reveal",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ultrices quis nostra facilisis sodales, class maximus pretium porttitor.",
    info: [" text ", " text ", " text "],
  },
  {
    title: "Grid Reveal",
    description:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Ultrices quis nostra facilisis sodales, class maximus pretium porttitor.",
    info: [" text ", " text ", " text "],
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
          className="bg-stone-800"
          duration={1.5}
        >
          <div className="max-w-sm  text-white rounded-md border p-3 border-gray-500">
            <h1 className="text-xl font-semibold mb-3">{item.title}</h1>
            <p className=" font-semibold text-sm mb-2">{item.description}</p>
            <ul className="text-xs font-semibold flex gap-3 ">
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
