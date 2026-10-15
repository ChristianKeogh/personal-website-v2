"use client";

import { formatDate } from "@/app/blog/client-utils";
import Link from "next/link";

interface BlogPost {
  slug: string;
  metadata: {
    publishedAt: string;
    title: string;
    summary: string;
  };
}

export function BlogPosts({ allBlogs }: { allBlogs: BlogPost[] }) {
  return (
    <div>
      {allBlogs
        .sort(
          (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime(),
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-10 block group"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <p className="text-neutral-500 tracking-tight group-hover:text-neutral-400 transition-colors">
                {post.metadata.title}
              </p>
              <p className="text-neutral-600 text-sm tabular-nums shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
            <p className="text-neutral-600 text-sm mt-1">
              {post.metadata.summary}
            </p>
          </Link>
        ))}
    </div>
  );
}
