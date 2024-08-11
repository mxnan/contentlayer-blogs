import React from "react";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

const TopNav = () => {
  return (
    <nav className="container flex-between py-4">
      <span>mxnan.com</span>
      <div className="flex gap-8">
        <Link href="/">Home</Link>
        <Link href="/blogs">blogs</Link>
      </div>
      <ThemeToggle />
    </nav>
  );
};

export default TopNav;
