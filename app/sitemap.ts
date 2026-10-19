import { getBlogPosts } from "@/app/blog/utils";
import { baseUrl } from "@/app/lib/site";

export { baseUrl };

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog", "/art", "/education", "/education/economics"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    }),
  );

  return [...routes, ...blogs];
}
