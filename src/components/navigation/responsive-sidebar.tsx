// components/ResponsiveSidebar.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { componentSidebar } from "@/lib/site.config";
import Link from "next/link";
import { ArrowDownRight, MoveRight } from "lucide-react";
import OpenCloseButton from "../open-close-button";
import { cn } from "@/lib/utils";

const ResponsiveSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1280); // Adjust breakpoint as needed
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
          className="fixed top-5 left-20 md:left-32 md:top-3"
          text1="See all ?"
          text2="Close"
          isOpen={isOpen}
          onclickFunction={toggleSidebar}
        />
      )}
      <motion.div
        className={cn(
          "fixed z-30 left-0 top-44 h-[70vh] p-4 rounded-2xl shadow-xl border border-stone-300 dark:border-stone-700",
          isMobile
            ? "w-64  bg-white dark:bg-black"
            : "w-56 bg-transparent border-0 shadow-none flex justify-center 2xl:ml-4 "
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
        <nav className="flex-1 flex flex-col  gap-4">
          {/* Mapping over componentSidebar from lib/site.config*/}
          {componentSidebar.map((category) => (
            <div key={category.category} className="flex flex-col gap-3">
              <span className="font-medium text-xl px-1 py-1">
                {category.category}
              </span>

              <ul className="flex flex-col gap-1 text-gray-500 dark:text-gray-400">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="hover:translate-x-2 transition-transform ease-in-out duration-300"
                  >
                    <Link
                      href={item.href}
                      className="custom-underline w-max pb-2 flex items-center gap-2 group/link"
                    >
                      {item.name}
                      <ArrowDownRight className="w-4 h-4 group-hover/link:-rotate-45 transition-transform ease-in-out duration-300 " />
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
