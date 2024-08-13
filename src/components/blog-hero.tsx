"use client";
import React, { useEffect, useState } from "react";

import IconCloud from "./ui/icon-cloud";


const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export default function BlogHero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="max-w-2xl w-full mx-auto ">
      <div className="p-2 max-lg:pb-16 
       h-full lg:h-[80vh]
        flex-1 flex-col flex items-center gap-10">
        <div className="space-y-6 text-center pb-3 border-gray-200 dark:border-gray-800  border-b">
          <p>Manan Negi</p>
          <h1 className="text-3xl">Self taught Web dev. </h1>
          <p>Learnt C in school</p>
        </div>
        <div className="px-24 text-center">
          <h1 className="text-2xl">Tech Stack</h1>
          {isMounted && <IconCloud iconSlugs={slugs} />}
        </div>
      </div>
    </div>
  );
}