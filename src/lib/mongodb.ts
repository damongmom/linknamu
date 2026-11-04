import dns from "node:dns";
import { MongoClient } from "mongodb";

type ClickDocument = {
  _id: string; // 링크 id
  count: number;
};

// 개발 중 새로고침이나 서버리스 재호출마다 연결이 늘어나지 않도록 하나만 만들어 재사용한다
declare global {
  var mongoClient: MongoClient | undefined;
}

// 일부 Windows 환경의 Node.js는 DNS 서버를 127.0.0.1로 잡아 mongodb+srv:// 주소를 찾지 못한다.
// 로컬 개발에서 이 경우에만 공용 DNS를 쓰고, 배포 환경은 건드리지 않는다.
if (
  process.env.NODE_ENV === "development" &&
  dns.getServers().every((server) => server === "127.0.0.1" || server === "::1")
) {
  const publicDns = ["8.8.8.8", "1.1.1.1"];
  dns.setServers(publicDns);
  // 드라이버가 쓰는 dns.promises는 설정이 따로 유지될 수 있어 함께 바꾼다
  dns.promises.setServers(publicDns);
}

function getClient() {
  if (!globalThis.mongoClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
    }
    globalThis.mongoClient = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  }
  return globalThis.mongoClient;
}

export function getClicksCollection() {
  // DB 이름은 MONGODB_URI에 적힌 값을 사용한다
  return getClient().db().collection<ClickDocument>("clicks");
}
