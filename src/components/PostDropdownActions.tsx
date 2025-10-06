"use client";
import { Copy, Edit, Ellipsis, Trash } from "lucide-react";

import { usePosts } from "@/contexts/PostsContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { usePost } from "@/contexts/PostContext";

export default function PostDropdownActions() {
  const { id: postId } = usePost();
  const { handleDeletePost } = usePosts();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100">
          <Ellipsis className="h-5 w-5 text-gray-600" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="w-48 rounded-lg border border-gray-100 bg-white p-1 shadow-xl"
      >
        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-md border-0 px-3 py-2 text-sm text-gray-700 outline-0 transition hover:bg-gray-100">
          <Copy className="h-4 w-4 text-gray-500" />
          <span>Copy link</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex cursor-pointer items-center gap-3 rounded-md border-0 px-3 py-2 text-sm text-gray-700 outline-0 transition hover:bg-gray-100">
          <Edit className="h-4 w-4 text-gray-500" />
          <span>Edit post</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex cursor-pointer items-center gap-3 rounded-md border-0 px-3 py-2 text-sm text-red-600 outline-0 transition hover:bg-red-50"
          onClick={() => handleDeletePost(postId)}
        >
          <Trash className="h-4 w-4 text-red-500" />
          <span>Delete post</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
