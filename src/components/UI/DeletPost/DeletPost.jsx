import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function DeletPost({ id }) {
  
  const queryClient = useQueryClient();
  function deletePost() {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }
  function handledeDelete() {
    Swal.fire({
      title: "Are you sure?",
     
    
      showCancelButton: true,
      confirmButtonColor: "#1c64f2",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate();
      }
    });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,

    onSuccess: (data) => {
      toast.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });
      console.log(data);
    },
    onError: () => {
      toast.error("Failed to delete post.");
    },
  });

  return (
  
     <li className="border-b border-gray-200 flex  align-center  ">
              <button
                disabled={isPending}
                onClick={() => handledeDelete()}
                className="flex cursor-pointer items-center w-full px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin />
                     Deleting Post
                  </>
                ) : (
                  " Delete Post"
                )}
              </button>
            </li>
  );
}
