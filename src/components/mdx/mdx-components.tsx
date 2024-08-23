import { useMDXComponent } from "next-contentlayer/hooks";

import React from "react";
import { Callout } from "./call-out";

import dynamic from "next/dynamic";
import LoaderCircleSpin from "../ui/loader-circle-spin";
import { basecomponents } from "./mdx-base";

const CodeBlock = dynamic(() => import("./code-block"), {
  ssr: true,
  loading: () => <LoaderCircleSpin />,
});
const ComponentPreview = dynamic(() => import("./component-preview"), {
  ssr: false,
  loading: () => <LoaderCircleSpin />,
});

// src\components\mdx\mdx-components.tsx

//define all mdx components here
export const components = {
  ...basecomponents, // imported from mdx-base.tsx

  // code block
  pre: CodeBlock, //pre as a  codeblock by bright.
  // callout
  Callout,
  ComponentPreview,
  // importing dynamically on top
};

// types
export interface MDXProps {
  source: string | any;
}

export function Mdx({ source }: MDXProps) {
  // use mdx component hook
  const Component = useMDXComponent(source);

  return (
    
      <Component components={components} />
   
  );
}
