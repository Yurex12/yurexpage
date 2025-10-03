"use client";
import PostDropdownActions from "./PostDropdownActions";

export default function PostHeader() {
  return (
    <div className="flex items-start justify-between px-4">
      <div className="flex items-center space-x-3">
        <img
          src="/c.jpg"
          alt="Profile"
          className="size-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-medium text-gray-800">John Doe</p>
          <p className="text-muted-foreground text-xs">@johndoe</p>
        </div>
      </div>
      <PostDropdownActions />
    </div>
  );
}
