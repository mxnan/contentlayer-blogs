// app/components/Sidebar.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { componentSidebar } from "@/lib/site.config";
import {  CircleArrowRight } from "lucide-react";

export default function ComponentSidebar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1420); // Adjust breakpoint as needed
    };

    // Check on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  // useEffect for window resize
  return <>{isMobile ? <MobileSidebar /> : <DesktopSidebar />}</>;
}

const DesktopSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-full relative overflow-x-hidden">
      <div className="fixed left-4 top-44 h-[70vh] overflow-y-auto space-y-5 p-4">
        {/* Link for /components*/}
        <Link
          href="/components"
          className={cn(
            "flex justify-between w-full  hover:translate-x-2 transition-all ease-in-out duration-300",
            {
              "font-semibold translate-x-2": pathname === "/components",
              "text-gray-500": pathname !== "/components",
            }
          )}
        >
          <p className="custom-underline  flex items-center gap-2 text-base w-min pb-2">
            Introduction
            <CircleArrowRight 
              className={cn(
                "w-4 h-4  opacity-0 transition-opacity ease-in-out duration-300",
                pathname === "/components" && "opacity-100"
              )}
            />
          </p>
        </Link>
        {/* Mapping over componentSidebar from lib/site.config*/}
        {componentSidebar.map((category) => (
          <div key={category.category} className=" space-y-4">
            <span className="font-medium  px-1 py-2">
              {category.category}
            </span>

            <ul className="space-y-2 ">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className=" mb-1  hover:translate-x-2 transition-all ease-in-out duration-300"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "custom-underline w-max pb-2 flex items-center gap-2 text-sm ",
                      {
                        "font-semibold translate-x-2 transition-all ease-in-out duration-300 ":
                          pathname === item.href,
                        "text-gray-500": pathname !== item.href,
                      }
                    )}
                  >
                    {item.name}
                    <CircleArrowRight 
                      className={cn(
                        "w-4 h-4 opacity-0 ",
                        pathname === item.href && "opacity-100"
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="h-full hidden overflow-y-auto">
      <div className="sticky top-0 p-2">
        <h2 className="text-base font-bold mb-4">Components</h2>
        <Link
          href="/components"
          className={cn(
            "flex justify-between w-full mb-4 hover:translate-x-2 transition-transform ease-in-out duration-300",
            {
              "text-plight dark:text-pdark font-semibold translate-x-2 transition-transform ease-in-out duration-300":
                pathname === "/components",
              "text-gray-500": pathname !== "/components",
            }
          )}
        >
          <p className="custom-underline text-sm w-min pb-2">Introduction</p>
        </Link>
        {componentSidebar.map((category) => (
          <div key={category.category} className="mb-4">
            <h3 className="text-base font-semibold mb-2">
              {category.category}
            </h3>
            <ul className="space-y-2 ">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="mb-1 hover:translate-x-2 transition-transform ease-in-out duration-300"
                >
                  <Link
                    href={item.href}
                    className={cn("custom-underline text-sm w-max pb-2 ", {
                      "text-plight dark:text-pdark font-semibold ":
                        pathname === item.href,
                      "text-gray-500": pathname !== item.href,
                    })}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

const buttonSidebar = () => {};

// create a collapsible as a optional sidebar for smaller screens using uef on main export function
