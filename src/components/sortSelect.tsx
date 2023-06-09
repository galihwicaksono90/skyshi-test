import { todoItemSchema } from "@/schemas";
import {
  ArrowDownUp,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ArrowDownAZ,
  ArrowUpAZ,
} from "lucide-react";
import { Button } from "@/components//ui/button";
import { Trigger } from "@radix-ui/react-select";
import { Select, SelectItem, SelectContent } from "@/components/ui/select";
import { z } from "zod";

export type SortOption = "terbaru" | "terlama" | "az" | "za" | "belumSelesai";
type TodoItem = z.infer<typeof todoItemSchema>;

export const sortOptions = {
  terbaru: {
    label: "Terbaru",
    fn: (todos) => {
      return todos;
    },
    icon: <ArrowDownNarrowWide />,
  },
  terlama: {
    label: "Terlama",
    fn: (todos) => {
      return todos.reverse();
    },
    icon: <ArrowUpNarrowWide />,
  },
  az: {
    label: "A-Z",
    fn: (todos) => {
      return todos.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
      // return todos.sort((a, b) => a.title.localeCompare(b.title));
    },
    icon: <ArrowDownAZ />,
  },
  za: {
    label: "Z-A",

    fn: (todos) => {
      // return todos.sort((a, b) => b.title.localeCompare(a.title));
      return todos.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }
        if (a.title < b.title) {
          return 1;
        }
        return 0;
      });
    },
    icon: <ArrowUpAZ />,
  },
  belumSelesai: {
    label: "Belum Selesai",
    fn: (todos) => {
      const arr: TodoItem[] = [];
      todos.forEach((todo) => {
        if (todo.is_active === 0) {
          arr.push(todo);
          return;
        }
        arr.unshift(todo);
      });
      return arr;
    },
    icon: <ArrowDownUp />,
  },
} satisfies Record<
  SortOption,
  {
    label: string;
    fn: (todos: TodoItem[]) => TodoItem[];
    icon: React.ReactNode;
  }
>;

export function sortTodo(todos: TodoItem[], key: SortOption) {
  return sortOptions[key].fn(todos);
}

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <Select
      onValueChange={(value: SortOption) => onChange(value)}
      value={value}
    >
      <Trigger asChild>
        <Button
          className="rounded-full w-10 p-0"
          variant="outline"
          data-cy="todo-sort-button"
        >
          <ArrowDownUp />
        </Button>
      </Trigger>
      <SelectContent>
        {Object.keys(sortOptions).map((key) => (
          <SelectItem value={key} key={key}>
            <div
              className="flex justify-between items-center w-full"
              data-cy="sort-selection"
            >
              <div className="mr-4" data-cy="sort-selection-icon">
                {sortOptions[key as SortOption].icon}
              </div>
              <div data-cy="sort-selection-title">
                {sortOptions[key as SortOption].label}
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
