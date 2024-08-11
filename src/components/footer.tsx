"use client";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react";

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
    <footer className="w-full">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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
        <div className="mt-5 flex justify-center space-x-6">
          {navigation.social.map((item) => (
            <Button key={item.name} variant="ghost" size={"icon"}>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href={item.href}
                className="text-gray-600 dark:text-gray-400"
              >
                {item.icon}
              </a>
            </Button>
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
