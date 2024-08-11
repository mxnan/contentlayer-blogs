import { cn } from "@/lib/utils";
import { useMDXComponent } from "next-contentlayer/hooks";
import CustomLink from "./custom-link";
import React from "react";
import NewPre from "./new-pre";

const components = {
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
      <div className="relative w-max">
        <h2
          id={id}
          className={cn(
            "mt-10 scroll-m-20 pb-3 pr-4 uppercase text-2xl lg:text-4xl font-semibold w-max custom-underline cursor-pointer ",
            className
          )}
          {...props}
        />
      </div>
    );
  },
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <CustomLink
      className={cn(
        "font-semibold text-gray-500 custom-underline mx-1 pb-[6px]",
        className
      )}
      {...props}
    />
  ),
  pre: NewPre,
  //copy button not working
};

interface MDXProps {
  source: string | any;
}

export function Mdx({ source }: MDXProps) {
  const Component = useMDXComponent(source);

  return (
    <>
      <Component components={components} />
    </>
  );
}

