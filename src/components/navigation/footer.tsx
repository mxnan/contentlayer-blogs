"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TwitterLogo from "../logos/twitter";
import GithubLogo from "../logos/github";
import LinkedinLogo from "@/components/logos/linkedin";
import dynamic from "next/dynamic";

const DynamicRetroGrid = dynamic(() => import("../custom/bg-grid-pattern"), {
  ssr: false,
});
interface FooterLinksProps {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export const FooterLinks: {
  main: FooterLinksProps[];
  social: FooterLinksProps[];
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
      icon: <TwitterLogo className="w-6 h-6 " />,
    },
    {
      name: "GitHub",
      href: "https://github.com/mxnan",
      icon: <GithubLogo className="w-6 h-6" />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/manan-negi-377373140/",
      icon: <LinkedinLogo className="w-6 h-6" />,
    },
  ],
};

const Footer: React.FC = () => {
  const pathname = usePathname();
  return (
    <footer className="w-full relative">
      <DynamicRetroGrid />
      <div
        className="mx-auto  w-full max-w-6xl
      pb-32 pt-20 space-y-10"
      >
        <div className=" flex justify-center gap-2">
          {FooterLinks.social.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip disableHoverableContent delayDuration={0}>
                <TooltipTrigger className="p-2 rounded-xl hover:bg-stone-200 dark:hover:bg-stone-800 group/icon">
                  <a
                    aria-label={item.name}
                    rel="noopener noreferrer"
                    target="_blank"
                    href={item.href}
                    className="fill-black dark:fill-white group-hover/icon:fill-indigo-800 dark:group-hover/icon:fill-amber-700"
                  >
                    {item.icon}
                  </a>
                </TooltipTrigger>
                <TooltipContent className="mr-12 mb-2 text-indigo-800 dark:text-amber-700">
                  <p className=" flex items-center gap-2 text-sm">
                    {item.name} <ChevronDown className="w-4 h-4 " />
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <nav className="flex flex-wrap justify-center mr-4">
          {FooterLinks.main.map((item) => (
            <div
              key={item.name}
              className="px-5 pt-1 flex items-center justify-center "
            >
              <Link href={item.href}>
                <Button
                  aria-label={item.name}
                  variant={"link"}
                  size={"link"}
                  className={cn(
                    "font-medium custom-underline flex-1",
                    pathname === item.href && "text-black dark:text-white"
                  )}
                >
                  {item.name}
                </Button>
              </Link>
            </div>
          ))}
        </nav>
        <p className="mt-6 flex flex-col text-center text-sm ">
          <span className="text-gray-500 font-semibold ">
            &copy; {new Date().getFullYear()}{" "}
            <span className="mx-1 font-semibold text-indigo-900 dark:text-amber-700">
              mxnan.com
            </span>{" "}
          </span>
          <span className="mt-2 "> All rights reserved.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
