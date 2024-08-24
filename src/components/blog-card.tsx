"use client";
import React, { useState } from "react";
import Link from "next/link";
import { getFormattedDate } from "@/lib/utils";
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
        className="relative block w-full max-w-lg h-full "
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
            color={"#6b7280"}
            refresh
          />
          <div className=" flex flex-col h-full *:w-full  *:py-1 *:rounded-xl">
            <h2 className="lg:text-xl font-bold uppercase ">{blog.title}</h2>
            <p className="text-stone-600 dark:text-stone-500 mt-2 text-sm ">
              {blog?.description}
            </p>
            <p className="font-semibold text-xs mt-1 ">
              {getFormattedDate(blog.date)}
            </p>
          </div>

          <div className="mt-3">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="relative inline-block w-max rounded-2xl px-2 py-1  text-xs font-semibold 
                hover:bg-stone-200 dark:hover:bg-stone-800
                "
              >
                {"# "}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
   
  );
};

export default BlogCard;
