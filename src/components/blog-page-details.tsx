"use client";
import React from "react";
import { getFormattedDate } from "@/lib/utils";
import Image from "next/image";
import { ClockIcon } from "lucide-react";
import type { Blogs } from "contentlayer/generated";
import { motion } from "framer-motion";
import { WobbleCard } from "./custom/wobble-card";

const BlogPageDetails = ({ blogs }: { blogs: Blogs }) => {
  const container = {
    hidden: { opacity: 0, y: -100 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
        type: "tween",
        damping: 50,
        stiffness: 200,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <div className="relative hidden md:block ">
      {/* image div*/}
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: "100%",
          transition: {
            duration: 1,
            width: { duration: 1 },
            height: { duration: 1 },
            type: "tween",
            damping: 50,
            stiffness: 200,
          },
        }}
        className="relative h-96 aspect-video overflow-hidden"
      >
        <motion.div
          initial={{ opacity: "0", y: -200 }}
          animate={{
            opacity: 100,
            y: 0,
            transition: {
              duration: 1,

              type: "tween",
              damping: 50,
              stiffness: 200,
            },
          }}
          className="w-full h-full relative"
        >
          <Image
            title={blogs?.title || ""}
            src={blogs?.image || ""}
            alt={blogs?.title || ""}
            priority
            fill
            sizes="(100vw, 100vh)"
            className="rounded-2xl object-center object-cover border-4 border-gray-600 dark:border-gray-400"
          />
        </motion.div>
      </motion.div>
      {/* text div */}
      <WobbleCard
        containerClassName="bg-gray-900 dark:bg-gray-400 absolute top-6 right-6 max-w-lg w-full "
        className="flex flex-col md:flex-row justify-between p-8 text-white dark:text-black"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-4 lg:pr-8 "
        >
          <motion.div variants={container} className="space-y-6">
            <motion.h1
              variants={item}
              className="scroll-m-10 uppercase tracking-tight
                  text-5xl
                drop-shadow-2xl font-semibold "
            >
              {blogs?.title}
            </motion.h1>
            <motion.p variants={item} className="text-base lg:text-lg ">
              {blogs?.description}
            </motion.p>
          </motion.div>

          <motion.div variants={container} className="flex flex-col  gap-2">
            <motion.div variants={item} className="flex w-max">
              {blogs?.tags &&
                blogs?.tags.map((tag: any) => (
                  <motion.span
                    key={tag}
                    variants={item}
                    className="text-sm p-2 font-bold"
                  >
                    [ <span className=" font-medium ">{tag}</span> ]
                  </motion.span>
                ))}
            </motion.div>
            <motion.div
              variants={container}
              className="flex text-xs font-medium items-center gap-3"
            >
              <motion.p variants={item} className="flex gap-3">
                <ClockIcon className="w-4 h-4" />
                {getFormattedDate(blogs?.date || "")}
              </motion.p>{" "}
              <motion.span
                variants={item}
                className="pl-3 border-l-4 border-gray-200 dark:border-gray-600 "
              >
                {blogs?.readingTime?.text}
              </motion.span>
            </motion.div>
          </motion.div>
        </motion.div>{" "}
      </WobbleCard>
    </div>
  );
};

export default BlogPageDetails;
