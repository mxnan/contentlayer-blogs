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
import {
  ArrowDown10Icon,
  LinkedinIcon,
  LucideTwitter,
  MailIcon,
} from "lucide-react";
import { BorderBeam } from "../custom/border-beam";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ContentCard, Menu, MenuItem } from "./top-nav-items";
import { mobileNavlinks } from "@/lib/site.config";

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
  const [active, setActive] = useState<string | null>(null);
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
        duration: 0.2,
        type: "tween",
        damping: 30,
        stiffness: 120,
        restDelta: 0.001,
      }}
      className={cn(
        "w-full backdrop-blur-3xl fixed -top-1  max-sm:py-6 inset-x-0 border-stone-200 dark:border-stone-800   ",
        isHidden ? "border-b-[5px]   " : "border-b-[1px]  "
      )}
    >
      <BorderBeam />
      <div className="relative mt-2 px-[1.5rem] lg:px-24 w-full flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center text-gray-600 dark:text-gray-300 gap-3"
        >
          {pathname === "/" ? (
            <ArrowDown10Icon className="w-5 h-5" />
          ) : (
            <p>mxnan.com</p>
          )}
        </Link>
        <Menu setActive={setActive}>
          {/*Components*/}
          <MenuItem setActive={setActive} active={active} item="Components">
            <div className="flex flex-col space-y-2 md:space-y-4">
              <ContentCard
                title="Shimmer Button"
                href="/components/buttons/shimmer-button"
              />
              <ContentCard
                title="Bounce Loader"
                href="/components/loaders/bounce-loader"
              />
            </div>
          </MenuItem>
          {/*Blogs*/}
          <MenuItem setActive={setActive} active={active} item="Blogs">
            <div className="flex flex-col space-y-4 md:space-y-6">
              <ContentCard
                title="emailjs"
                href="/blogs/test"
                src="/images/blogs/og.jpg"
                description="implement emailjs on your app using hooks and shadcn form to recieve emails to sned jasdb dsanbjhd jhshbdsa hsd"
              />
              <ContentCard
                title="test"
                href="/blogs/test2"
                src="/images/blogs/og.jpg"
                description="test test test"
              />
            </div>
          </MenuItem>
          {/*Contact*/}
          <MenuItem setActive={setActive} active={active} item="Contact">
            <div className="flex flex-col font-title space-y-4 pr-2 text-sm text-gray-600 dark:text-gray-400">
              <a
                href="/contact#email"
                className="flex-between group pb-2 border-b-[0.1px] border-gray-300 dark:border-gray-600 capitalize gap-4  "
              >
                email{" "}
                <MailIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform ease-in-out duration-500 text-black dark:text-white" />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://www.linkedin.com/in/manan-negi-377373140/"
                className="flex-between group pb-2 border-b-[0.1px] border-gray-300 dark:border-gray-600 capitalize gap-4  "
              >
                linkedin{" "}
                <LinkedinIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform ease-in-out duration-500 text-black dark:text-white" />
              </a>
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://twitter.com/etc_etcx"
                className="flex-between group pb-2 border-b-[0.1px] border-gray-300 dark:border-gray-600 capitalize gap-4  "
              >
                twitter{" "}
                <LucideTwitter className="w-4 h-4 group-hover:translate-x-1 transition-transform ease-in-out duration-500 text-black dark:text-white" />
              </a>
            </div>
          </MenuItem>
        </Menu>
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
        className="fixed top-0 fixed-nav
      flex items-center justify-between py-4 container"
      >
        <ThemeToggle />
        <div className="relative uppercase  font-body text-lg ">
          <div className="flex items-center justify-between gap-4">
            <Link href={mobileNavlinks[0].link} legacyBehavior>
              <a
                className={cn(
                  "font-semibold block py-2",
                  pathname === "/" && "text-plight dark:text-pdark"
                )}
              >
                {mobileNavlinks[0].name}
              </a>
            </Link>
            <button
              className=""
              onClick={toggleMenu}
              aria-label="Toggle Mobile Menu"
            >
              <svg
                className="h-6 w-6 fill-plight dark:fill-pdark "
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
                  shadow-md rounded-xl p-4"
              >
                {mobileNavlinks.slice(1).map((link) => (
                  <Link key={link.link} href={link.link} legacyBehavior>
                    <a
                      className={cn(
                        "block py-2 font-semibold",
                        link.link === pathname && "text-plight dark:text-pdark"
                      )}
                    >
                      {link.name}
                    </a>
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
