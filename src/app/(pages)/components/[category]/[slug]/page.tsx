import React from "react";
import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";
import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";
import { TableOfContents } from "@/components/mdx/toc";

export interface ComponentPageProps {
  params: { category: string; slug: string };
}

export async function getComponents(
  category: string,
  slug: string
): Promise<Components | undefined> {
  return allComponents.find(
    (components) =>
      components.category === category &&
      components.slug === `${category}/${slug}`
  );
}

export async function generateStaticParams(): Promise<
  { category: string; slug: string }[]
> {
  return allComponents.map((components) => ({
    category: components.category,
    slug: components.slug.split("/").pop() ?? "",
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
  return (
    <section className="flex-1 relative min-h-screen">
      <Mdx source={component?.body.code} />

      <TableOfContents
        className="w-max font-title hidden 2xl:block fixed top-44 right-8 "
        toc={component?.toc}
      />
    </section>
  );
}
