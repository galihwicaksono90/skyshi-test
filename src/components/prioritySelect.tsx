import { SelectProps } from "@radix-ui/react-select";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import PriorityDot from "@/components/priorityDot";
import { Priority } from "@/types";

const options: { label: string; value: Priority }[] = [
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

type PrioritySelectProps = SelectProps & {};

export default function PrioritySelect({ ...props }: PrioritySelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger dataCy="modal-add-priority-dropdown">
        <SelectValue />
      </SelectTrigger>
      <SelectContent data-cy="modal-add-priority-dropdown">
        {options.map((option) => (
          <SelectItem value={option.value} key={option.value}>
            <div className="flex justify-between items-center">
              <PriorityDot priority={option.value} />
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
