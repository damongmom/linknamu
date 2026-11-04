type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className="h-28 w-28 rounded-full border-4 border-avatar-border object-cover shadow-avatar"
        />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-avatar-border bg-surface text-3xl font-semibold shadow-avatar"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-7 text-3xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-balance break-keep text-muted">{bio}</p>
    </header>
  );
}
