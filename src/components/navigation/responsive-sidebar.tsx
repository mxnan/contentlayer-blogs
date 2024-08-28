// components/ResponsiveSidebar.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { componentSidebar } from "@/lib/site.config";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import OpenCloseButton from "./open-close-button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ResponsiveSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1440); // Adjust breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0, scaleY: 1, opacity: 1 },
    closed: { x: "-100%", scaleY: 0.4, opacity: 0 },
  };

  return (
    <>
      {isMobile && (
        <OpenCloseButton
          className="fixed top-4 left-20 md:left-28 md:top-3 "
          text1="See all ?"
          text2="Close"
          isOpen={isOpen}
          onclickFunction={toggleSidebar}
        />
      )}
      <motion.div
        className={cn(
          "fixed z-30 top-44 h-[70vh] p-4 ",
          isMobile
            ? "w-64 left-0 bg-white dark:bg-black rounded-2xl shadow-xl border border-stone-300 dark:border-stone-700"
            : "w-56 bg-transparent border-0 shadow-none flex-1 left-[calc(50%-47rem)] 2xl:left-[calc(50%-50rem)]   "
        )}
        initial={isMobile ? "closed" : "open"}
        animate={isMobile ? (isOpen ? "open" : "closed") : "open"}
        variants={sidebarVariants}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
          type: "tween",
          damping: 50,
          stiffness: 200,
          restDelta: 0.001,
        }}
      >
        <nav
          className={cn(
            "flex-1 flex flex-col mt-10 gap-4",
            isMobile
              ? "pr-12 border-r-2 border-gray-400 dark:border-gray-700"
              : ""
          )}
        >
          {/* Mapping over componentSidebar from lib/site.config*/}
          {componentSidebar.map((category) => (
            <div
              key={category.category}
              className="flex flex-col items-end gap-3"
            >
              <span className="font-medium text-xl">{category.category}</span>

              <ul className="flex flex-col gap-1 ">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="hover:-translate-x-2 transition-transform ease-in-out duration-300"
                  >
                    <Link
                      href={item.href}
                      className="custom-underline font-light w-max pb-2 flex items-center gap-2 group/rotate"
                    >
                      {item.name}
                      <ArrowDownRight
                        className={cn(
                          "w-4 h-4 text-gray-500 group-hover/rotate:-rotate-[30deg] transition-transform ease-in-out duration-300",
                          item.href === pathname &&
                            " text-black dark:text-white stroke-[3px] transition-colors ease-in-out duration-300"
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </motion.div>
    </>
  );
};

export default ResponsiveSidebar;
