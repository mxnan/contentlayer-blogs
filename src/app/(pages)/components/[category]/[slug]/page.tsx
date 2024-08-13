import React from "react";
import { notFound } from "next/navigation";
import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";
import { TableOfContents } from "@/components/mdx/toc";
import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";
import { getFormattedDate } from "@/lib/utils";
import { ClockIcon } from "lucide-react";

interface ComponentPageProps {
  params: { category: string; slug: string };
}

async function getComponents(
  category: string,
  slug: string
): Promise<Components | undefined> {
  return allComponents.find(
    (components) =>
      components.category === category &&
      components.slug === `${category}/${slug}`
  );
}

export async function generateStaticParams() {
  return allComponents.map((components) => ({
    category: components.category,
    slug: components.slug.split("/").pop(),
  }));
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const components = await getComponents(params.category, params.slug);

  if (!components) {
    return {};
  }

  return {
    title: components.title,
    description: components.description,
  };
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const component = await getComponents(params.category, params.slug);

  if (!component) {
    notFound();
  }

  return (
    <section className="flex-1 relative min-h-screen">
      <div className="w-full flex flex-col md:flex-row justify-between border-b dark:border-gray-700 pb-4 group/upper">
        <div
          className="space-y-6 lg:pr-8 md:w-2/3 
          group-hover/upper:translate-x-2 cursor-default
          transition-transform ease-in-out duration-500
          "
        >
          <h1 className="text-7xl xl:text-[6rem] uppercase font-semibold">
            {component?.title}
          </h1>
          <p className="text-base lg:text-lg max-lg:font-light">
            {component?.description}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center text-gray-500  gap-2">
          <p
            className="font-medium w-max text-xs flex items-center gap-2
            group-hover/upper:-translate-x-2 group-hover/upper:translate-y-2
            group-hover/upper:animate-pulse
          transition-all ease-in-out duration-700
              "
          >
            <ClockIcon className="w-4 h-4 text-black dark:text-white" />{" "}
            {/*  {getFormattedDate(component?.date)} */}
          </p>
        </div>
      </div>
      <article className="prose-sm  mx-auto py-8">
        <Mdx source={component.body.code} />
      </article>

      <TableOfContents
        className="w-max text-gray-500 hidden 2xl:block fixed top-44 right-4 2xl:right-20"
        toc={component.toc}
      />
    </section>
  );
}
