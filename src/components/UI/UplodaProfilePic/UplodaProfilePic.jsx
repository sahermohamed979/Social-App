import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";

export default function UploadProfilePic() {
  const queryClient = useQueryClient();
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const schema = z.object({
    photo: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, "Please select an image")
      .refine(
        (files) => files[0]?.size <= 4 * 1024 * 1024,
        "Image max size 4MB",
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
        "Only JPG, PNG, WEBP images are allowed",
      ),
  });

  const { register, handleSubmit, trigger } = useForm({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const photoRegister = register("photo");

  function handleUpload(data) {
    const formData = new FormData();
    formData.append("photo", data.photo[0]);

    return axios.put(
      `https://linked-posts.routemisr.com/users/upload-photo`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpload,
    onSuccess: () => {
      toast.success("Profile picture updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getlog"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.error || "Failed to update profile picture.",
      );
    },
  });

  const handleFileChange = async (e) => {
    await photoRegister.onChange(e);

    const isValid = await trigger("photo");
    if (isValid && e.target.files?.length > 0) {
      handleSubmit(mutate)();
    }
  };

  return (
    <>
      <label className="absolute bottom-2 right-2 w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors cursor-pointer">
        <FaCamera className="text-gray-700" />
        <input
          {...photoRegister}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isPending}
        />
      </label>
      {isPending && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
