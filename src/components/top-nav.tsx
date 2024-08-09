import React from "react";
import ThemeToggle from "./theme-toggle";

const TopNav = () => {
  return (
    <nav className="container flex-between py-4">
      <span>mxnan.com</span>
      <ThemeToggle />
    </nav>
  );
};

export default TopNav;
