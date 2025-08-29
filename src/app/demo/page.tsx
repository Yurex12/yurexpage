"use client";

import React, { useState } from "react";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

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
    <div className="flex h-screen flex-col bg-white text-gray-900">
      <div className="mx-auto flex max-w-6xl flex-1 flex-col">
        {/* Header */}
        <div className="z-50 flex-shrink-0 border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center space-x-8">
            <ArrowLeft className="h-5 h-8 w-5 w-8 cursor-pointer rounded-full p-1 hover:bg-gray-100" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Alex Johnson</h1>
              <p className="text-sm text-gray-600">1,247 posts</p>
            </div>
          </div>
        </div>

        {/* Cover Photo */}
        <div className="relative h-64 flex-shrink-0 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="absolute inset-0 bg-white/10"></div>
        </div>

        {/* Profile Section - Two Column Layout */}
        <div className="flex-1 overflow-hidden px-6 pb-6">
          <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Profile Info */}
            <div className="flex-shrink-0 lg:col-span-1">
              {/* Profile Picture */}
              <div className="-mt-20 mb-6 flex items-start justify-between">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 text-4xl font-bold shadow-2xl">
                  AJ
                </div>
                <div className="mt-20">
                  <button className="rounded-full border border-gray-300 px-6 py-2 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50">
                    Edit profile
                  </button>
                </div>
              </div>

              {/* Profile Info */}
              <div className="space-y-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Alex Johnson
                  </h2>
                  <p className="text-lg text-gray-600">@alexjohnson</p>
                </div>

                <p className="leading-relaxed text-gray-800">
                  Full-stack developer 💻 | Coffee enthusiast ☕ | Building the
                  future one line of code at a time 🚀
                </p>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined March 2019</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="border-t border-gray-300 pt-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <div className="text-xl font-bold text-blue-600">
                        1.2K
                      </div>
                      <div className="text-xs text-gray-500">Posts</div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <div className="text-xl font-bold text-purple-600">
                        4.8K
                      </div>
                      <div className="text-xs text-gray-500">Likes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="flex min-h-0 flex-col lg:col-span-2">
              {/* Tabs */}
              <div className="mb-6 flex-shrink-0 border-b border-gray-200">
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

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-2">
                {activeTab === "posts" ? (
                  <div className="space-y-1">
                    {samplePosts.map((post) => (
                      <div
                        key={post.id}
                        className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50"
                      >
                        <div className="mb-3 flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                            AJ
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="font-semibold text-gray-900">
                              Alex Johnson
                            </span>
                            <span className="text-gray-500">@alexjohnson</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-500">{post.time}</span>
                          </div>
                        </div>

                        <p className="mb-4 text-lg leading-relaxed text-gray-800">
                          {post.content}
                        </p>

                        <div className="flex max-w-lg justify-between text-sm text-gray-500">
                          <button className="group flex items-center space-x-2 transition-colors hover:text-blue-600">
                            <div className="rounded-full p-2 group-hover:bg-blue-50">
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z" />
                              </svg>
                            </div>
                            <span>{post.replies}</span>
                          </button>

                          <button className="group flex items-center space-x-2 transition-colors hover:text-green-600">
                            <div className="rounded-full p-2 group-hover:bg-green-50">
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.791-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.791 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46L18.5 16V8c0-1.1-.896-2-2z" />
                              </svg>
                            </div>
                            <span>{post.retweets}</span>
                          </button>

                          <button className="group flex items-center space-x-2 transition-colors hover:text-red-600">
                            <div className="rounded-full p-2 group-hover:bg-red-50">
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z" />
                              </svg>
                            </div>
                            <span>{post.likes}</span>
                          </button>

                          <button className="group flex items-center space-x-2 transition-colors hover:text-blue-600">
                            <div className="rounded-full p-2 group-hover:bg-blue-50">
                              <svg
                                className="h-5 w-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.29 3.3-1.42-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                      {Array.from({ length: 16 }, (_, i) => (
                        <div
                          key={i}
                          className="aspect-square cursor-pointer rounded-xl border border-gray-200 bg-gradient-to-br from-blue-500 via-purple-600 to-yellow-500 shadow-lg transition-transform hover:scale-105"
                        ></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
