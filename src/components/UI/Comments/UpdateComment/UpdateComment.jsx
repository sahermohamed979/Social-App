import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import defaultPhoto from "../../../../assets/f_n.jpg";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpdateComment({ id, comment }) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: handleupdate,
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
            queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });

      setIsOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update comment.");
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: comment?.content || "",
    },
  });

  function handleupdate(data) {
    return axios.put(
      `https://linked-posts.routemisr.com/comments/${id}`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  return (
    <>
      <li className="border-b border-gray-200 flex align-center">
        <button
          onClick={() => setIsOpen(true)}
          className="flex cursor-pointer items-center w-full px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-left"
        >
          Edit 
        </button>
      </li>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-[380px] rounded-xl shadow-lg overflow-hidden relative">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors z-10"
              title="Close"
            >
              <FaTimes size={18} />
            </button>

            {/* Header: avatar, name, label */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-1">
              <img
                src={
                  comment?.commentCreator.photo &&
                  !comment.commentCreator.photo.includes("undefined")
                    ? comment.commentCreator.photo
                    : defaultPhoto
                }
                alt={comment?.commentCreator.name || "User"}
                className="w-9 h-9 rounded-full object-cover bg-gray-200"
              />
              <div>
                <div className="font-semibold text-gray-900 text-[15px] leading-tight">
                  {comment?.commentCreator.name || "User"}
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  Edit Comment
                </div>
              </div>
            </div>

            {/* Textarea */}
            <form onSubmit={handleSubmit(mutate)}>
              <div className="px-4 pt-2 pb-1">
                <textarea
                  className="w-full min-h-[60px] text-[15px] bg-gray-100 rounded-lg px-3 py-2 border-none outline-none resize-none focus:bg-gray-50 transition placeholder-gray-500 shadow-none"
                  placeholder="Write a comment..."
                  {...register("content")}
                  autoFocus
                  style={{ boxShadow: "none", border: "none" }}
                />
              </div>

              {/* Footer: action buttons */}
              <div className="px-4 pb-3 flex items-center justify-end gap-2 mt-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-1.5 text-[15px] font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-1.5 cursor-pointer text-[15px] font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors disabled:opacity-60"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} spin /> Saving...
                    </>
                  ) : (
                    "Save"
                  )}{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
