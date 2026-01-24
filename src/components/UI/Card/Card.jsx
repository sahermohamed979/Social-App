import { useState } from "react";
import {
  FaThumbsUp,
  FaComment,
  FaShare,
  FaGlobe,
  FaHeart,
} from "react-icons/fa";
import Comment from "../../UI/Comments/Comment/Comment";
import { Link } from "react-router-dom";
import DeletPost from "../../UI/DeletPost/DeletPost";
import UpdatePost from "../UpdatePost/UpdatePost";
import CreatComment from "../../UI/Comments/CreatComment/CreatComment";
import useLogData from "../../../Hooks/LogDataHook/LogDataHook";

export default function Card({
  post,
  showAllComments = false,
  deletcomment = false,
  updatecomment = false,
}) {
  const LogData = useLogData();
  let { _id, body, comments = [], image, createdAt, user } = post;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLike, setIsLike] = useState(false);

  const date = new Date(createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const arry = [20, 50, 30, 60, 40, 10, 80, 90, 70, 100];
  const [randomLikes] = useState(
    () => arry[Math.floor(Math.random() * arry.length)],
  );
  const [randomShares] = useState(
    () => arry[Math.floor(Math.random() * arry.length)],
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
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img
                  src={user.photo}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-900 hover:underline cursor-pointer text-[15px]">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <span>{createdAtFormatted}</span>
                  <span>·</span>
                  <FaGlobe className="text-xs" />
                </div>
              </div>
            </div>
            {user?._id === LogData?.data?.data?.user?._id && (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-8 h-8 flex items-center  cursor-pointer justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                  type="button"
                >
                  <span className="text-xl font-bold leading-none ">···</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg w-fit">
                    <ul className=" text-sm text-gray-700 w-30 cursor-pointer ">
                      <DeletPost id={_id} />
                      <UpdatePost id={_id} image={image} body={body} />
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Post Content */}
          <p className="mt-3 text-gray-800 text-[15px]">{body}</p>
        </div>

        {/* Post Image */}
        {image && (
          <Link
            to={`/post/${_id}`}
            className="block w-full h-full bg-gray-200 cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img
              src={image}
              alt="Post image"
              className="w-full h-full object-cover"
            />
          </Link>
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
            <span className="text-gray-500 text-sm ml-1">{randomLikes}</span>
          </div>
          <div className="flex gap-3 text-gray-500 text-sm">
            <Link
              className="hover:underline cursor-pointer "
              to={`/post/${_id}`}
            >
              {" "}
              {comments.length} comments
            </Link>
            <Link
              className="hover:underline cursor-pointer"
              to={`/post/${_id}`}
            >
              {randomShares} shares
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="mx-4 border-gray-200" />

        {/* Post Actions */}
        <div className="px-4 py-1 flex">
         
          
          <button onClick={() => setIsLike(!isLike)} className="flex-1 cursor-pointer flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">

            <FaThumbsUp className={`text-lg ${isLike ? "text-blue-500" : "text-gray-500"}`} />

            <span className={`hidden sm:inline ${isLike ? "text-blue-500" : "text-gray-500"} font-semibold  `}>
              Like
            </span>
          </button>
          <Link
            to={`/post/${_id}`}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FaComment className="text-gray-500 text-lg" />
            <span className="hidden sm:inline text-gray-600 font-semibold">
              Comment
            </span>
          </Link>
          <button className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
            <FaShare className="text-gray-500 text-lg" />
            <span className="text-gray-600 font-semibold">Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {comments.length > 0 && (
          <div className="border-t border-gray-200 ">
            {showAllComments ? (
              [...comments].reverse().map((comment) => (
                <>
                  <Comment
                    key={comment._id}
                    comment={comment}
                    id={_id}
                    deleteComment={deletcomment}
                    updateComment={updatecomment}
                  />
                </>
              ))
            ) : (
              <>
                <Comment
                  comment={comments[comments.length - 1]}
                  id={_id}
                  deleteComment={deletcomment}
                  updateComment={updatecomment}
                />
              </>
            )}
          </div>
        )}
        <CreatComment id={_id} />
      </div>
    </>
  );
}
