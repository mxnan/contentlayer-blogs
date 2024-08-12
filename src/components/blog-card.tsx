import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFormattedDate } from "@/lib/utils";
import { Blogs } from "contentlayer/generated";

interface BlogCardProps {
  blog: Blogs;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <Link href={blog.url} className="group block">
      <article className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out group-hover:transform group-hover:scale-105">
        <div className="relative aspect-video">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {blog.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {blog.description}
          </p>
          <time
            dateTime={blog.date}
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            {getFormattedDate(blog.date)}
          </time>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
