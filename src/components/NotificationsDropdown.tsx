import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-0 outline-0" asChild>
        <button className="rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100">
          <Ellipsis className="h-5 w-5 text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-0" side="bottom" align="end">
        <DropdownMenuItem className="cursor-pointer">
          Mark all as read
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
