import React, { useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaImage,
  FaSmile,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaGlobe,
  FaEllipsisH,
  FaHeart,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import pic from "../../assets/Screenshot 2025-11-24 183204.png";

export default function Home() {
  const stories = [
    { id: 0, name: "Create Story", isCreate: true },
    { id: 1, name: "John Doe", initial: "J" },
    { id: 2, name: "Jane Smith", initial: "S" },
    { id: 3, name: "Mike Johnson", initial: "M" },
    { id: 4, name: "Sarah Williams", initial: "W" },
    { id: 5, name: "Alex Brown", initial: "A" },
    { id: 6, name: "Alex Brown", initial: "b" },
    { id: 7, name: "Alex Brown", initial: "8" },
  ];

  const posts = [
    {
      id: 1,
      user: "John Doe",
      initial: "J",
      content:
        "Just finished building my first React app! 🚀 So excited to share it with everyone. The journey of learning has been incredible!",
      time: "2 hours ago",
      likes: 156,
      comments: 32,
      shares: 8,
      hasImage: true,
    },
    {
      id: 2,
      user: "Jane Smith",
      initial: "S",
      content:
        "Beautiful sunset at the beach today! 🌅 Sometimes you just need to stop and appreciate the little things in life.",
      time: "4 hours ago",
      likes: 243,
      comments: 45,
      shares: 12,
      hasImage: true,
    },
    {
      id: 3,
      user: "Mike Johnson",
      initial: "M",
      content:
        "Anyone else excited about the new JavaScript features coming out? The developer experience keeps getting better! 💻",
      time: "6 hours ago",
      likes: 89,
      comments: 28,
      shares: 5,
      hasImage: false,
    },
    {
      id: 4,
      user: "Sarah Williams",
      initial: "W",
      content:
        "Just adopted this cute puppy! 🐕 Say hello to Max! He's already stolen my heart.",
      time: "8 hours ago",
      likes: 412,
      comments: 67,
      shares: 23,
      hasImage: true,
    },
  ];

  const storiesRef = useRef(null);

  const scrollStories = (direction) => {
    if (storiesRef.current) {
      const scrollAmount = 300;
      storiesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-20 md:pb-4 space-y-4">
      {/* Stories Section */}
      <div className="bg-white rounded-xl shadow p-3 sm:p-4 relative group/stories">
        {/* Left Arrow */}
        <button
          onClick={() => scrollStories("left")}
          className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:scale-105 transition-transform opacity-0 group-hover/stories:opacity-100 border border-gray-200"
        >
          <FaChevronLeft className="text-gray-600 text-lg" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scrollStories("right")}
          className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center hover:scale-105 transition-transform opacity-0 group-hover/stories:opacity-100 border border-gray-200"
        >
          <FaChevronRight className="text-gray-600 text-lg" />
        </button>

        <div
          ref={storiesRef}
          className="flex gap-2 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-1"
        >
          {stories.map((story) => (
            <div
              key={story.id}
              className="shrink-0 w-[110px] sm:w-[125px]  relative h-[190px] sm:h-[210px] rounded-xl overflow-hidden relative cursor-pointer group snap-start"
            >
              {story.isCreate ? (
                <div className="w-full h-full bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-1  overflow-hidden">
                    <img
                      src={pic}
                      alt="pic"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute  bottom-9 left-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                      <FaPlus className="text-white text-sm" />
                    </div>
                  </div>
                  <div className="h-12 sm:h-14 flex items-end justify-center pb-2 bg-white ">
                    <span className="text-xs sm:text-sm font-semibold text-gray-900">
                      Create story
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full rounded-xl relative overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                  {/* Story Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400"></div>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
                  {/* User Avatar */}
                  <div className="absolute top-3 left-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-600 border-[3px] border-blue-500 flex items-center justify-center ring-2 ring-white/50">
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {story.initial}
                    </span>
                  </div>
                  {/* User Name */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3">
                    <span className="text-white text-xs sm:text-sm font-medium drop-shadow-lg line-clamp-2">
                      {story.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create Post Card */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex items-center gap-3">
          <Link to="/profile">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold">U</span>
            </div>
          </Link>
          <button className="flex-1 text-left px-4 py-2.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
            What's on your mind?
          </button>
        </div>
        <hr className="my-3 border-gray-200" />
        <div className="flex justify-between">
          <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaVideo className="text-red-500 text-lg" />
            <span className="hidden xs:inline text-gray-600 font-medium text-xs sm:text-sm">
              Live
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaImage className="text-green-500 text-lg" />
            <span className="hidden xs:inline text-gray-600 font-medium text-xs sm:text-sm">
              Photo
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaSmile className="text-yellow-500 text-lg" />
            <span className="hidden xs:inline text-gray-600 font-medium text-xs sm:text-sm">
              Feeling
            </span>
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-xl shadow">
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {post.initial}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 hover:underline cursor-pointer">
                    {post.user}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span>{post.time}</span>
                    <span>·</span>
                    <FaGlobe className="text-xs" />
                  </div>
                </div>
              </div>
              <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors">
                <FaEllipsisH className="text-gray-500" />
              </button>
            </div>
            {/* Post Content */}
            <p className="mt-3 text-gray-800 text-[15px]">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.hasImage && (
            <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200 cursor-pointer hover:opacity-95 transition-opacity"></div>
          )}

          {/* Post Stats */}
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-1">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <FaThumbsUp className="text-white text-[10px]" />
                </div>
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <FaHeart className="text-white text-[10px]" />
                </div>
              </div>
              <span className="text-gray-500 text-sm ml-1">{post.likes}</span>
            </div>
            <div className="flex gap-3 text-gray-500 text-sm">
              <span className="hover:underline cursor-pointer">
                {post.comments} comments
              </span>
              <span className="hover:underline cursor-pointer">
                {post.shares} shares
              </span>
            </div>
          </div>

          {/* Divider */}
          <hr className="mx-4 border-gray-200" />

          {/* Post Actions */}
          <div className="px-4 py-1 flex">
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <FaThumbsUp className="text-gray-500 text-lg" />
              <span className="hidden sm:inline text-gray-600 font-semibold">
                Like
              </span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <FaComment className="text-gray-500 text-lg" />
              <span className="hidden sm:inline text-gray-600 font-semibold">
                Comment
              </span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <FaShare className="text-gray-500 text-lg" />
              <span className="text-gray-600 font-semibold">Share</span>
            </button>
          </div>
        </div>
      ))}

      {/* Loading More */}
      <div className="flex justify-center py-4">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
