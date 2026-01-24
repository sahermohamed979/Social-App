import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { FaVideo, FaImage, FaSmile } from "react-icons/fa";
import useLogData from "../../../Hooks/LogDataHook/LogDataHook";

export default function UpdatePost({ id, image, body }) {
  const [imageSrc, setImageSrc] = useState(image || null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data } = useLogData();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  function handleImageChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  }

  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const schema = z.object({
    body: z.string().min(1, "Post content cannot be empty"),
    image: z
      .any()
      .optional()
      .transform((fileList) => fileList?.[0] || null)
      .refine(
        (file) => !file || file.size <= 5 * 1024 * 1024,
        "Image must be less than 5MB",
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only JPG, PNG, WEBP images are allowed",
      ),
  });

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      body: body || "",
      image: image || null,
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpload,
    onSuccess: () => {
      toast.success("Post updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });

      setImageSrc(null);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to update post.");
    },
  });

  function handleUpload(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (data.image) {
      formData.append("image", data.image);
    }
    return axios.put(
      `https://linked-posts.routemisr.com/posts/${id}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  return (
    <>
      {open ? (
        <div className="bg-white/70 rounded-xl shadow p-4 h-screen fixed top-0 left-0 w-full z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-center">Edit Post</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 bg-gray-200 cursor-pointer rounded-full flex items-center justify-center hover:bg-gray-300 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="flex items-center gap-3 mb-4">
              <img
                src={data?.data?.user.photo}
                alt="User"
                className="w-10 h-10 object-cover rounded-full"
              />
              <span className="font-semibold">
                {data?.data?.user.name || "User"}
              </span>
            </div>

            <form onSubmit={handleSubmit(mutate)}>
              <textarea
                className="w-full h-32 outline-none text-lg placeholder-gray-400 resize-none"
                placeholder={`What's on your mind?`}
                autoFocus
                {...register("body")}
              />

              {imageSrc ? (
                <div className="relative">
                  <img
                    src={imageSrc}
                    alt="Preview"
                    className="mt-4 max-h-60 w-full object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setImageSrc(null)}
                    className="w-8 absolute top-0 left-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    ✕
                  </button>
                </div>
              ) : null}

              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mt-4">
                <span className="font-medium">Add to your post</span>
                <div className="flex gap-2">
                  <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <input
                      className="hidden cursor-pointer"
                      type="file"
                      multiple={true}
                      accept="image/*"
                      {...register("image", {
                        onChange: handleImageChange,
                      })}
                    />
                    <FaImage className="text-green-500 text-xl" />
                  </label>
                  <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <input
                      className="hidden cursor-pointer"
                      type="file"
                      accept="image/*"
                    />
                    <FaVideo className="text-red-500 text-xl" />
                  </label>
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <FaSmile className="text-yellow-500 text-xl" />
                  </button>
                </div>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="w-full  cursor-pointer bg-blue-500 py-3 px-4 disabled:cursor-not-allowed text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isPending ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin /> Updating
                  </>
                ) : (
                  "Update"
                )}
              </button>
              {formState.errors?.body && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.body.message}
                </p>
              )}
              {formState.errors?.image && (
                <p className="text-red-500 text-sm mt-1">
                  {formState.errors.image.message}
                </p>
              )}
            </form>
          </div>
        </div>
      ) : (
        <li className="border-b border-gray-200 flex align-center">
          <button
            disabled={isPending}
            onClick={() => setOpen(true)}
            className="flex items-center cursor-pointer w-full px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Edit
          </button>
        </li>
      )}
    </>
  );
}
