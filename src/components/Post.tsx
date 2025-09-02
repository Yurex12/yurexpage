"use client";

import EngagementActions from "./EngagementActions";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import TextExpander from "./TextExpander";

const images: { src: string }[] = [{ src: "/d.jpg" }, { src: "/c.jpg" }];

export default function Post() {
  return (
    <div className="max-w-140 space-y-2 rounded-lg bg-white pt-4 pb-2 sm:space-y-3 sm:not-first:shadow">
      <PostHeader />
      <TextExpander
        className="px-4"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas repellendus necessitatibus, reprehenderit inventore sit autem aliquid rerum cumque dolor quisquam, architecto assumenda amet fugit aut similique quas beatae natus."
      />
      <PostImage images={images} />
      <EngagementStats />
      <div className="hidden rounded-lg border border-gray-300 sm:block"></div>
      <EngagementActions />
    </div>
  );
}
