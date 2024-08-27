"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const OpenCloseButton = ({
  onclickFunction,
  isOpen,
  text1,
  text2,
  className,
}: {
  onclickFunction: () => void;
  isOpen: boolean;
  text1?: string;
  text2?: string;
  className?: string;
}) => {
  return (
    <>
      <motion.div
        className={cn("z-50 ", className)}
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        <Button
          variant={"secondary"}
          onClick={onclickFunction}
          className="flex items-center gap-4 "
        >
          {text1 && text2 && <span>{isOpen ? text2 : text1}</span>}

          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 23 23"
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            className=" stroke-indigo-700 dark:stroke-amber-700"
          >
            <motion.path
              variants={{
                closed: { d: "M 2 2.5 L 20 2.5" },
                open: { d: "M 3 16.5 L 17 2.5" },
              }}
            />
            <motion.path
              d="M 2 9.423 L 20 9.423"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              variants={{
                closed: { d: "M 2 16.346 L 20 16.346" },
                open: { d: "M 3 2.5 L 17 16.346" },
              }}
            />
          </motion.svg>
        </Button>
      </motion.div>
    </>
  );
};

export default OpenCloseButton;
