import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import CustomLink from "./custom-link";
import React from "react";
import { Callout } from "./call-out";
import CodeBlock from "./code-block";
import  ComponentPreview  from "./component-preview";
import dynamic from "next/dynamic";

export const H1Reveal = dynamic(() => import("../custom/h1-reveal"), {
  ssr: false,
});

// src\components\mdx\mdx-components.tsx

//define all mdx components here
export const components = {
  //////////////////////////////////////////////////////////////////////
  // html components
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h1
        className={cn(
          "scroll-m-20 text-[3rem] md:text-[4rem] xl:text-[6rem] leading-[7rem] drop-shadow-xl font-bold  uppercase tracking-tight",
          className
        )}
        {...props}
      />
    );
  },
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "capitalize mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "font-title mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn("m-0 border-t p-0", className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  //////////////////////////////////////////////////////////////////////
  // custom components down here

  // customLink
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink
      className={cn(
        "font-semibold text-gray-500 custom-underline mx-1 pb-[6px]",
        className
      )}
      {...props}
    />
  ),
  // custom heading for toc component
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const id = React.useMemo(() => {
      if (props.id) return props.id;
      if (typeof props.children === "string") {
        return props.children.toLowerCase().replace(/\s+/g, "-");
      }
      return "";
    }, [props.id, props.children]);

    return (
      <div className="relative h-10 w-max">
        <h2
          id={id}
          className={cn(
            "mt-10 scroll-m-10 pb-3 pr-4 text-2xl font-bold capitalize w-max custom-underline cursor-pointer ",
            className
          )}
          {...props}
        />
      </div>
    );
  },

  // code block
  pre: CodeBlock, //pre as a  codeblock by bright.
  // callout
  Callout,
  ComponentPreview,
  H1Reveal,
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
    <>
      <Component components={components} />
    </>
  );
}
