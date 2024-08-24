// src\app\(pages)\blogs\page.tsx
import { allBlogs } from "contentlayer/generated";
import { sortBlogsByDate } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Metadata } from "next";
import LoaderCircleSpin from "@/components/ui/loader-circle-spin";

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
    description: "Showing some blogs.",
  };
}

export default async function BlogsPage() {
  const sortedBlogs = sortBlogsByDate(allBlogs);

  return (
    <section className="w-full max-w-4xl mx-auto min-h-screen flex-1 lg:flex max-lg:space-y-32 py-12">
      {/* BlogCards div */}
      <div className="flex-1 h-max flex flex-col gap-8">
        <div className="space-y-5">
          <h1
            className="scroll-m-10 uppercase tracking-tight
          text-[3rem] md:text-[4rem] xl:text-[6rem] md:leading-[7rem] 
          drop-shadow-2xl font-semibold 
          bg-clip-text text-transparent bg-gradient-to-r from-stone-800/80 dark:from-gray-200/80 to-lightone dark:to-darkone/80"
          >
            Blogs
          </h1>

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
