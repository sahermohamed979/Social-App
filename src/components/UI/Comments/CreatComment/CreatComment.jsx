import { FaPaperPlane, FaSmile, FaImage, FaCamera } from "react-icons/fa";
import useLogData from "../../../../Hooks/LogDataHook/LogDataHook";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CreatComment({ id }) {
  const queryClient = useQueryClient();

  const LogData = useLogData();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const handlecreat = (data) => {
    const commentData = {
      ...data,
      post: id,
    };

    return axios.post(
      "https://linked-posts.routemisr.com/comments",
      commentData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  };

  const { mutate } = useMutation({
    mutationFn: handlecreat,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });

      toast.success("Comment created successfully!");
      reset();
      console.log("Comment response:", data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create comment.");
    },
  });

  return (
    <form onSubmit={handleSubmit(mutate)}>
      <div className="bg-white border-t border-gray-200 p-4  rounded-b-xl">
        <div className="flex items-start gap-2 sm:gap-3">
          {/* User Avatar */}
          <div className="flex-shrink-0">
            <img
              src={LogData?.data?.data?.user?.photo}
              alt="Your profile"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover ring-2 ring-gray-100"
            />
          </div>

          <div className="flex-1 flex  flex-row items-start sm:items-center gap-2">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder="Write a comment..."
                {...register("content")}
                className="w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 focus:bg-white border-2 border-transparent focus:border-blue-500 rounded-full text-sm outline-none transition-all placeholder-gray-500"
              />
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="submit"
                className=" p-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow-md active:scale-95"
                title="Send comment"
              >
                <FaPaperPlane className="text-sm sm:text-base" />
              </button>
            </div>
          </div>

          {/* Optional: Quick Reactions */}
        </div>
      </div>
    </form>
  );
}
