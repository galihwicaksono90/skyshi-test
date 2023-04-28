import ActivityCards from "@/components/activityCards";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="w-full">
      <ActivityCards />
    </section>
  );
}
