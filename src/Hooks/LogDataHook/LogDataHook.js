import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function LogData() {
  const queryClient = useQueryClient();

  function getlog() {
    return axios.get("https://route-posts.routemisr.com/users/profile-data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });
  }

  let { data } = useQuery({
    queryKey: ["getlog"],
    queryFn: getlog,
    retry: 2,
    retryDelay: 3000,
    staleTime: 6 * 60 * 1000,
  });

  function clearLogCache() {
    queryClient.removeQueries(["getlog"]);
  }

  return { data, clearLogCache };
}
