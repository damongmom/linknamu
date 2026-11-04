import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 해당 링크의 클릭 수를 1 늘리고 새 값을 돌려준다
export async function POST(_request: Request, { params }: RouteContext<"/api/clicks/[id]">) {
  const { id } = await params;

  // 실제 있는 링크만 집계해 아무 id로나 데이터가 쌓이지 않게 한다
  if (!profile.links.some((link) => link.id === id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const doc = await getClicksCollection().findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );

    return Response.json({ count: doc?.count ?? 0 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error instanceof Error ? error.message : error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
