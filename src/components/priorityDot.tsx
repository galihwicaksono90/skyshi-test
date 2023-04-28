import { Priority } from "@/types";

interface PriorityDotProps {
  priority: Priority;
}

export default function PriorityDot({ priority }: PriorityDotProps) {
  const getColor = (priority: string) => {
    switch (priority) {
      case "very-high":
        return "red";
      case "high":
        return "orange";
      case "normal":
        return "green";
      case "low":
        return "blue";
      case "very-low":
        return "purple";
      default:
        return "transparent";
    }
  };
  return (
    <div
      className="h-[9px] w-[9px] rounded-full mr-4"
      style={{ background: getColor(priority) }}
    ></div>
  );
}
