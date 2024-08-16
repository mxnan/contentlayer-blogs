import React from "react";
import { notFound } from "next/navigation";
import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";

import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";
import { getFormattedDate } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import { TableOfContents } from "@/components/mdx/toc";
import ParticlesReveal from "@/components/custom/paticles-reveal";
import CustomHeading from "@/components/custom/custom-heading";


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
      <div className="w-full flex-between border-b dark:border-gray-700 pb-4 ">
        <CustomHeading>{component?.title}</CustomHeading>
        <ParticlesReveal
          className="bg-stone-200 dark:bg-stone-900"
          duration={1}
        >
          <p className="flex items-center whitespace-nowrap gap-2">
            {getFormattedDate(component?.date)}{" "}
            <ClockIcon className="w-10 h-10 " />{" "}
          </p>
        </ParticlesReveal>
      </div>
      <article className="prose-sm">
        <Mdx source={component?.body.code} />
      </article>
      <TableOfContents
        className="w-max font-title hidden 2xl:block fixed top-44 right-8 "
        toc={component?.toc}
      />
    </section>
  );
}
