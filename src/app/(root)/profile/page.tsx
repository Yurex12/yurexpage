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
    <div className="flex h-full flex-col space-y-2 px-10 pt-4">
      {/* Header */}

      <div className="flex items-center space-x-6 rounded-md border border-gray-200 bg-white px-4 py-4">
        <MoveLeft className="size-10 cursor-pointer rounded-full p-1 hover:bg-gray-100" />
        <div>
          <h1 className="text-xl font-bold text-gray-800">Alex Johnson</h1>
          <p className="text-sm text-gray-600">1,247 posts</p>
        </div>
      </div>

      {/* Cover Photo */}
      <img src="/c.jpg" className="h-60 w-full rounded-md" />
      {/* <div className="flex h-70 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-200">
        <Image className="size-10" />
      </div> */}

      {/* Left Column - Profile Info */}

      <div className="flex gap-x-5 px-6">
        <div className="flex space-x-4">
          {/* <div className="-mt-25 flex size-45 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-4xl font-bold shadow-2xl">
            AJ
          </div> */}

          <img
            src="/yusuf.jpg"
            alt=""
            className="-mt-25 flex size-45 items-center justify-center rounded-full border-2 border-white"
          />

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Alex Johnson</h2>
            <p className="text-lg text-gray-600">@alexjohnson</p>
          </div>
        </div>

        <div>
          <button className="mt-1 flex items-center gap-x-2 rounded-md border border-gray-800 px-4 py-1 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
            <span>Edit profile</span>
            <Edit2 className="text-gray-800" size={15} />
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full flex-1 gap-x-20 border-t border-gray-200 px-10 pt-4">
        {/* Profile Info */}

        <div className="h-60 basis-2/5 space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <p className="leading-relaxed text-gray-800">
            Full-stack developer 💻 | Coffee enthusiast ☕ | Building the future
            one line of code at a time 🚀
          </p>

          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Joined March 2019</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="border-t border-gray-300 pt-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="text-xl font-bold text-blue-600">1.2K</div>
                <div className="text-xs text-gray-500">Posts</div>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <div className="text-xl font-bold text-purple-600">4.8K</div>
                <div className="text-xs text-gray-500">Likes</div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          {/* Tabs */}
          <div className="-mt-19 mb-6 flex-shrink-0 border-b border-gray-200">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("posts")}
                className={`relative px-2 py-4 text-lg font-semibold transition-colors hover:text-gray-900 ${
                  activeTab === "posts" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Posts
                {activeTab === "posts" && (
                  <div className="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-blue-500"></div>
                )}
              </button>
              <button
                onClick={() => setActiveTab("images")}
                className={`relative px-2 py-4 text-lg font-semibold transition-colors hover:text-gray-900 ${
                  activeTab === "images" ? "text-gray-900" : "text-gray-500"
                }`}
              >
                Images
                {activeTab === "images" && (
                  <div className="absolute right-0 bottom-0 left-0 h-1 rounded-full bg-blue-500"></div>
                )}
              </button>
            </div>
          </div>
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
