"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn, getFormattedDate } from "@/lib/utils";
import { Blogs } from "contentlayer/generated";
import Particles from "./custom/particles";
import { AnimatePresence, motion } from "framer-motion";
import { FadeText } from "./custom/fade-text";

export interface BlogCardProps {
  blog: Blogs;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className="relative block w-full max-w-2xl h-full max-md:border-b border-gray-300 dark:border-gray-700 "
    >
      <AnimatePresence mode="wait">
        {hoveredIndex === index && (
          <motion.span
            className="absolute inset-0 h-full w-full border block rounded-lg
               bg-gray-200/[0.5] dark:bg-stone-800/[0.5] border-gray-300 dark:border-gray-700"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, delay: 0.15, ease: "easeInOut" },
            }}
          />
        )}
      </AnimatePresence>
      <div className="p-4 lg:p-6 relative flex flex-col justify-between h-full">
        <Particles
          className="absolute inset-0 "
          quantity={40}
          ease={20}
          color={"#71717a"}
          refresh
        />
        <div className=" flex flex-col h-full *:w-full  *:py-2 *:rounded-xl">
          <span className="flex max-md:flex-col max-md:gap-3 justify-between">
            <FadeText
             direction="left"
             framerProps={{
               hidden: { opacity: 0 },
               show: {
                 opacity: 1,
                 transition: { duration: 1, delay: 0.3, type: "spring" },
               },
             }}
              text={blog.title}
              className="lg:text-2xl font-semibold uppercase 
              bg-clip-text text-transparent bg-gradient-to-r from-gray-500 dark:from-stone-500 to-stone-950 dark:to-white"
            />
            <p
              className={cn(
                "font-semibold text-indigo-800 dark:text-amber-700 text-xs transition-all duration-300 ease-in-out",
                hoveredIndex === index && "opacity-0"
              )}
            >
              {getFormattedDate(blog.date)}
            </p>
          </span>
          <p className=" mt-3 text-sm font-medium text-stone-400 dark:text-stone-500">
            {blog?.description}
          </p>
        </div>

        <div className="mt-4 space-x-4 relative">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "relative inline-block w-max rounded-xl  pb-2 text-xs font-semibold transition-transform duration-300 ease-in-out",
                hoveredIndex === index &&
                  "bg-[url('/assets/underline.svg')] dark:bg-[url('/assets/underline-dark.svg')]"
              )}
            >
              {"# "}
              {tag}
            </span>
          ))}
          <span
            className={cn(
              "absolute max-md:hidden right-2 bottom-0  gap-2 px-[10px] py-[6px] text-xs rounded-xl bg-transparent transition-all duration-300 ease-in-out",
              hoveredIndex === index &&
                "bg-indigo-600/[0.3] dark:bg-amber-700/[0.3] font-semibold"
            )}
          >
            {blog.readingTime.text}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
