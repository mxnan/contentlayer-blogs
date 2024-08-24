"use client";
import React, { useEffect, useRef, useState } from "react";
import ThemeToggle from "../theme-toggle";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Wind } from "lucide-react";
import { BorderBeam } from "../custom/border-beam";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Navlinks } from "@/lib/site.config";

// main navbar for exporting to baselayout
export default function Navbar() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    // Check on initial render
    checkScreenSize();

    // Add event listener for window resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  // useEffect for window resize
  return (
    <header className="relative w-full z-50 bg-stone-50 dark:bg-stone-950 ">
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </header>
  );
}

// desktop nav
const DesktopNav = () => {
  // for auto hiding navbar on scrolldown
  const pathname = usePathname();
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);

      lastYRef.current = y;
    }
  });
  //////////////////////////

  // for hover effect
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  /// ////////////////////////////

  return (
    <motion.div
      animate={isHidden ? "hidden" : "visible"}
      whileHover="visible"
      onHoverStart={() => setIsHidden(false)}
      onFocusCapture={() => setIsHidden(false)}
      variants={{
        hidden: {
          y: "-83%",
          opacity: 0.5,
          scaleX: 0.95,
        },
        visible: {
          y: "0%",
          opacity: 1,
          scaleX: 1,
        },
      }}
      transition={{
        duration: 0.3,
        type: "tween",
        damping: 80,
        stiffness: 200,

        ease: "easeInOut",
      }}
      className={cn(
        "w-full backdrop-blur-3xl fixed -top-1  max-sm:py-6 inset-x-0 border-stone-200 dark:border-stone-800   ",
        isHidden ? "border-b-[5px]" : "border-b-[1px]  "
      )}
    >
      <BorderBeam />
      <div className="relative mt-2 px-[1.5rem] lg:px-24 w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-sm text-gray-600 dark:text-gray-300 gap-3"
        >
          {pathname === "/" ? <Wind className="w-5 h-5" /> : <p>mxnan.com</p>}
        </Link>
        <div className="flex items-center my-3">
          {Navlinks.slice(1).map((link, index) => (
            <Link
              key={link.link}
              href={link.link}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative block w-full px-6 py-2  h-full text-sm font-medium "
            >
              <AnimatePresence mode="wait">
                {hoveredIndex === index && (
                  <motion.span
                    className="absolute inset-0 h-full w-full block rounded-lg
                  bg-gray-300/[0.2] dark:bg-stone-700/[0.5]
                 border-gray-300 dark:border-gray-700 border"
                    layoutId="hoverBackground"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,

                      transition: {
                        duration: 0.2,
                        ease: "easeInOut",
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        duration: 0.1,
                        delay: 0.05,
                        ease: "easeInOut",
                      },
                    }}
                  />
                )}
              </AnimatePresence>

              {link.name}
            </Link>
          ))}
        </div>

        <ThemeToggle />
      </div>
    </motion.div>
  );
};

// mobile nav
const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const dropIn = {
    hidden: {
      opacity: 0,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative w-full z-50 bg-white dark:bg-black  ">
      <div
        className="fixed top-0 backdrop-blur-3xl
      flex items-center justify-between py-4 container"
      >
        <ThemeToggle />
        <div className="relative uppercase  font-body text-lg ">
          <div className="flex items-center justify-between gap-4">
            <Link href={Navlinks[0].link} legacyBehavior>
              <a
                className={cn(
                  "font-medium block py-2",
                  pathname === "/" && "text-plight dark:text-pdark"
                )}
              >
                {Navlinks[0].name}
              </a>
            </Link>
            <button
              className="fill-black dark:fill-white"
              onClick={toggleMenu}
              aria-label="Toggle Mobile Menu"
            >
              <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={dropIn}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-10 right-0 w-max mx-auto
                 bg-stone-100 dark:bg-stone-900
                  border-[1px] border-stone-200 dark:border-stone-800
                  shadow-md rounded-xl p-4 flex flex-col gap-3"
              >
                {Navlinks.slice(1).map((link) => (
                  <Link
                    key={link.link}
                    href={link.link}
                    className="font-medium"
                  >
                    {link.name}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

