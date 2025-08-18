'use client';

import { useState } from 'react';
import { Camera, Calendar, FileText, Image } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts');

  const posts = [
    {
      id: 1,
      content:
        'Just finished an amazing project! Feeling grateful for the opportunity to work with such a talented team. 🚀',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      content:
        'Beautiful sunset today! Sometimes you need to take a moment to appreciate the simple things in life. 🌅',
      timestamp: '1 day ago',
      likes: 156,
      comments: 23,
    },
    {
      id: 3,
      content:
        "Excited to announce that I'll be speaking at the upcoming tech conference! Can't wait to share insights about modern web development.",
      timestamp: '3 days ago',
      likes: 89,
      comments: 12,
    },
  ];

  const images = [
    { id: 1, src: 'https://picsum.photos/300/300?random=1', alt: 'Photo 1' },
    { id: 2, src: 'https://picsum.photos/300/300?random=2', alt: 'Photo 2' },
    { id: 3, src: 'https://picsum.photos/300/300?random=3', alt: 'Photo 3' },
    { id: 4, src: 'https://picsum.photos/300/300?random=4', alt: 'Photo 4' },
    { id: 5, src: 'https://picsum.photos/300/300?random=5', alt: 'Photo 5' },
    { id: 6, src: 'https://picsum.photos/300/300?random=6', alt: 'Photo 6' },
  ];

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Header */}

      {/* Profile Container */}
      <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden mt-4'>
        {/* Cover Photo */}
        <div className='relative h-48 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500'>
          <div className='absolute inset-0 bg-black bg-opacity-20'></div>
          <button className='absolute bottom-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200'>
            <Camera className='w-4 h-4' />
            <span className='text-sm font-medium'>Edit cover photo</span>
          </button>
        </div>

        {/* Profile Header */}
        <div className='relative px-6 pb-4'>
          {/* Profile Picture */}
          <div className='absolute -top-16 left-6'>
            <div className='relative'>
              <div className='w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-white flex items-center justify-center text-2xl font-bold text-white shadow-lg'>
                JD
              </div>
              <button className='absolute bottom-2 right-2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 transition-colors duration-200'>
                <Camera className='w-4 h-4 text-gray-600' />
              </button>
            </div>
          </div>

          {/* Profile Info */}
          <div className='pt-20 pb-4'>
            <div className='flex flex-col md:flex-row md:items-end md:justify-between'>
              <div className='flex-1'>
                <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                  John Doe
                </h1>
                <p className='text-gray-600 mb-4'>
                  Software Engineer & Designer
                </p>
              </div>

              <div className='flex space-x-3 mt-4 md:mt-0'>
                <button className='px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors duration-200'>
                  Edit profile
                </button>
              </div>
            </div>

            {/* Bio Section */}
            <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center space-x-3 mb-4'>
                <Calendar className='w-5 h-5 text-gray-500' />
                <span>Joined January 2020</span>
              </div>
              <p className='text-gray-700'>
                Passionate software engineer with a love for creating beautiful
                and functional web applications. When I&apos;m not coding, you
                can find me exploring new coffee shops or hiking in the
                mountains.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className='border-t border-gray-200'>
          <nav className='flex space-x-8 px-6'>
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'posts'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className='flex items-center space-x-2'>
                <FileText className='w-4 h-4' />
                <span>Posts</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('images')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === 'images'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className='flex items-center space-x-2'>
                <Image className='w-4 h-4' />
                <span>Photos</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className='p-6'>
          {activeTab === 'posts' && (
            <div className='space-y-6'>
              {/* Create Post */}
              <div className='bg-white border border-gray-200 rounded-lg p-4'>
                <div className='flex items-center space-x-3 mb-4'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold'>
                    JD
                  </div>
                  <input
                    type='text'
                    placeholder="What's on your mind, John?"
                    className='flex-1 bg-gray-100 rounded-full px-4 py-2 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
              </div>

              {/* Posts */}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className='bg-white border border-gray-200 rounded-lg p-6'
                >
                  <div className='flex items-center space-x-3 mb-4'>
                    <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold'>
                      JD
                    </div>
                    <div>
                      <h3 className='font-medium text-gray-900'>John Doe</h3>
                      <p className='text-sm text-gray-500'>{post.timestamp}</p>
                    </div>
                  </div>
                  <p className='text-gray-800 mb-4'>{post.content}</p>
                  <div className='flex items-center space-x-6 text-gray-500 text-sm'>
                    <button className='hover:text-blue-600 transition-colors duration-200'>
                      👍 {post.likes}
                    </button>
                    <button className='hover:text-blue-600 transition-colors duration-200'>
                      💬 {post.comments}
                    </button>
                    <button className='hover:text-blue-600 transition-colors duration-200'>
                      🔗 Share
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'images' && (
            <div>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-xl font-semibold text-gray-900'>Photos</h2>
                <button className='text-blue-600 hover:text-blue-700 font-medium'>
                  See all photos
                </button>
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {images.map((image) => (
                  <div
                    key={image.id}
                    className='aspect-square bg-gray-200 rounded-lg overflow-hidden hover:opacity-90 transition-opacity duration-200 cursor-pointer'
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className='w-full h-full object-cover'
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
