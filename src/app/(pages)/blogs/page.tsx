import React from "react";
import { allBlogs } from "contentlayer/generated";
import { sortBlogsByDate } from "@/lib/utils";
import BlogCard from "@/components/blog-card";

export default function BlogsPage() {
  const sortedBlogs = sortBlogsByDate(allBlogs);

  return (
    <section className="w-full flex-1 min-h-screen py-12">
      <h1 className="text-5xl font-bold text-center mb-12">Blogs</h1>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedBlogs.map((blog) => (
          <BlogCard blog={blog} key={blog.slug} />
        ))}
      </div>
    </section>
  );
}
