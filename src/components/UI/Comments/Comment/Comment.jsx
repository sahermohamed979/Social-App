import { useState } from "react";
import {
  FaThumbsUp,
  FaHeart,
  FaLaugh,
  FaSadTear,
  FaAngry,
} from "react-icons/fa";
import defaultPhoto from "../../../../assets/f_n.jpg";
import DeletComment from "../DeletComment/DeletComment";
import UpdateComment from "../UpdateComment/UpdateComment";
export default function Comment({ comment, deleteComment = false }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return `${Math.floor(diffInSeconds / 604800)}w`;
  };

  const reactions = [
    {
      icon: FaThumbsUp,
      color: "text-blue-500",
      bg: "bg-blue-500",
      name: "like",
    },
    { icon: FaHeart, color: "text-red-500", bg: "bg-red-500", name: "love" },
    {
      icon: FaLaugh,
      color: "text-yellow-500",
      bg: "bg-yellow-500",
      name: "haha",
    },
    {
      icon: FaSadTear,
      color: "text-yellow-500",
      bg: "bg-yellow-500",
      name: "sad",
    },
    {
      icon: FaAngry,
      color: "text-orange-500",
      bg: "bg-orange-500",
      name: "angry",
    },
  ];

  const handleReaction = (reaction) => {
    if (selectedReaction?.name === reaction.name) {
      setSelectedReaction(null);
      setLiked(false);
    } else {
      setSelectedReaction(reaction);
      setLiked(true);
    }
    setShowReactions(false);
  };

  return (
    <div className="flex gap-2 group justify-center px-4 items-center py-2">
      {/* User Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full overflow-hidden ">
          {comment?.commentCreator?.photo &&
          !comment.commentCreator.photo.includes("undefined") ? (
            <img
              src={comment.commentCreator.photo}
              alt={comment.commentCreator.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center  ">
              <img
                src={defaultPhoto}
                alt={comment.commentCreator.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="inline-block max-w-full">
          {/* Comment Bubble */}
          <div className="bg-gray-100 rounded-2xl px-3 py-2 inline-block max-w-full">
            {/* User Name */}
            <span className="font-semibold text-[13px] text-gray-900 hover:underline cursor-pointer block">
              {comment?.commentCreator?.name || "User"}
            </span>
            {/* Comment Text */}
            <p className="text-[15px] text-gray-800 break-words whitespace-pre-wrap">
              {comment?.content || ""}
            </p>
          </div>

          {/* Reaction indicator on bubble */}
          {liked && selectedReaction && (
            <div className="relative inline-block -ml-2 -mt-2">
              <div
                className={`w-5 h-5 ${selectedReaction.bg} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}
              >
                <selectedReaction.icon className="text-white text-[10px]" />
              </div>
            </div>
          )}
        </div>

        {/* Comment Actions */}
        <div className="flex items-center gap-3 mt-1 ml-3 text-xs">
          {/* Time */}
          <span className="text-gray-500">
            {getTimeAgo(comment?.createdAt)}
          </span>

          {/* Like Button with Reactions */}
          <div
            className="relative"
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={() => setShowReactions(false)}
          >
            <button
              onClick={() => handleReaction(reactions[0])}
              className={`font-semibold hover:underline transition-colors ${
                liked && selectedReaction
                  ? selectedReaction.color
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {liked && selectedReaction
                ? selectedReaction.name.charAt(0).toUpperCase() +
                  selectedReaction.name.slice(1)
                : "Like"}
            </button>

            {/* Reactions Popup */}
            {showReactions && (
              <div className="absolute bottom-full left-0 mb-2 bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1 flex gap-1 z-50 animate-in fade-in duration-200">
                {reactions.map((reaction) => (
                  <button
                    key={reaction.name}
                    onClick={() => handleReaction(reaction)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:scale-125 hover:bg-gray-100 transition-transform duration-200"
                    title={reaction.name}
                  >
                    <reaction.icon className={`text-xl ${reaction.color}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reply Button */}
          <button className="font-semibold text-gray-500 hover:text-gray-700 hover:underline">
            Reply
          </button>

          {/* More Options (visible on hover) */}

          {deleteComment && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-8 h-8 flex items-center cursor-pointer justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                type="button"
              >
                <span className="text-xl font-bold leading-none">···</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 z-10 bg-white border border-gray-200 rounded-lg shadow-lg w-fit">
                  <ul className=" text-sm text-gray-700 w-fit ">
                    <DeletComment id={comment._id} />
                    <UpdateComment id={comment._id}  comment={comment} />
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
