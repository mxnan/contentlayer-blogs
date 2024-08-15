// src/components/mdx/component-preview.tsx

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { allShowcaseComponents } from "contentlayer/generated";
import { Mdx } from "./mdx-components";
import LoaderCircleSpin from "../ui/loader-circle-spin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ComponentPreviewProps {
  path: string;
  category: string;
}

export function ComponentPreview({ path, category }: ComponentPreviewProps) {
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
      <Tabs className="mt-16" defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="flex-center h-96">{Preview}</div>
        </TabsContent>
        <TabsContent value="code">
          <article className="prose-sm overflow-y-auto">
            <Mdx source={codeString} />
          </article>
        </TabsContent>
      </Tabs>
    </div>
  );
}
