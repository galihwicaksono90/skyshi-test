import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { parseDate } from "@/lib/utils";
import Link from "next/link";

interface ActivityCardProps {
  title: string;
  date: string;
  onDelete: (id: number) => void;
  id: number;
}

export default function ActivityCard({
  title,
  date,
  id,
  onDelete,
}: ActivityCardProps) {
  return (
    <Link href={`/activity/${id}`} passHref>
      <Card
        className="p-8 h-[234px] flex flex-col justify-between shadow-sm hover:shadow-md"
        data-cy="activity-item"
      >
        <h4 className="font-bold text-lg" data-cy="activity-item-title">
          {title}
        </h4>
        <div className="flex justify-between w-full mt-auto items-center text-muted-foreground">
          <p data-cy="activity-item-date">{parseDate(date)}</p>
          <Button
            data-cy="activity-item-delete-button"
            variant="ghost"
            className="w-10 rounded-full p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(id);
            }}
          >
            <Trash2 />{" "}
          </Button>
        </div>
      </Card>
    </Link>
  );
}
