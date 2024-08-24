import React from "react";

import { Code } from "bright";
import CopyPasteButton from "./copy-button";

const CodeBlock = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  // Extract the content of the code block
  const codeContent = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") {
        return child;
      }
      if (
        React.isValidElement(child) &&
        typeof child.props.children === "string"
      ) {
        return child.props.children;
      }
      return "";
    })
    .join("");

  return (
    <div className="relative my-6">
      <span className="flex-1 absolute right-6 top-6 z-10">
        <CopyPasteButton content={codeContent} />
      </span>

      <div className="bg-[#1f1f1f] prose-sm max-h-80 overflow-y-auto scrollbar-custom  px-1 rounded-lg">
        <Code
          className="text-lg"
          titleClassName="text-base font-medium rounded-xl "
          theme={"min-dark"}
          lineNumbers
          {...props}
        >
          {children}
        </Code>
      </div>
    </div>
  );
};

export default CodeBlock;
