//components sidebar config//
//define new components here ,so their links regenerated in sidebar

export const componentSidebar: {
  category: string;
  items: { name: string; href: string }[];
}[] = [
  {
    category: "Playground",
    items: [{ name: "Particles reveal", href: "/components/playground/particles-reveal" }],
  },
  {
    category: "Loaders",
    items: [{ name: "Spin", href: "/components/loaders/spin"}]
  }

  // Add more categories and items as needed
];

export const Navlinks: { name: string; link: string }[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Components",
    link: "/components",
  },

  {
    name: "Blogs",
    link: "/blogs",
  },

  {
    name: "Contact",
    link: "/contact",
  },
];
