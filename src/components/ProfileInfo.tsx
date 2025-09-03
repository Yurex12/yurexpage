import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

type TProfileInfo = {
  containerClassName?: string;
  bio: string;
  dateJoined: string;
  totalPosts: number;
  totalPostsLikes: number;
};

export default function ProfileInfo({
  containerClassName,
  bio,
  dateJoined,
  totalPosts,
  totalPostsLikes,
}: TProfileInfo) {
  return (
    <div className={cn("space-y-4 rounded-md px-4 py-1", containerClassName)}>
      <p className="leading-relaxed text-gray-800">{bio}</p>

      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4" />
        <span>Joined {dateJoined}</span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="rounded-lg border border-gray-200 px-3 py-1">
          <div className="text-lg font-bold text-blue-600">{totalPosts}K</div>
          <div className="text-xs text-gray-500">Posts</div>
        </div>
        <div className="rounded-lg border border-gray-200 px-3 py-1">
          <h2 className="text-lg font-bold text-purple-600">
            {totalPostsLikes}K
          </h2>
          <span className="text-xs text-gray-500">Likes</span>
        </div>
      </div>
    </div>
  );
}
