// src/components/mdx/component-preview.tsx
import React, { useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  allShowcaseComponents,
  ShowcaseComponent,
} from "contentlayer/generated";
import { Mdx } from "./mdx-components";
import LoaderCircleSpin from "../ui/loader-circle-spin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SquareCodeIcon } from "lucide-react";
import FramerLogo from "../logos/framer";
import TailwindCSS from "../logos/tailwind";
import { cn } from "@/lib/utils";

export interface ComponentPreviewProps {
  path: string;
  category: string;
  usingFramer?: boolean;
  usingCN?: boolean;
}

const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  path,
  category,
  usingFramer,
  usingCN,
}) => {
  // get preview component from showcase/[]/[].tsx
  const Preview = useCallback(() => {
    const DynamicComponent = dynamic(
      () => import(`@/showcase/${category}/${path}`),
      {
        loading: () => <LoaderCircleSpin />,
        ssr: true,
      }
    );
    return <DynamicComponent />;
  }, [path, category]);

  // get codestring from showcase/[]/[].mdx
  const codeString = useMemo(() => {
    const showcaseComponent = allShowcaseComponents.find<ShowcaseComponent>(
      (component): component is ShowcaseComponent =>
        component._raw.flattenedPath === `showcase/${category}/${path}`
    );
    return showcaseComponent ? showcaseComponent.body.code : "Code not found.";
  }, [path, category]);

  return (
    <Tabs className="my-8 bg-[#1f1f1f] rounded-3xl" defaultValue="preview">
      <TabsList className="w-full relative border border-gray-400 dark:border-gray-700 bg-gray-100 dark:bg-gray-100/90">
        {/* Tabs header */}
        <div className="flex items-center w-full justify-between px-2 ">
          {/* code info */}
          <span className="flex items-center gap-3">
            <SquareCodeIcon className="text-indigo-800 dark:text-amber-800" />
            <span className="text-black max-md:hidden font-medium text-sm">
              {category}/{path}.tsx
            </span>
          </span>

          {/* icons container */}
          <div className="flex items-center gap-4 mt-1 *:w-5 *:h-5">
            <TailwindCSS
              className={cn(
                usingCN &&
                  "fill-amber-800  dark:fill-indigo-800 animate-bounce [animation-delay:-0.3s]"
              )}
            />
            <FramerLogo
              className={cn(
                usingFramer &&
                  "fill-amber-800  dark:fill-indigo-800 animate-bounce [animation-delay:-0.13s]"
              )}
            />
          </div>
        </div>
        {/* tabs triggers */}
        <div className="absolute bg-[#1f1f1f] z-10 max-sm:top-0 -bottom-8 left-1/2 -translate-x-1/2 rounded-xl *:rounded-md p-2">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </div>
      </TabsList>
      {/* tabs content preview */}
      <TabsContent
        className="bg-[#1f1f1f] border-b-2 border-gray-500 dark:border-stone-600 rounded-xl min-h-80"
        value="preview"
      >
        <Preview />
      </TabsContent>
      {/* tabs content code */}
      <TabsContent value="code">
        <Mdx source={codeString} />
      </TabsContent>
    </Tabs>
  );
};

export default ComponentPreview;
