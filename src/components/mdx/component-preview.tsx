// src/components/mdx/component-preview.tsx

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { allShowcaseComponents } from "contentlayer/generated";
import { Mdx } from "./mdx-components";
import TabsWithContent from "../ui/tabs-with-content";

interface ComponentPreviewProps {
  path: string;
  category: string;
}

export function ComponentPreview({ path, category }: ComponentPreviewProps) {
  const Preview = useMemo(() => {
    const DynamicComponent = dynamic(
      () => import(`@/showcase/${category}/${path}`),
      {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }
    );
    return <DynamicComponent />;
  }, [path, category]);

  const codeString = useMemo(() => {
    const showcaseComponent = allShowcaseComponents.find(
      (component) =>
        component._raw.flattenedPath === `showcase/${category}/${path}`
    );
    return showcaseComponent ? showcaseComponent.body.code : "Code not found.";
  }, [path, category]);

  return (
    <div className="my-10 w-full">
      <div className="flex-center h-52">{Preview}</div>
      <article className="prose-sm h-96 overflow-y-auto">
        <Mdx source={codeString} />
      </article>
    </div>
  );
}
