import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const monthDictionary: Record<number, string> = {
  1: "Januari",
  2: "Februari",
  3: "Maret",
  4: "April",
  5: "Mei",
  6: "Juni",
  7: "Juli",
  8: "Agustus",
  9: "September",
  10: "Oktober",
  11: "November",
  12: "Desember",
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseDate(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = monthDictionary[date.getMonth() + 1] as string;
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
