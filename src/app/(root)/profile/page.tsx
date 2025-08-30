"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Edit,
  Edit2,
  Image,
  MapPin,
  MoveLeft,
} from "lucide-react";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";

interface Post {
  id: number;
  content: string;
  time: string;
  replies: number;
  retweets: number;
  likes: number;
}

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "images">("posts");

  const samplePosts: Post[] = [
    {
      id: 1,
      content:
        "Just shipped a new feature! The feeling when your code works on the first try is unmatched 🎉",
      time: "2h",
      replies: 42,
      retweets: 15,
      likes: 128,
    },
    {
      id: 2,
      content:
        "Coffee + Code = Magic ✨ Starting the day with a fresh brew and some clean architecture thoughts.",
      time: "5h",
      replies: 23,
      retweets: 8,
      likes: 67,
    },
    {
      id: 3,
      content:
        "Pro tip: Always comment your code. Your future self will thank you! 📝 #coding #bestpractices",
      time: "1d",
      replies: 89,
      retweets: 34,
      likes: 245,
    },
    {
      id: 4,
      content:
        "Working on a new React component library. The goal is to make development faster and more enjoyable for everyone. What features would you love to see?",
      time: "2d",
      replies: 156,
      retweets: 67,
      likes: 342,
    },
    {
      id: 5,
      content:
        "Debugging is like being a detective in a crime movie where you are also the murderer. 🕵️‍♂️💻",
      time: "3d",
      replies: 78,
      retweets: 145,
      likes: 523,
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-0 pt-4">
      {/* Header */}
      <div className="flex items-center space-x-6 rounded-md border border-gray-200 bg-white px-4 py-4">
        <MoveLeft className="size-10 cursor-pointer rounded-full p-1 hover:bg-gray-100" />
        <div>
          {/* <h1 className="text-xl font-bold text-gray-800">Alex Johnson</h1> */}
          {/* <p className="text-sm text-gray-600">1,247 posts</p> */}
        </div>
      </div>

      {/* Cover Photo */}
      <img src="/c.jpg" className="h-30 w-full" />

      {/* - Profile Info */}
      <div className="px-2">
        {/* top - photo & edit */}
        <div className="flex justify-between">
          <img
            src="/b.jpg"
            alt=""
            className="-mt-8 flex size-20 items-center justify-center rounded-full"
          />

          <div>
            <button className="mt-2 rounded-full border border-gray-200 px-4 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50">
              Edit profile
            </button>
          </div>
        </div>
        {/* bottom - username */}
        <div className="px-2">
          <h3 className="text-lg font-bold text-gray-900">Alex Johnson</h3>
          <span className="text-xs text-gray-500">@alexjohnson</span>
        </div>
      </div>

      {/* stats */}
      <div className="mt-4 space-y-4 px-4">
        <p className="leading-relaxed text-gray-800">
          Full-stack developer 💻 | Coffee enthusiast ☕ | Building the future
          one line of code at a time 🚀
        </p>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>Joined March 2019</span>
        </div>

        {/* Quick Stats */}
        <div className="mt-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="rounded-lg border border-gray-200 px-3 py-1">
              <div className="text-lg font-bold text-blue-600">1.2K</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="rounded-lg border border-gray-200 px-3 py-1">
              <div className="text-lg font-bold text-purple-600">4.8K</div>
              <div className="text-xs text-gray-500">Likes</div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <Posts />
      </div>
    </div>
  );
};

export default ProfilePage;
