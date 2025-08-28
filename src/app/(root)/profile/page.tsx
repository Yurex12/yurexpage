"use client";

import React, { useState } from "react";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import Posts from "@/components/Posts";
import Post from "@/components/Post";

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
  ];

  return (
    <div className="mx-auto min-h-screen max-w-3xl">
      <div className="mx-auto border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-gray-800 px-4 py-3 text-black backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <ArrowLeft className="h-5 h-8 w-5 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-900" />
            <div>
              <h1 className="text-xl font-bold">Alex Johnson</h1>
              <p className="text-sm text-gray-500">1,247 posts</p>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600"></div>

        {/* Profile Section */}
        <div className="px-4 pb-4">
          {/* Profile Picture and Actions */}
          <div className="-mt-16 mb-3 flex items-start justify-between">
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-gray-200 bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold">
              AJ
            </div>
            <div className="mt-16">
              <button className="rounded-full border border-gray-600 px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-gray-900">
                Edit profile
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="space-y-3 text-black">
            <div>
              <h2 className="text-xl font-bold">Alex Johnson</h2>
              <p className="text-gray-500">@alexjohnson</p>
            </div>

            <p className="text-gray-100">
              Full-stack developer 💻 | Coffee enthusiast ☕ | Building the
              future one line of code at a time 🚀
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Joined March 2019</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800">
          <div className="flex">
            <button
              onClick={() => setActiveTab("posts")}
              className={`relative flex-1 py-4 text-center text-sm font-semibold transition-colors hover:bg-gray-950 ${
                activeTab === "posts" ? "text-white" : "text-gray-500"
              }`}
            >
              Posts
              {activeTab === "posts" && (
                <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("images")}
              className={`relative flex-1 py-4 text-center text-sm font-semibold transition-colors hover:bg-gray-950 ${
                activeTab === "images" ? "text-white" : "text-gray-500"
              }`}
            >
              Images
              {activeTab === "images" && (
                <div className="absolute bottom-0 left-1/2 h-1 w-14 -translate-x-1/2 transform rounded-full bg-blue-500"></div>
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "posts" ? (
          <div className="space-y-2 sm:space-y-4">
            {[1, 2, 3, 4].map((num) => (
              <Post key={num} />
            ))}
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square cursor-pointer rounded bg-gradient-to-br from-blue-500 via-purple-600 to-yellow-500 transition-transform hover:scale-105"
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
