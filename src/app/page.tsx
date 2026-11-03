import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="flex w-full max-w-md flex-col items-center gap-8">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="flex w-full flex-col gap-3">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
