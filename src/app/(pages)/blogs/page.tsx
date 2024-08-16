import React from "react";
import { allBlogs } from "contentlayer/generated";
import { cn, sortBlogsByDate } from "@/lib/utils";
import BlogCard from "@/components/blog-card";

import DotPattern from "@/components/custom/bg-dot-pattern";

import dynamic from "next/dynamic";
import CustomHeading from "@/components/custom/custom-heading";
import ParticlesReveal from "@/components/custom/paticles-reveal";


const DynamicBlogHero = dynamic(() => import("@/components/blog-hero"), {
  ssr: false,
});

export async function generateMetadata() {
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
          <CustomHeading>Blogs</CustomHeading>
          <ParticlesReveal
            width="fit-content"
            className="bg-stone-200 dark:bg-stone-900"
            duration={1}
          >
            <p className="text-sm ">
              Just some blogs to showcase learnings and findings
            </p>
          </ParticlesReveal>
        </div>

        <div
          className="flex-1 grid grid-cols-1 gap-6 p-4
                      sm:grid-cols-2 
                      md:grid-cols-3
                      lg:grid-cols-2
                      justify-items-center content-start"
        >
          {sortedBlogs.map((blog) => (
            <BlogCard blog={blog} key={blog.slug} />
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
