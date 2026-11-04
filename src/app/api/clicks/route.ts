import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// 모든 링크의 현재 클릭 수를 한 번에 돌려준다
export async function GET() {
  // 빌드 시점에 미리 만들지 않고 요청마다 DB에서 읽는다
  await connection();

  try {
    const ids = profile.links.map((link) => link.id);
    const docs = await getClicksCollection()
      .find({ _id: { $in: ids } })
      .toArray();
    const counts = Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));

    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error instanceof Error ? error.message : error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
