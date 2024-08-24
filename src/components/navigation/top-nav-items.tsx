"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowRightCircleIcon } from "lucide-react";

const transition = {
  type: "tween",
  mass: 0.5,
  damping: 20,
  stiffness: 150,
  restDelta: 0.001,
  restSpeed: 0.001,
};

// menu items and their popup div
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const href = item.startsWith("/") ? item : `/${item.toLowerCase()}`;
  const isSelected = pathname === href;

  return (
    <div
      onClick={() => setActive(item)}
      onMouseEnter={() => setActive(item)}
      className="relative group/item"
    >
      <Link href={href}>
        <motion.div
          transition={{ duration: 0.3 }}
          className={cn(
            "relative capitalize cursor-pointer tracking-wide h-16 flex items-center",
            active === item &&
              "-translate-y-1 transition-transform ease-in-out duration-700"
          )}
        >
          {/* ghost button classes */}
          <Button
            variant={"ghost"}
            size={"sm"}
            className={cn(
              " font-medium  px-6 py-2 ml-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-900 ",
              isSelected &&
                " text-gray-500 dark:text-gray-400 transition-all ease-in-out duration-300  "
            )}
          >
            {item}
          </Button>
        </motion.div>
      </Link>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 1, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[62px] left-1/2 w-min -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-stone-50 dark:bg-stone-950 backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div layout className="relative w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

//main menu container
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative flex-center"
    >
      {children}
    </div>
  );
};

//card for displaying blogs and components
export const ContentCard = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description?: string;
  href: string;
  src?: string;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className="flex flex-row items-center space-x-4 p-2 rounded-xl group/card "
    >
      <div className="flex-1 space-y-2 pr-2">
        <h4
          className={cn(
            "text-sm uppercase font-title font-medium text-gray-500",
            pathname == href && "text-gray-700 dark:text-gray-400"
          )}
        >
          {title}{" "}
          {!src && (
            <ArrowRightCircleIcon className="ml-4 w-4 h-4 text-black dark:text-white inline-block group-hover/card:translate-x-3 transition-transform ease-in-out duration-500 " />
          )}
        </h4>
        <p className="text-sm max-w-xs font-title text-gray-500 capitalize font-light group-hover/card:translate-y-2 group-hover/card:translate-x-1 transition-transform ease-in-out duration-500">
          {description}
        </p>
      </div>
      {src && (
        <div className="relative w-36 h-24 group-hover/card:translate-x-2 transition-transform ease-in-out duration-500  flex-shrink-0">
          <Image
            src={src!}
            alt={title}
            fill
            priority
            style={{ objectFit: "cover" }}
            className="rounded-lg "
            sizes="(max-width: 768px) 128px, 128px"
          />
        </div>
      )}
    </Link>
  );
};

/// not using menu and menuitem from top-nav-items as it slows pages  down ..
/// top-nav-items.tsx items
{
  /***  
        <Menu setActive={setActive}>
     
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
        </Menu>***/
}
