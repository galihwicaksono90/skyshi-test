import { ArrowDownUp } from "lucide-react";
import { Button } from "@/components//ui/button";
import { Trigger } from "@radix-ui/react-select";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";

const options: { label: string; value: string }[] = [
  {
    label: "Very High",
    value: "very-high",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Medium",
    value: "normal",
  },
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Very Low",
    value: "very-low",
  },
];

export default function SortSelect() {
  return (
    <Select>
      <Trigger asChild>
        <Button className="rounded-full w-10 p-0" variant="outline">
          <ArrowDownUp />
        </Button>
      </Trigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            <div className="flex justify-between items-center">
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
