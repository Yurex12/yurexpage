import { PostProvider } from "@/contexts/PostContext";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";

import { PostWithRelations } from "@/types/types";
import PostImage from "./PostImage";
import PostInteraction from "./PostInteraction";
import TextExpander from "./TextExpander";

export default function Post({ post }: { post: PostWithRelations }) {
  return (
    <PostProvider post={post}>
      <div className="max-w-140 space-y-2 rounded-lg bg-white pt-4 pb-2 sm:space-y-3 sm:not-first:shadow">
        <PostHeader />

        <TextExpander className="px-4" />
        <PostImage />
        <EngagementStats />
        <div className="hidden rounded-lg border border-gray-200 sm:block"></div>
        <PostInteraction />
      </div>
    </PostProvider>
  );
}
