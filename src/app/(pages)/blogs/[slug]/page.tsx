// src\app\(pages)\blogs\page.tsx
import { Mdx } from "@/components/mdx/mdx-components";
import { Button } from "@/components/ui/button";
import LoaderCircleSpin from "@/components/ui/loader-circle-spin";
import { getFormattedDate } from "@/lib/utils";
import { allBlogs } from "contentlayer/generated";
import { ArrowDownLeft, CircleArrowLeft, ClockIcon } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import ProgressBar from "@/components/custom/progress-bar";
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
    loading: () => (
      <div className="w-full h-80 flex items-center justify-center">
        <LoaderCircleSpin />{" "}
      </div>
    ),
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
      <ProgressBar />
      {/* Back button */}
      <Link
        href="/blogs"
        className="w-[100px] hidden xl:block fixed top-44 max-2xl:left-[calc(50%-40rem)] 2xl:left-[calc(50%-50rem)]"
      >
        <Button
          className="flex items-center gap-2 text-lg font-bold group/button"
          variant={"secondary"}
        >
          <ArrowDownLeft className="w-5 h-5 stroke-[3px] group-hover/button:rotate-[30deg] transition-transform ease-in-out duration-500" />
          Back
        </Button>
      </Link>

      {/* Content */}
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto space-y-16">
        <Link href="/blogs" className="xl:hidden mt-4">
          <Button
            className="flex items-center gap-2 text-lg font-bold group/button"
            variant={"secondary"}
          >
            <ArrowDownLeft className="w-5 h-5 stroke-[3px] group-hover/button:rotate-[30deg] transition-transform ease-in-out duration-500" />
            Back
          </Button>
        </Link>

        {/* blog page details for smaller screens */}
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
        <div>
          {/* custom image and  wobble card above md screens */}
          {blogs && <DynamicBlogPageDetails blogs={blogs} />}
          {/* MDX content  */}

          <Mdx source={blogs?.body.code} />
        </div>
      </div>
      {/* Table of contents */}
      <DynamicTableOfContents
        className="w-max hidden 2xl:block fixed top-44 right-[calc(50%-45rem)]  "
        toc={blogs?.toc}
      />
    </section>
  );
}
