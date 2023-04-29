import PriorityDot from "@/components/priorityDot";
import { Priority } from "@/types";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Fragment } from "react";

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

interface PrioritySelectProps {
  value: Priority;
  onChange: (value: Priority) => void;
}

export default function PrioritySelector({
  value,
  onChange,
}: PrioritySelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <span className="block truncate">
            <div className="flex items-center justify-start">
              <PriorityDot priority={value} />
              <span>
                {options.find((option) => option.value === value)?.label}
              </span>
            </div>
          </span>
          <span
            className="absolute inset-y-0 right-0 flex items-center pr-2"
            data-cy="modal-add-priority-dropdown"
          >
            <ChevronsUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.value}
                value={option.value}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
              >
                <div className="flex items-center justify-start">
                  <PriorityDot priority={option.value} />
                  <span>{option.label}</span>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
