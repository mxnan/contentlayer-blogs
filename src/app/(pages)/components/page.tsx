import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";
import { TableOfContents } from "@/components/mdx/toc";
import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";

export async function getComponents(slug: string): Promise<Components | undefined> {
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
  return (
    <section className="flex-1 relative min-h-screen">
        <Mdx source={components?.body.code} />
      <TableOfContents
        className="w-max hidden 2xl:block fixed top-44 right-8 "
        toc={components?.toc}
      />
    </section>
  );
}
