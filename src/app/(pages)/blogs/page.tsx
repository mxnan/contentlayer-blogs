import React from "react";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";

export default function page() {
  return (
    <section className="w-full flex-1 min-h-screen ">
      <h1 className="text-5xl font-bold text-center">Blogs Page</h1>
      <div className="max-w-5xl mx-auto p-4 grid grid-cols-3">
        {allBlogs.map((blog) => (
          <Link href={blog.url} key={blog._id}>
            <div className="p-2">
              <h2 className="text-2xl font-bold">{blog.title}</h2>
              <p className="text-lg font-bold">{blog.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
