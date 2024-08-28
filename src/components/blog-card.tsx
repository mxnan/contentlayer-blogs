"use client";
import React, { useState } from "react";
import Link from "next/link";
import { cn, getFormattedDate } from "@/lib/utils";
import { Blogs } from "contentlayer/generated";
import Particles from "./custom/particles";
import { AnimatePresence, motion } from "framer-motion";

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
      className="relative block w-full max-w-lg h-full max-md:border-b border-gray-300 dark:border-gray-700 "
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
      <div className="p-4 lg:p-6 relative ">
        <Particles
          className="absolute inset-0 "
          quantity={40}
          ease={20}
          color={"#71717a"}
          refresh
        />
        <div className=" flex flex-col h-full *:w-full  *:py-2 *:rounded-xl">
          <h2 className="lg:text-xl font-bold uppercase ">{blog.title}</h2>
          <p className="text-stone-600 dark:text-stone-500 mt-1 text-sm ">
            {blog?.description}
          </p>
          <p className="font-semibold text-xs mt-1 ">
            {getFormattedDate(blog.date)}
          </p>
        </div>

        <div className="mt-4 space-x-2 relative">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className={cn(
                "relative inline-block w-max rounded-xl px-[10px] py-[6px] text-xs font-semibold transition-colors duration-500 ease-in-out",
                hoveredIndex === index
                  ? "bg-gray-200 dark:bg-stone-800"
                  : "bg-transparent"
              )}
            >
              {"# "}
              {tag}
            </span>
          ))}
          <span
            className={cn(
              "absolute max-md:hidden right-2 bottom-0  gap-2 px-[10px] py-[6px] text-xs rounded-xl transition-colors duration-500 ease-in-out",
              hoveredIndex === index
                ? "bg-gray-200 dark:bg-stone-800"
                : "bg-transparent"
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
