import React from "react";
// Import your Code component
import { TerminalIcon } from "lucide-react"; // Import the Terminal icon
import { Code } from "bright";
import CopyPasteButton from "./copy-button";

Code.theme = {
  dark: "min-dark",
  light: "dracula-soft",
  // using a different CSS selector:
  // lightSelector: '[data-theme="light"]',
  // lightSelector: 'html.light',
  inlineCode: "inline-code",
};
// Import the CopyPasteButton component

const NewPre = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  const id = React.useId(); // Generate a unique ID for each code block

  return (
    <div className="relative">
      <div className="flex justify-between items-center ">
        <TerminalIcon className="w-5 h-5 text-gray-500 " />
        <CopyPasteButton id={id} />
      </div>
      <div id={id}>
        <Code className="text-lg" lineNumbers {...props} />
      </div>
    </div>
  );
};

export default NewPre;
