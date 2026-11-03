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
          className="h-24 w-24 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
        />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-3xl font-semibold text-emerald-700 ring-2 ring-zinc-200 dark:bg-emerald-900 dark:text-emerald-200 dark:ring-zinc-700"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-4 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-zinc-600 dark:text-zinc-400">{bio}</p>
    </header>
  );
}
