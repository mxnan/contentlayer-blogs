// src\app\(pages)\blogs\page.tsx
import { Mdx } from "@/components/mdx/mdx-components";
import { Button } from "@/components/ui/button";
import { getFormattedDate } from "@/lib/utils";

import { allBlogs } from "contentlayer/generated";
import { CircleArrowLeft, ClockIcon } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";

import Link from "next/link";

const DynamicTableOfContents = dynamic(
  () => import("@/components/mdx/toc").then((mod) => mod.TableOfContents),
  {
    ssr: false,
  }
);
const DynamicBlogPageDetails = dynamic(
  () => import("@/components/blog-page-details"),
  {
    ssr: false,
  }
);

export interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams(): Promise<
  BlogPageProps["params"][]
> {
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = allBlogs.find((blog) => blog.slug === params.slug);
  return {
    title: blog?.title,
    description: blog?.description,
  };
}
export default async function BlogPage({ params }: BlogPageProps) {
  const blogs = allBlogs.find((blogs) => blogs.slug === params.slug);

  return (
    <section className="flex-1 relative min-h-screen">
      {/* Back button */}
      <Link
        href="/blogs"
        className="w-[100px] hidden xl:block fixed top-44 left-12 2xl:left-32 self-start"
      >
        <Button
          className="flex items-center gap-2"
          size={"destructive"}
          variant={"destructive"}
        >
          <CircleArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>

      {/* Content */}
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto space-y-16">
        <Button variant={"destructive"} className="xl:hidden mt-4">
          <Link href="/blogs" className="flex items-center gap-2">
            <CircleArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div className="w-full md:hidden flex flex-col gap-4">
          <h1 className="text-5xl font-bold capitalize text-gray-700">
            {blogs?.title}
          </h1>
          <p className=" text-gray-600 dark:text-gray-400">
            {blogs?.description}
          </p>
          <div className="flex text-xs items-center gap-3">
            <p className="flex gap-3">
              <ClockIcon className="w-4 h-4" />
              {getFormattedDate(blogs?.date || "")}
            </p>{" "}
            <span className="pl-3 border-l-4 border-gray-500 ">
              {blogs?.readingTime?.text}
            </span>
          </div>
        </div>
        {/* custom image and  wobble card hidden under md */}
        {blogs && <DynamicBlogPageDetails blogs={blogs} />}
        {/* MDX content div */}
        <div>
          <Mdx source={blogs?.body.code} />

          <Link
            href="/blogs"
            className="flex justify-start pt-12 mb-12 xl:hidden py-4 border-gray-500 border-t"
          >
            <Button className="flex items-center gap-2" variant={"destructive"}>
              <CircleArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>
      </div>
      {/* Table of contents */}
      <DynamicTableOfContents
        className="w-max hidden 2xl:block fixed top-44 right-8 "
        toc={blogs?.toc}
      />
    </section>
  );
}
