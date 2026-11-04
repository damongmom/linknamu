"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type Counts = Record<string, number>;

export default function LinkList({ links }: { links: LinkItem[] }) {
  const [counts, setCounts] = useState<Counts>({});

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져온다
  useEffect(() => {
    const controller = new AbortController();

    async function loadCounts() {
      try {
        const response = await fetch("/api/clicks", { cache: "no-store", signal: controller.signal });
        if (!response.ok) return;
        const data: { counts: Counts } = await response.json();

        // 응답을 기다리는 사이에 누른 클릭이 지워지지 않도록 더 큰 값을 남긴다
        setCounts((current) => {
          const next = { ...current };
          for (const [id, count] of Object.entries(data.counts)) {
            next[id] = Math.max(next[id] ?? 0, count);
          }
          return next;
        });
      } catch (error) {
        if (!controller.signal.aborted) console.error("클릭 수를 불러오지 못했습니다.", error);
      }
    }

    loadCounts();
    return () => controller.abort();
  }, []);

  async function recordClick(id: string) {
    // 화면에는 바로 반영하고, 저장에 실패하면 되돌린다
    setCounts((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));

    try {
      // keepalive: 링크로 이동하는 중에도 요청이 취소되지 않게 한다
      const response = await fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: { count: number } = await response.json();

      setCounts((current) => ({ ...current, [id]: Math.max(current[id] ?? 0, data.count) }));
    } catch (error) {
      console.error("클릭 수를 저장하지 못했습니다.", error);
      setCounts((current) => ({ ...current, [id]: Math.max((current[id] ?? 0) - 1, 0) }));
    }
  }

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            emoji={link.emoji}
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onVisit={() => recordClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
