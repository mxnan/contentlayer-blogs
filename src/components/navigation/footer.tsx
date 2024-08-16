"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import {
  ArrowRightCircleIcon,
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import RetroGrid from "../custom/bg-grid-pattern";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavigationItem {
  name: string;
  href: string;
  icon?: JSX.Element;
}

const navigation: {
  main: NavigationItem[];
  social: NavigationItem[];
} = {
  main: [
    { name: "Components", href: "/components" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/etc_etcx",
      icon: <TwitterIcon className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com/mxnan",
      icon: <GithubIcon className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/manan-negi-377373140/",
      icon: <LinkedinIcon className="w-5 h-5" />,
    },
  ],
};

const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <footer className="w-full relative">
      <RetroGrid />
      <div
        className="mx-auto  w-full max-w-6xl
   
       px-4 py-12 sm:px-6 lg:px-8"
      >
        <nav className="flex flex-wrap justify-center">
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 pt-1 flexcenter ">
              <Link
                href={item.href}
                className={cn(
                  "text-sm custom-underline pb-2 ",
                  pathname === item.href && "text-gray-600 dark:text-gray-400"
                )}
              >
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="pt-8 flex justify-center gap-6 space-x-6">
          {navigation.social.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={item.href}
                    className=" text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    {item.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent className="mr-12 mb-2">
                  <p className="font-title text-gray-500 flex items-center gap-2 text-sm">
                    {item.name} <ArrowRightCircleIcon className="w-4 h-4 text-black dark:text-white" />
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <p className="mt-6 flex flex-col text-center text-sm ">
          <span className="text-gray-500 font-semibold ">
            &copy; {new Date().getFullYear()}{" "}
            <span className="mx-1 ">mxnan.com</span>{" "}
          </span>
          <span className="mt-2 "> All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
