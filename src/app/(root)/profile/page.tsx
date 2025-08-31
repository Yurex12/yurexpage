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
import BackButton from "@/components/BackButton";

const tabs = ["Posts", "Images"];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="scrollbar-hide mx-auto flex h-full flex-col space-y-2 overflow-y-auto px-4">
      {/* Header */}
      <div className="sticky top-0 mt-4 flex w-full items-center gap-x-2 rounded-md border border-gray-200 bg-white px-2 py-4">
        <BackButton />
        {/* <ArrowLeft /> */}
        <span className="text-base font-semibold text-gray-900">
          Alex&apos;s profile
        </span>
      </div>

      {/* Cover Photo */}
      <div className="h-60 w-full rounded-md">
        <img src="/c.jpg" className="size-full rounded-md" />
      </div>

      {/* profile */}
      <div className="px-4">
        {/* top - photo & edit */}
        <div className="flex justify-between">
          <div className="flex">
            <img
              src="/b.jpg"
              alt=""
              className="-mt-20 flex size-40 items-center justify-center rounded-full"
            />
            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900">Alex Johnson</h3>
              <span className="text-xs text-gray-500">@alexjohnson</span>
            </div>
          </div>

          <div>
            <button className="mt-2 rounded-full border border-gray-200 px-4 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50">
              Edit profile
            </button>
          </div>
        </div>
        {/* bottom - username */}
      </div>
      {/*       {/* stats */}
      <div className="mt-2 grid grid-cols-[30%_60%] justify-between">
        <div className="space-y-4 border border-gray-200 px-4 py-2">
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
        </div>

        <div className="border">
          <Posts />
        </div>
      </div>
      {/* Tab */}
      {/* <div className="sticky top-10 mt-6 flex w-auto gap-x-2 bg-gray-50 px-2 py-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`hover:text-accent-foreground h-2 rounded-full py-4 font-semibold hover:bg-blue-200 dark:hover:bg-blue-100 ${activeTab === tab ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div> */}
      {/* Posts */}
      {/* <Posts /> */}
    </div>
  );
};

export default ProfilePage;
