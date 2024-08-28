// src\app\(pages)\blogs\page.tsx
import { allBlogs } from "contentlayer/generated";
import { sortBlogsByDate } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import LoaderCircleSpin from "@/components/ui/loader-circle-spin";
import { FadeText } from "@/components/custom/fade-text";

const DynamicBlogCard = dynamic(() => import("@/components/blog-card"), {
  ssr: false,
  loading: () => (
    <div className="w-full relative h-52 flex items-center justify-center ">
      <LoaderCircleSpin />
    </div>
  ),
});
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs",
    description: "Writing some blogs to showcase my learning and findings",
    alternates: {
      canonical: `https://mxnan.com/blogs`,
    },
  };
}

export default async function BlogsPage() {
  const sortedBlogs = sortBlogsByDate(allBlogs);

  return (
    <section
      className="w-full relative max-w-4xl mx-auto flex-1 lg:flex max-lg:space-y-32 
    py-12 md:border-b border-gray-300 dark:border-gray-700"
    >
      {/* BlogCards div */}
      <div className="flex-1 h-max flex flex-col gap-8 ">
        <div className="space-y-5 flex flex-col max-md:items-center">
          <FadeText
            text="Blogs"
            direction="left"
            framerProps={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 1, delay: 0.3, type: "spring" },
              },
            }}
            className="scroll-m-10 uppercase tracking-tight
          text-[5rem]  xl:text-[6rem] md:leading-[7rem] 
          drop-shadow-2xl font-semibold 
          bg-clip-text text-transparent bg-gradient-to-r from-gray-500 dark:from-stone-500 to-stone-950 dark:to-white"
          />
         
          <p className="text-sm ">
            Just some blogs to showcase learnings and findings
          </p>
        </div>
        <div
          className="flex-1 grid grid-cols-1 p-4 md:border-x 
                    border-gray-300 dark:border-gray-700
                      md:grid-cols-2
                      lg:grid-cols-2
                      justify-items-center content-center"
        >
          {sortedBlogs.map((blog, index) => (
            <DynamicBlogCard blog={blog} key={blog.slug} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
