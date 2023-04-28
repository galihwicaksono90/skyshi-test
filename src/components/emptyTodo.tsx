import Image from "next/image";

export default function TodoEmptyState() {
  return (
    <div className="container mx-auto">
      <div className="relative flex place-items-center max-w-[767px] h-[490px]">
        <Image
          src="/todo-empty-state.svg"
          alt="Vercel Logo"
          className="dark:invert"
          fill
          priority
        />
      </div>
    </div>
  );
}
