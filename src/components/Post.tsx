"use client";
// import EngagementActions from "./EngagementActions";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";

import PostImage from "./PostImage";
import TextExpander from "./TextExpander";

export default function Post({ post }) {
  return (
    <div className="max-w-140 space-y-2 rounded-lg bg-white pt-4 pb-2 sm:space-y-3 sm:not-first:shadow">
      <PostHeader />
      {Boolean(post.content.length) && (
        <TextExpander className="px-4" text={post.content} />
      )}
      {Boolean(post.images.length) && <PostImage images={post.images} />}
      <EngagementStats />
      <div className="hidden rounded-lg border border-gray-300 sm:block"></div>
      {/* <EngagementActions /> */}
    </div>
  );
}
