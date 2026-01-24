import { FaVideo, FaImage, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

import useLogData from "../../../Hooks/LogDataHook/LogDataHook";
import { useState, useEffect } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function PostContainer() {
  const { data } = useLogData();
  const [imageSrc, setImageSrc] = useState(null);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

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

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },

    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpload,

    onSuccess: (data) => {
      toast.success("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
      setImageSrc(null);
      setOpen(false);
      reset();
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "Failed to create post.");
    },
  });

  function handleUpload(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (data.image) {
      formData.append("image", data.image);
    }
    return axios.post("https://linked-posts.routemisr.com/posts", formData, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  //

  return (
    <>
      {open ? (
        <div className=" rounded-xl shadow p-4 h-screen fixed top-0 left-0 w-full z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm  animate-in fade-in duration-200">
          <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-center">Create post</h3>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 bg-gray-200  rounded-full flex items-center justify-center hover:bg-gray-300"
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
                className="w-full h-32  outline-none text-lg placeholder-gray-400  resize-none "
                placeholder={`What's on your mind?`}
                autoFocus
                {...register("body")}
              />
              {imageSrc ? (
                <>
                  <div className="relative">
                    <img
                      src={imageSrc}
                      alt="Preview"
                      className="mt-4 max-h-60 w-full object-contain"
                    />
                    <button
                      onClick={() => setImageSrc(null)}
                      className="w-8  absolute top-0 left-4 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                    >
                      ✕
                    </button>
                  </div>
                </>
              ) : null}

              <div className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mt-4">
                <span className="font-medium ">Add to your post</span>
                <div className="flex gap-2">
                  <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <input
                      className="hidden cursor-pointer"
                      type="file"
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
                    <FaVideo className="text-red-500 text-xl" />{" "}
                  </label>

                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <FaSmile className="text-yellow-500 text-xl" />
                  </button>
                </div>
              </div>

              <button
                disabled={isPending}
                type="submit"
                className="w-full cursor-pointer bg-blue-500 disabled: py-3 d px-4 disabled:cursor-not-allowed w-full bg-blue-500 text-white font-semibold py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors"
              >
                {isPending ? <FontAwesomeIcon icon={faSpinner} spin /> : "Post"}
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
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-3">
            <Link to="/profile">
              <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                <span className="text-white font-semibold">
                  <img
                    src={data?.data?.user.photo}
                    alt="User"
                    className="w-full h-full object-cover rounded-full"
                  />
                </span>
              </div>
            </Link>
            <button
              className="flex-1 text-left px-4 cursor-pointer py-2.5 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => setOpen(true)}
            >
              What's on your mind?
            </button>
          </div>
          <hr className="my-3 border-gray-200" />
          <div className="flex justify-between">
            <button
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaVideo className="text-red-500 text-lg" />
              <span className="hidden xs:inline text-gray-600 font-medium text-xs sm:text-sm">
                Live
              </span>
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <FaImage className="text-green-500 text-lg" />
              <span className="hidden xs:inline text-gray-600 font-medium text-xs sm:text-sm ">
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
      )}
    </>
  );
}
