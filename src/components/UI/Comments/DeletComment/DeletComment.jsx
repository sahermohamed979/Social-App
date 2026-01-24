import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export default function DeletComment({ id }) {
  const queryClient = useQueryClient();
  function deleteComment() {
    return axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
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
    mutationFn: deleteComment,

    onSuccess: (data) => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getSinglePost"] });
      queryClient.invalidateQueries({ queryKey: ["getAllPosts"] });
      queryClient.invalidateQueries({ queryKey: ["getUserPosts"] });

      console.log(data);
    },
    onError: () => {
      toast.error("Failed to delete comment.");
    },
  });

  return (
    <li className="border-b border-gray-200 flex  align-center  ">
      <button
        disabled={isPending}
        onClick={() => handledeDelete()}
        className="flex items-center cursor-pointer w-full px-4 py-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <FontAwesomeIcon icon={faSpinner} spin />
            Deleting 
          </>
        ) : (
          " Delete"
        )}
      </button>
    </li>
  );
}
