import React from "react";
import Link from "next/link";
import { getFormattedDate } from "@/lib/utils";
import { Blogs } from "contentlayer/generated";
import { BorderBeam } from "./custom/border-beam";

interface BlogCardProps {
  blog: Blogs;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="w-full relative max-w-md  border-stone-200 dark:border-stone-800 border h-auto shadow-xl rounded-lg overflow-hidden">
    <BorderBeam size={200} duration={20}  />
    <Link href={`/blogs/${blog?.slug}`} className="block h-full group/card ">
      <div className="p-4 flex flex-col h-full">
        <h2 className="text-xl font-bold  mb-2 line-clamp-2">{blog?.title}</h2>
        <p className="text-stone-600 dark:text-stone-500 text-sm my-3 flex-grow line-clamp-3">
          {blog?.description}
        </p>

        <p className="font-semibold text-xs mb-2 group-hover/card:translate-x-2  transition-all ease-in-out duration-300">
          {getFormattedDate(blog?.date)}
        </p>

        <div className="mt-auto group-hover/card:translate-y-1 transition-all ease-in-out duration-300">
          {blog?.tags.map((tag) => (
            <span
              key={tag}
              className="relative inline-block w-max rounded-2xl px-2 py-1 m-1 text-xs font-semibold
              transition-all ease-in-out duration-500 group-hover/card:scale-105
                text-plight dark:text-pdark 
                group-hover/card:bg-gray-500/10 group-hover/card:dark:bg-stone-800
             "
            >
              <BorderBeam  size={30} borderWidth={1} />
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
