import { getBlogPosts } from "@/app/blog/utils";
import { BlogPosts } from "@/app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function BlogPage() {
  const allBlogs = getBlogPosts();

  return (
    <section>
      <h1 className="mb-10 text-sm tracking-[0.22em] uppercase text-neutral-600">
        Blog
      </h1>
      <BlogPosts allBlogs={allBlogs} />
    </section>
  );
}
