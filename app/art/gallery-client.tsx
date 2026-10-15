"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

export type Category = "Production" | "Personal";

export interface ArtItem {
  id: string;
  title: string;
  category: Category;
  url: string;
  description: string;
  folder: string;
}

function ItemCaption({ item }: { item: ArtItem }) {
  const showDescription =
    item.description !== "" && item.description !== item.title;
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
        {item.title}
      </h3>
      {showDescription ? (
        <p className="text-sm text-neutral-600">{item.description}</p>
      ) : null}
    </div>
  );
}

export default function GalleryClient({
  initialItems,
  error,
}: {
  initialItems: ArtItem[];
  error?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<Category | "All">(
    "Production",
  );
  const [index, setIndex] = useState(-1);

  const filteredItems = useMemo(
    () =>
      initialItems.filter((item) =>
        activeCategory === "All" ? true : item.category === activeCategory,
      ),
    [initialItems, activeCategory],
  );

  const groups: { folder: string; items: ArtItem[] }[] = [];
  const ungrouped: ArtItem[] = [];
  const byFolder = new Map<string, ArtItem[]>();
  for (const item of filteredItems) {
    if (!item.folder) {
      ungrouped.push(item);
      continue;
    }
    let bucket = byFolder.get(item.folder);
    if (!bucket) {
      bucket = [];
      byFolder.set(item.folder, bucket);
      groups.push({ folder: item.folder, items: bucket });
    }
    bucket.push(item);
  }
  if (ungrouped.length) {
    groups.unshift({ folder: "", items: ungrouped });
  }

  const slides = useMemo(
    () =>
      filteredItems.map((item) => ({
        src: item.url,
        alt: item.title,
        title: item.title,
        description:
          item.description !== "" && item.description !== item.title
            ? item.description
            : undefined,
      })),
    [filteredItems],
  );

  return (
    <div>
      <p className="text-neutral-600 mb-8">
        A collection of my work ranging from professional production pieces to
        personal explorations
      </p>

      {error ? (
        <p className="text-neutral-400 mb-8 break-words">{error}</p>
      ) : null}

      <div className="flex gap-6 border-b border-neutral-900 pb-2 mb-10">
        {(["All", "Production", "Personal"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActiveCategory(cat);
              setIndex(-1);
            }}
            className={`pb-2 text-[11px] uppercase tracking-[0.2em] ${
              activeCategory === cat
                ? "text-neutral-400"
                : "text-neutral-700 hover:text-neutral-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.folder || "ungrouped"}>
            {group.folder ? (
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
                {group.folder}
              </h2>
            ) : null}
            <div className="columns-1 gap-6">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setIndex(filteredItems.indexOf(item))}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      setIndex(filteredItems.indexOf(item));
                    }
                  }}
                  className="mb-6 break-inside-avoid flex flex-col space-y-3 cursor-zoom-in"
                >
                  <div className="overflow-hidden border border-neutral-900 bg-black">
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 36rem"
                      className="w-full grayscale-[30%]"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <ItemCaption item={item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {!error && filteredItems.length === 0 ? (
        <p className="text-neutral-600 py-20">
          No items found in this category.
        </p>
      ) : null}

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails, Counter]}
        controller={{ closeOnBackdropClick: true }}
        counter={{ style: { top: "2.75rem" } }}
      />
    </div>
  );
}
