// src\app\(pages)\blogs\page.tsx

import { Mdx } from "@/components/mdx/mdx-components";
import { TableOfContents } from "@/components/mdx/toc";
import { Button } from "@/components/ui/button";
import { getFormattedDate } from "@/lib/utils";
import { allBlogs } from "contentlayer/generated";
import { ArrowBigLeft, CircleArrowLeftIcon, ClockIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

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
  if (!blog) return notFound();
  return {
    title: blog.title,
    description: blog.description,
  };
}
export default function BlogPage({ params }: BlogPageProps) {
  const blogs = allBlogs.find((blogs) => blogs.slug === params.slug);
  if (!blogs) return notFound();
  // redirect to custom not found

  return (
    <section className="flex-1 relative min-h-screen">
      {/* Back button */}
      <div className="w-[100px] hidden xl:block fixed top-44 left-12 2xl:left-32 self-start">
        <Link href="/blogs">
          <Button className="flex items-center gap-2" size={"destructive"} variant={"destructive"}>
            <ArrowBigLeft className="w-5 h-5" />
            Back
          </Button>
        </Link>
      </div>
      {/* Content */}
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto space-y-16 px-4 lg:px-8">
        <Button variant={"destructive"} className="xl:hidden mt-4">
          <Link href="/blogs" className="flex items-center gap-2">
            <CircleArrowLeftIcon className="w-5 h-5" />
            Back
          </Link>
        </Button>
        {/* upper div */}
        <div className="w-full flex flex-col md:flex-row justify-between pb-4">
          {/* text div */}
          <div className="space-y-4 lg:pr-8 md:w-2/3">
            <div className="space-y-6">
              <h1 className="text-7xl xl:text-[6rem] uppercase font-semibold custom-text-gradient ">
                {blogs?.title}
              </h1>
              <p className="text-base lg:text-lg max-lg:font-light">
                {blogs?.description}
              </p>
            </div>

            <div className="flex flex-col text-gray-500  gap-2">
              <div className="flex w-max">
                {blogs.tags &&
                  blogs.tags.map((tag) => (
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
                {getFormattedDate(blogs?.date)}
              </p>
            </div>
          </div>
          {/* image div */}

          <div className="relative hidden md:block md:w-1/3 aspect-video">
            <Image
              src={blogs?.image}
              alt={blogs?.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-xl object-cover"
            />
          </div>
        </div>
        {/* MDX content div */}
        <article className="prose-sm  mx-auto">
          <Mdx source={blogs?.body.code} />
          <div className="flex justify-start pt-12 mb-12 xl:hidden py-4 border-custom border-t">
            <Button variant={"destructive"}>
              <Link href="/blogs" className="flex items-center gap-2">
                <CircleArrowLeftIcon className="w-5 h-5" />
                Back
              </Link>
            </Button>
          </div>
        </article>
      </div>
      {/* Table of contents */}
      <TableOfContents
        className="w-max font-title hidden 2xl:block fixed top-44 right-8 "
        toc={blogs.toc}
      />
    </section>
  );
}
