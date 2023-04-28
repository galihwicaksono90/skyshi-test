import Image from "next/image";

export default function ActivityEmptyState() {
  return (
    <div className="container mx-auto" data-cy="activity-empty-state">
      <div className="relative flex place-items-center max-w-[767px] h-[490px]">
        <Image
          src="/activity-empty-state.svg"
          alt="Vercel Logo"
          className="dark:invert"
          fill
          priority
        />
      </div>
    </div>
  );
}
