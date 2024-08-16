import React from "react";
import { notFound } from "next/navigation";
import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";
import { TableOfContents } from "@/components/mdx/toc";
import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";
import CustomHeading from "@/components/custom/custom-heading";


async function getComponents(slug: string): Promise<Components | undefined> {
  return allComponents.find((components) => components.slug === slug);
}

export async function generateMetadata(): Promise<Metadata> {
  const components = await getComponents("intro");

  if (!components) {
    return {};
  }

  return {
    title: components.title,
    description: components.description,
  };
}

export default async function IntroPage() {
  const components = await getComponents("intro");

  if (!components) {
    notFound();
  }

  return (
    <section className="flex-1 relative min-h-screen">
      <CustomHeading>{components?.title}</CustomHeading>
      <article className="prose-sm ">
        <Mdx source={components?.body.code} />
      </article>
      <TableOfContents
        className="w-max font-title hidden 2xl:block fixed top-44 right-8 "
        toc={components?.toc}
      />
    </section>
  );
}
