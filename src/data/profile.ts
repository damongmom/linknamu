export type LinkItem = {
  id: string;
  emoji: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl?: string;
  links: LinkItem[];
};

// 샘플 데이터: 실제 프로필 정보와 링크로 바꿔서 사용하세요.
export const profile: Profile = {
  name: "Jessica Son",
  bio: "SCM 데이터 분석가 : AI 에 관심이 많은 초보자",
  imageUrl: "https://placehold.co/150x150/orange/white",
  links: [
    { id: "github", emoji: "🐙", title: "Github", url: "https://github.com/damongmom" },
    { id: "blog", emoji: "📝", title: "Blog", url: "https://blog.naver.com/mimopa" },
  ],
};
