import BlogPostHeader from "@components/BlogPostHeader.astro";
import Code from "@components/Code";

export default {
  pre: (props) => <Code {...props} />,
  h1: (props) => <BlogPostHeader {...props} />,
};
