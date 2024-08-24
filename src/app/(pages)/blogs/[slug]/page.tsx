// src\app\(pages)\blogs\page.tsx
import { Mdx } from "@/components/mdx/mdx-components";
import { Button } from "@/components/ui/button";
import LoaderCircleSpin from "@/components/ui/loader-circle-spin";
import { getFormattedDate } from "@/lib/utils";
import { allBlogs } from "contentlayer/generated";
import { CircleArrowLeft, ClockIcon } from "lucide-react";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const DynamicTableOfContents = dynamic(
  () => import("@/components/mdx/toc").then((mod) => mod.TableOfContents),
  {
    ssr: false,
    loading: () => <LoaderCircleSpin />,
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
        {/* upper div */}
        <div className="w-full flex flex-col md:flex-row justify-between pb-4">
          {/* text div */}
          <div className="space-y-4 lg:pr-8 md:w-2/3">
            <div className="space-y-6">
              <h1
                className="text-7xl xl:text-[6rem] uppercase font-semibold 
              bg-clip-text text-transparent bg-gradient-to-r from-black dark:from-white to-lightone dark:to-darkone
              "
              >
                {blogs?.title}
              </h1>
              <p className="text-base lg:text-lg ">{blogs?.description}</p>
            </div>

            <div className="flex flex-col text-gray-500  gap-2">
              <div className="flex w-max">
                {blogs?.tags &&
                  blogs?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm p-2 text-black dark:text-white font-bold text-muted-foreground"
                    >
                      [{" "}
                      <span className="text-gray-500 font-semibold ">
                        {tag}
                      </span>{" "}
                      ]
                    </span>
                  ))}
              </div>
              <p className="font-medium w-max text-xs flex items-center gap-2 ml-2">
                <ClockIcon className="w-4 h-4 text-black dark:text-white" />{" "}
                {getFormattedDate(blogs?.date || "")}
              </p>
            </div>
          </div>
          {/* image div */}
          <div className="relative hidden md:block md:w-1/3 aspect-video">
            <Image
              src={blogs?.image || ""}
              alt={blogs?.title || ""}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-xl object-cover"
            />
          </div>
        </div>
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
