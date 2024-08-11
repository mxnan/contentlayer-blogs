"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CopyPlus } from "lucide-react";
import React, { useEffect, useState } from "react";


const CopyPasteButton = ({ id }: { id: string }) => {
  const [copied, setCopied] = useState(false);
  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  const handleCopy = async () => {
    const text = document.getElementById(id)?.textContent;
    try {
      await navigator.clipboard.writeText(text!);
      setCopied(true);
      console.log("Copied to clipboard");
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      onClick={handleCopy}
      className="p-2 w-8 h-8 rounded-lg hover:bg-gray-200 dark:hover:bg-stone-900 cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="checkmark"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Check size={16} />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <CopyPlus size={16} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyPasteButton;