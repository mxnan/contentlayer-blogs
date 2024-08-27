import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx/mdx-components";
import type { Metadata } from "next";
import type { Components } from "contentlayer/generated";


async function getComponents(slug: string): Promise<Components | undefined> {
  return allComponents.find((components) => components.slug === slug);
}

export async function generateMetadata(): Promise<Metadata> {
  const components = await getComponents("intro");

  if (!components) {
    return {
      title: "Introduction",
      description: "Component introduction",
    };
  }

  return {
    title: components.title,
    description: components.description,
  };
}

export default async function IntroPage() {
  const components = await getComponents("intro");

  if (!components) {
    return <div>Component not found</div>;
  }

  return (
    <section className="flex-1 relative min-h-screen">
      
       
        
        <Mdx source={components.body.code} />
    
    </section>
  );
}
