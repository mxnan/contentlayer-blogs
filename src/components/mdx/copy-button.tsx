"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CopyPlus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const CopyPasteButton = ({ content }: { content: string }) => {
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
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard !");
    } catch {
      toast.error("Error ! Failed to copy ?");
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9, opacity: 0.8 }}
      onClick={handleCopy}
      className="flex-1  flex items-center text-sm gap-3 justify-center px-3 py-2 rounded-lg text-white bg-stone-900 hover:bg-stone-800 cursor-pointer"
    >
      Copy ?
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="checkmark"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Check className="w-4 h-4 text-green-500" />
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex items-center gap-2"
          >
            <CopyPlus className="w-4 h-4 text-amber-400" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CopyPasteButton;
