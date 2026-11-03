export type LinkItem = {
  id: string;
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
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile-placeholder.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://linkedin.com" },
    { id: "blog", title: "Blog", url: "https://blog.naver.com" },
  ],
};
