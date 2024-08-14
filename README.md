
# Next.js + Contentlayer + Tailwind CSS + Framer Motion

## Usage

- site.config.ts for all constants used in the site.

- utils.ts for all utility functions used in the site.

- app/(pages)/ for all pages in the site.

- app/components/[category]/[slug]/page.tsx for displaying mdx files of components.

- app/components/layout.tsx for displaying components in the sidebar.

- app/components/page.tsx for displaying intro page of the components.

- using @/showcase for storing demo files of ui components while their corresponding code is stored in @/content/showcase/{category}/{path}.mdx.

- using @/content/blogs for storing mdx files of blog posts .

- using @/content/components/{category}/{path}.mdx for storing mdx files of components.

## Adding components

- first add in content/components/{category}/{path}.mdx

- then update site.config.ts > componentsidebar ?

- then add a live working showcase of this component in @/showcase/{category}/{path}.tsx

- then add the base code in content/showcase/{category}/{path}.mdx

- then in content/components/{category}/{path}.mdx ,which was edited first.

- use Component Preview component with all required props in @/components/mdx/component-preview.tsx
