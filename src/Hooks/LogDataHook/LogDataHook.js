import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function LogData() {
  function getlog() {
    // Fetch all posts logic here
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["getlog"],
    queryFn: getlog,

    retry: 2,
    retryDelay: 3000,

    gcTime: 5000,
  });

  return { data };
}
