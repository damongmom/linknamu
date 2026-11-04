import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-7 py-24">
      <div className="flex w-full max-w-sm motion-safe:animate-rise flex-col items-center gap-12">
        <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
        <ul className="flex w-full flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard emoji={link.emoji} title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
