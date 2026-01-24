import Card from "../UI/Card/Card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingCard from "../UI/LoadingCard/LoadingCard";
import useLogData from "../../Hooks/LogDataHook/LogDataHook";
import { Helmet } from "react-helmet";

export default function PostDetails() {
  const { id } = useParams();
  const LogData = useLogData();

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
  }

  let { data, isLoading, isError } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getSinglePost,
    retry: 2,
    retryDelay: 3000,
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,

    select: (data) => data?.data.post,
  });

  return (
    <>
      <Helmet>
        <title>Post</title>
      </Helmet>
      {isError ? (
        <div className="max-w-3xl mx-auto pb-20 md:pb-4 p-4 ">
          <div
            className="flex  justify-center align-center border-[#c69bea] opacity-80 rounded-2xl  border-2 bg-[#1b5ce4]  items-start sm:items-center p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
            role="alert"
          >
            <svg
              className="w-4 h-4 me-2 shrink-0 mt-0.5 sm:mt-0 text-[#f3f4f6]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p className="text-[#f3f4f6]">
              <span className="font-medium me-1  text-[#f3f4f6]">
                Network error!
              </span>{" "}
              Network error. Please try again.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="max-w-3xl mx-auto pb-20 md:pb-4 space-y-4">
            {data && (
              <Card
                post={data}
                showAllComments={true}
                deletcomment={
                  data?.user?._id === LogData?.data?.data?.user?._id
                }
                updatecomment={
                  data?.user?._id === LogData?.data?.data?.user?._id
                }
              />
            )}
            {isLoading && <LoadingCard />}
          </div>
        </>
      )}
    </>
  );
}
