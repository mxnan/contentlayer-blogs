// src/components/mdx/component-preview.tsx

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { allShowcaseComponents } from "contentlayer/generated";
import { Mdx } from "./mdx-components";
import LoaderCircleSpin from "../ui/loader-circle-spin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SquareCheck, SquareCodeIcon, SquareX } from "lucide-react";
import FramerLogo from "../logos/framer";
import TailwindCSS from "../logos/tailwind";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ComponentPreviewProps {
  path: string;
  category: string;
  usingFramer?: boolean;
  usingCN?: boolean;
}

export function ComponentPreview({
  path,
  category,
  usingFramer,
  usingCN,
}: ComponentPreviewProps) {
  // get preview component from showcase/[]/[].tsx
  const Preview = useMemo(() => {
    const DynamicComponent = dynamic(
      () => import(`@/showcase/${category}/${path}`),
      {
        loading: () => <LoaderCircleSpin />,
        ssr: false,
      }
    );
    return <DynamicComponent />;
  }, [path, category]);

  // get codestring from showcase/[]/[].mdx
  const codeString = useMemo(() => {
    const showcaseComponent = allShowcaseComponents.find(
      (component) =>
        component._raw.flattenedPath === `showcase/${category}/${path}`
    );

    return showcaseComponent ? showcaseComponent.body.code : "Code not found.";
  }, [path, category]);

  return (
    <div className="w-full flex-1 relative">
      <Tabs className="mt-16 bg-[#1f1f1f] rounded-3xl" defaultValue="preview">
        <TabsList className="w-full relative bg-gray-200 dark:bg-gray-800  ">
          {/* Tabs header */}
          <div className="flex items-center w-full justify-between px-2  ">
            {/* code info */}
            <span className="flex items-center gap-3">
              <SquareCodeIcon className="text-orange-700 dark:text-green-500" />
              <span className="text-black dark:text-white max-md:hidden">
                {category}/{path}.tsx
              </span>
            </span>

            {/* icons with tooltip  */}
            <div className="flex items-center gap-4 ">
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <TailwindCSS className="fill-orange-700 dark:fill-green-500" />
                  </TooltipTrigger>
                  <TooltipContent className="flex text-gray-500 dark:text-gray-500 text-sm items-center gap-3">
                    using CN ?
                    {usingCN === true ? (
                      <SquareCheck className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <SquareX className="w-4 h-4 text-red-500" />
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>{" "}
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger>
                    <FramerLogo className="fill-orange-700 dark:fill-green-500" />
                  </TooltipTrigger>
                  <TooltipContent className="flex text-gray-500 dark:text-gray-500 text-sm items-center gap-3">
                    using framer ?{" "}
                    {usingFramer === true ? (
                      <SquareCheck className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <SquareX className="w-4 h-4 text-red-500" />
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          {/* tabs triggers */}
          <div className="absolute bg-[#1f1f1f] z-10 -bottom-8 left-1/2 -translate-x-1/2 rounded-xl *:rounded-md  p-2">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </div>
        </TabsList>
        {/* tabs content preview */}
        <TabsContent
          className="bg-[#1f1f1f] border-b border-gray-400 dark:border-gray-600 rounded-xl"
          value="preview"
        >
          <div className="flex-center min-h-80">{Preview}</div>
        </TabsContent>
        {/* tabs content code */}
        <TabsContent value="code">
          <article className="prose-sm ">
            <Mdx source={codeString} />
          </article>
        </TabsContent>
      </Tabs>
    </div>
  );
}
