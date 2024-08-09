import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
/////////

//nested type for image
const Image = defineNestedType(() => ({
  name: "Image",
  fields: {
    src: {
      type: "string",
      required: true,
    },
    alt: {
      type: "string",
      required: true,
    },
    width: {
      type: "number",
      required: true,
    },
    height: {
      type: "number",
      required: true,
    },
  },
}));

//document type for blogs
export const Blogs = defineDocumentType(() => ({
  name: "Blogs",
  filePathPattern: "blogs/*.mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    type: {
      type: "string",
      required: true,
    },
    date: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
    image: {
      type: "nested",
      of: Image,
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
  },
}));


//make source  function for contentlayer
export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [Blogs],
});
