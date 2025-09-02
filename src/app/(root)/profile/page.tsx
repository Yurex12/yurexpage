"use client";

import BackButton from "@/components/BackButton";
import Posts from "@/components/Posts";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import React, { useState } from "react";

const tabs = ["Posts", "Images"];

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="scrollbar-hide mx-auto flex h-full flex-col overflow-y-auto md:space-y-2 md:px-4">
      {/* Header */}
      <div className="sticky top-0 flex w-full items-center gap-x-2 border border-gray-200 bg-white px-2 md:mt-4 md:rounded-md md:py-4">
        <BackButton />
        <span className="text-base font-semibold text-gray-900">
          Alex&apos;s profile
        </span>
      </div>

      {/* Cover Photo */}
      <div className="h-30 w-full rounded-md md:h-60">
        <img src="/c.jpg" className="size-full md:rounded-md" />
      </div>

      {/* profile */}
      <div className="px-2 md:px-4">
        {/* top - photo & edit */}
        <div className="flex justify-between">
          <div className="flex flex-col md:flex-row">
            <img
              src="/b.jpg"
              alt=""
              className="-mt-8 flex size-20 items-center justify-center rounded-full md:-mt-20 md:size-40"
            />
            <div className="px-2">
              <h3 className="text-lg font-bold text-gray-900 md:text-2xl lg:text-3xl">
                Alex Johnson
              </h3>
              <span className="text-xs text-gray-500 md:text-base">
                @alexjohnson
              </span>
            </div>
          </div>

          <div>
            <button className="mt-2 rounded-full border border-gray-200 px-4 py-1 text-sm font-semibold text-gray-900 hover:bg-gray-50">
              Edit profile
            </button>
          </div>
        </div>
      </div>

      {/* stats */}
      <div className="mt-2 grid gap-y-4 md:grid-cols-2 md:gap-x-10 md:py-4">
        {/* Item 1 */}
        <div>
          <div className="space-y-4 rounded-md border-gray-200 px-4 py-1 md:sticky md:top-20 md:border md:bg-white md:py-4">
            <p className="leading-relaxed text-gray-800">
              Full-stack developer 💻 | Coffee enthusiast ☕ | Building the
              future one line of code at a time 🚀
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
        </div>
        {/* Item 2 */}
        <div className="space-y-4">
          {/* Tab */}
          <div className="sticky top-8 flex max-w-140 gap-x-2 rounded-md bg-white px-2 py-2 md:top-4">
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
          </div>
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
