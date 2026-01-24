import { useRef } from "react";

import { FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Card from "../UI/Card/Card";
import LoadingCard from "../UI/LoadingCard/LoadingCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useLogData from "../../Hooks/LogDataHook/LogDataHook";
import PostContainer from "../UI/postContainer/postContainer";
import { Helmet } from "react-helmet";

export default function Home() {
  const pic = useLogData();

  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=10", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["getAllPosts"],
    queryFn: getAllPosts,
    staleTime: 5000000,
    retry: 2,
    retryDelay: 3000,
    refetchInterval: 5000000,
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,
    gcTime: 500000,
    select: (data) => data?.data.posts.reverse(),
  });

  console.log(data);

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
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {isError ? (
        <div className="max-w-3xl mx-auto pb-20 md:pb-4 p-4 ">
          <div
            className="flex  justify-center align-center border-[#c69bea] opacity-80 rounded-2xl  border-2 bg-[#1b5ce4]  items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
            role="alert"
          >
            <svg
              className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0 text-[#f3f4f6]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-[#f3f4f6]">
              <span className="font-medium me-1  text-[#f3f4f6]">
                Network error!
              </span>{" "}
              Network error. Please try again.
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto pb-20 md:pb-4 space-y-4 ">
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
                          src={pic?.data?.data.user.photo}
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
          <PostContainer />

          {/* Posts Feed */}

          {data?.map(
            (post) =>
              post && (
                <div className="pt-2 w-full" key={post._id}>
                  <Card post={post} postLink={`/post/${post._id}`} />
                </div>
              ),
          )}

          {/* Loading More */}
          {isLoading && <LoadingCard />}
        </div>
      )}
    </>
  );
}
