import { Loader2 } from "lucide-react";
export default function Loading() {
  return (
    <div className="container mx-auto flex justify-center items-center">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
