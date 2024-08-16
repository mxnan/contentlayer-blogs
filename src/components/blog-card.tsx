import React from "react";
import Link from "next/link";
import { getFormattedDate } from "@/lib/utils";
import { Blogs } from "contentlayer/generated";
import { BorderBeam } from "./custom/border-beam";
import Particles from "./custom/particles";

interface BlogCardProps {
  blog: Blogs;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="w-full relative max-w-md  border-stone-200 dark:border-stone-800 border h-auto shadow-xl rounded-lg overflow-hidden">
      <BorderBeam size={200} duration={20} />
      <Particles
        className="absolute inset-0 -z-10"
        quantity={100}
        ease={80}
        color={"#6b7280"}
        refresh
      />
      <Link href={`/blogs/${blog?.slug}`} className="block h-full">
        <div className="p-4 group/card">
          <div className=" flex flex-col h-full *:w-max *:pr-3 *:py-1 *:pl-2 *:rounded-xl">
            <h2 className="text-xl font-bold uppercase ">
              {blog?.title}
            </h2>
            <p className="text-stone-600 dark:text-stone-500 mt-2 text-sm flex-grow line-clamp-3">
              {blog?.description}
            </p>
            <p className="font-semibold text-xs mt-1 ">
              {getFormattedDate(blog?.date)}
            </p>
          </div>

          <div className="mt-3">
            {blog?.tags.map((tag) => (
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
    </div>
  );
};

export default BlogCard;
