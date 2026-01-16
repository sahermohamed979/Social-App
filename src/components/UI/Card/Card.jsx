import { useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaGlobe,
  FaHeart,
} from "react-icons/fa";
export default function Card({ post }) {
  let { body, comments, image, createdAt, user } = post;

  const date = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const arry = [20, 50, 30, 60, 40, 10, 80, 90, 70, 100];
  const [randomLikes] = useState(
    () => arry[Math.floor(Math.random() * arry.length)]
  );
  const [randomShares] = useState(
    () => arry[Math.floor(Math.random() * arry.length)]
  );
  let createdAtFormatted;
  if (diffInSeconds < 60) {
    createdAtFormatted = "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    createdAtFormatted = `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    createdAtFormatted = `${hours}h`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    createdAtFormatted = `${days}d`;
  } else {
    createdAtFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow">
        {/* Post Header */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <img
                  src={user.photo}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 hover:underline cursor-pointer">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <span>{createdAtFormatted}</span>

                  <FaGlobe className="text-xs" />
                </div>
              </div>
            </div>

            <button className="w-9 h-9 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"></button>
          </div>
          {/* Post Content */}
          <p className="mt-3 text-gray-800 text-[15px]">{body}</p>
        </div>

        {/* Post Image */}

        <div className="w-full h-96 bg-gray-200">
          <img
            src={image}
            alt="Post image"
            className="w-full h-full object-cover"
          />
        </div>
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
            <span className="text-gray-500 text-sm ml-1">{randomLikes}</span>
          </div>
          <div className="flex gap-3 text-gray-500 text-sm">
            <span className="hover:underline cursor-pointer">
              {" "}
              {comments.length} comments
            </span>
            <span className="hover:underline cursor-pointer">
              {randomShares} shares
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
    </>
  );
}
