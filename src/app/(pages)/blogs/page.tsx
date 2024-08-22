import React from "react";
import { allBlogs } from "contentlayer/generated";
import { cn, sortBlogsByDate } from "@/lib/utils";
import DotPattern from "@/components/custom/bg-dot-pattern";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const DynamicBlogCard = dynamic(() => import("@/components/blog-card"), {
  ssr: false,
});
const DynamicBlogHero = dynamic(() => import("@/components/blog-hero"), {
  ssr: false,
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs",
    description: "Showing some blogs.",
  };
}

export default function BlogsPage() {
  const sortedBlogs = sortBlogsByDate(allBlogs);

  return (
    <section className="w-full max-w-screen-2xl mx-auto min-h-screen flex-1 lg:flex max-lg:space-y-32 py-12">
      <DotPattern
        className={cn(
          " hidden lg:block lg:[mask-image:radial-gradient(900px_circle_at_right,white,transparent)]"
        )}
      />
      {/* BlogCards div */}
      <div className="flex-1 h-max flex flex-col gap-8">
        <div className="space-y-5 lg:ml-12">
          <h1
            className="scroll-m-10 pr-16 uppercase tracking-tight
          text-[3rem] md:text-[4rem] xl:text-[6rem] md:leading-[7rem] 
          drop-shadow-xl font-bold 
          bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white to-lightone dark:to-darkone"
          >
            Blogs
          </h1>

          <p className="text-sm ">
            Just some blogs to showcase learnings and findings
          </p>
        </div>
        <div
          className="flex-1 grid grid-cols-1 gap-6 p-4
                      sm:grid-cols-2 
                      md:grid-cols-3
                      lg:grid-cols-2
                      justify-items-center content-start"
        >
          {sortedBlogs.map((blog) => (
            <DynamicBlogCard blog={blog} key={blog.slug} />
          ))}
        </div>
      </div>
      {/* BlogHero div */}
      <div className="flex-1 ">
        <DynamicBlogHero />
      </div>
    </section>
  );
}
