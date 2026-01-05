import React from "react";
import { Link } from "react-router-dom";
import {
  FaCamera,
  FaUserPlus,
  FaFacebookMessenger,
  FaEllipsisH,
  FaBriefcase,
  FaGraduationCap,
  FaHome,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
  FaThumbsUp,
  FaComment,
  FaShare,
  FaGlobe,
  FaUserFriends,
  FaImage,
  FaVideo,
  FaSmile,
} from "react-icons/fa";
import pic from "../../assets/Screenshot 2025-11-24 183204.png";
import banner from "../../assets/482210481_2612874728912958_7405680030859141367_n.jpg";

export default function Profile() {
  const photos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const friends = [
    { name: "John Doe", mutual: 12 },
    { name: "Jane Smith", mutual: 8 },
    { name: "Mike Johnson", mutual: 15 },
    { name: "Sarah Williams", mutual: 5 },
    { name: "Alex Brown", mutual: 20 },
    { name: "Emily Davis", mutual: 3 },
    { name: "Chris Wilson", mutual: 10 },
    { name: "Lisa Anderson", mutual: 7 },
    { name: "David Lee", mutual: 18 },
  ];

  const posts = [
    {
      id: 1,
      content:
        "Just had an amazing day at the beach! 🏖️ The sunset was absolutely breathtaking.",
      likes: 124,
      comments: 23,
      shares: 5,
      time: "2 hours ago",
    },
    {
      id: 2,
      content:
        "Excited to announce that I've joined a new company! New beginnings, new challenges. 🚀",
      likes: 256,
      comments: 45,
      shares: 12,
      time: "1 day ago",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20 md:pb-4 overflow-x-hidden">
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-36 xs:h-90 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-b-lg">
          {" "}
          <img
            src={banner}
            alt="Cover"
            className="w-full h-full object-cover bg-contain rounded-b-lg"
          />
        </div>

        <button className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-100 transition-colors shadow-md">
          <FaCamera className="text-gray-700" />
          <span className="hidden sm:inline">Edit cover photo</span>
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-4 pt-4 bg-white shadow-sm">
        {/* Profile Picture */}
        <div className="flex flex-col lg:flex-row lg:items-end">
          <div className="relative -mt-12 xs:-mt-16 lg:-mt-20 mx-auto lg:mx-0">
            <div className="w-24 h-24 xs:w-32 xs:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <img
                src={pic}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">
              <FaCamera className="text-gray-700" />
            </button>
          </div>

          {/* Name and Info */}
          <div className="mt-3 xs:mt-4 lg:mt-0 lg:ml-4 lg:pb-4 flex-1 text-center lg:text-left">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">
              Saher Mohamed
            </h1>
            <p className="text-gray-500 font-medium text-sm xs:text-base">
              1.2K friends
            </p>
            {/* Friend Avatars */}
            <div className="flex -space-x-2 mt-2 justify-center lg:justify-start">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-[10px] xs:text-xs font-semibold">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 xs:mt-4 lg:mt-0 lg:pb-4 justify-center px-2">
            <button className="px-3 xs:px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1 xs:gap-2 font-semibold hover:bg-blue-700 transition-colors text-sm xs:text-base">
              <FaUserPlus className="text-sm xs:text-base" />
              <span className="hidden xs:inline">Add Friend</span>
            </button>
            <button className="px-3 xs:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-1 xs:gap-2 font-semibold hover:bg-gray-300 transition-colors text-sm xs:text-base">
              <FaFacebookMessenger className="text-sm xs:text-base" />
              <span className="hidden xs:inline">Message</span>
            </button>
            <button className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              <FaEllipsisH className="text-sm xs:text-base" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-0 xs:gap-1 -mb-4 scrollbar-hide -mx-4 px-4">
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-blue-600 font-semibold border-b-4 border-blue-600 whitespace-nowrap text-sm xs:text-base">
            Posts
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            About
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Friends
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Photos
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Videos
          </button>
          <button className="hidden sm:block px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Check-ins
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            More
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4 px-2 sm:px-0">
        {/* Left Column - Intro, Photos, Friends */}
        <div className="lg:w-2/5 space-y-4">
          {/* Intro Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <FaBriefcase className="text-gray-500" />
                <span>
                  Works at{" "}
                  <span className="font-semibold text-gray-900">
                    Tech Company
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaGraduationCap className="text-gray-500" />
                <span>
                  Studied at{" "}
                  <span className="font-semibold text-gray-900">
                    University Name
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaHome className="text-gray-500" />
                <span>
                  Lives in{" "}
                  <span className="font-semibold text-gray-900">
                    New York, USA
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>
                  From{" "}
                  <span className="font-semibold text-gray-900">
                    Los Angeles, California
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaHeart className="text-gray-500" />
                <span>Single</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaClock className="text-gray-500" />
                <span>Joined January 2020</span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Edit Details
            </button>
          </div>

          {/* Photos Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Photos</h2>
              <Link to="#" className="text-blue-600 hover:underline">
                See All Photos
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={`aspect-square bg-gradient-to-br from-gray-200 to-gray-300 ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === 2 ? "rounded-tr-lg" : ""} ${
                    index === 6 ? "rounded-bl-lg" : ""
                  } ${
                    index === 8 ? "rounded-br-lg" : ""
                  } hover:opacity-90 cursor-pointer transition-opacity`}
                ></div>
              ))}
            </div>
          </div>

          {/* Friends Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Friends</h2>
                <p className="text-gray-500 text-sm">1,234 friends</p>
              </div>
              <Link to="#" className="text-blue-600 hover:underline">
                See All Friends
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {friends.map((friend, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-1">
                    <span className="text-white text-2xl font-bold">
                      {friend.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {friend.mutual} mutual
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Posts */}
        <div className="lg:w-3/5 space-y-4">
          {/* Create Post Card */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-white font-semibold">U</span>
              </div>
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

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow">
              {/* Post Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-semibold">U</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">User Name</p>
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
                <p className="mt-3 text-gray-800">{post.content}</p>
              </div>

              {/* Post Image */}
              <div className="w-full h-64 sm:h-80 bg-gradient-to-br from-gray-200 to-gray-300"></div>

              {/* Post Stats */}
              <div className="px-4 py-2 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center gap-1">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaThumbsUp className="text-white text-[10px]" />
                    </div>
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <FaHeart className="text-white text-[10px]" />
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm ml-1">
                    {post.likes}
                  </span>
                </div>
                <div className="flex gap-3 text-gray-500 text-sm">
                  <span>{post.comments} comments</span>
                  <span>{post.shares} shares</span>
                </div>
              </div>

              {/* Post Actions */}
              <div className="px-4 py-1 flex">
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaThumbsUp className="text-gray-500" />
                  <span className="hidden xs:inline text-gray-600 font-medium text-sm sm:text-base">
                    Like
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaComment className="text-gray-500" />
                  <span className="hidden xs:inline text-gray-600 font-medium text-sm sm:text-base">
                    Comment
                  </span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FaShare className="text-gray-500" />
                  <span className="hidden xs:inline text-gray-600 font-medium text-sm sm:text-base">
                    Share
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
