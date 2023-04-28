import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-primary">
      <div
        className="container mx-auto text-white flex items-center h-[105px]"
        data-cy="header-background"
      >
        <Link href="/">
          <h2 className="text-2xl font-bold" data-cy="header-title">
            TO DO LIST APP
          </h2>
        </Link>
      </div>
    </header>
  );
}
