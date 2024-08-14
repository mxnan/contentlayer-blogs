import { defineDocumentType, makeSource } from "contentlayer/source-files";

//defineDocumentType Blogs
export const Blogs = defineDocumentType(() => ({
  name: "Blogs",
  filePathPattern: "blogs/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    date: { type: "string", required: true },
    image: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    slug: { type: "string", required: true },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blogs/${doc.slug}`,
    },
    toc: {
      type: "json",
      resolve: (doc) => {
        const headings = doc.body.raw.match(/^## (.*$)/gm);
        return headings
          ? headings.map((heading: string) => {
              const title = heading.replace("## ", "").trim();
              const slug = title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");
              return { title, slug };
            })
          : [];
      },
    },
  },
}));

//defineDocumentType Components
export const Components = defineDocumentType(() => ({
  name: "Components",
  filePathPattern: "components/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    category: { type: "string", required: true },
    date: { type: "string", required: true },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^components\//, ""),
    },
    category: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/")[1],
    },
    toc: {
      type: "json",
      resolve: (doc) => {
        const headings = doc.body.raw.match(/^## (.*$)/gm);
        return headings
          ? headings.map((heading: string) => {
              const title = heading.replace("## ", "").trim();
              const slug = title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]+/g, "");
              return { title, slug };
            })
          : [];
      },
    },
  },
}));

// defineDocumentType ShowcaseComponent
export const ShowcaseComponent = defineDocumentType(() => ({
  name: "ShowcaseComponent",
  filePathPattern: `showcase/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    category: { type: "string", required: true },
  },
}));

//makeSource Blogs
export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Blogs, Components, ShowcaseComponent],
});
