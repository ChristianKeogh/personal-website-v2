import { getBlogPosts } from "@/app/blog/utils";
import { CustomMDX } from "@/app/components/mdx";
import ScrollProgress from "@/app/components/scroll-progress";
import { baseUrl } from "@/app/lib/site";
import { notFound } from "next/navigation";
import { formatDate } from "../client-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const post = getBlogPosts().find((entry) => entry.slug === params.slug);
  if (!post) return;

  const { title, publishedAt: publishedTime, summary: description, image } =
    post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article" as const,
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default async function Blog(props: PageProps) {
  const params = await props.params;
  const post = getBlogPosts().find((entry) => entry.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section>
      <ScrollProgress />
      <h1 className="title font-medium text-2xl tracking-tight text-neutral-400">
        {post.metadata.title}
      </h1>
      <p className="mt-2 mb-8 text-sm text-neutral-600">
        {formatDate(post.metadata.publishedAt)}
      </p>
      <article className="prose">
        <CustomMDX source={post.content} options={{ blockJS: false }} />
      </article>
    </section>
  );
}
