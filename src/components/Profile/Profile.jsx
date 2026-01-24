import { Link, useNavigate } from "react-router-dom";
import {
  FaCamera,
  FaUserPlus,
  FaFacebookMessenger,
  FaEllipsisH,
  FaBriefcase,
  FaHome,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
} from "react-icons/fa";
import banner from "../../assets/482210481_2612874728912958_7405680030859141367_n.jpg";
import useLogData from "../../Hooks/LogDataHook/LogDataHook";
import PostContainer from "../UI/postContainer/postContainer";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Card from "../UI/Card/Card";
import UplodaProfilePic from "../UI/UplodaProfilePic/UplodaProfilePic";
import {Helmet} from "react-helmet";

export default function Profile() {
   let navigate = useNavigate();

  const LogData = useLogData();
  const friends = [
    { name: "John Doe", mutual: 12 },
    { name: "Jane Smith", mutual: 8 },
    { name: "Mike Johnson", mutual: 15 },
    { name: "Sarah Williams", mutual: 5 },
    { name: "Alex Brown", mutual: 20 },
    { name: "Emily Davis", mutual: 3 },
    { name: "Chris Wilson", mutual: 10 },
    { name: "Lisa Anderson", mutual: 7 },
    { name: "David Lee", mutual: 18 },
  ];
  const date = new Date(LogData?.data?.data?.user?.createdAt);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
 

  let createdAtFormatted;
  if (diffInSeconds < 60) {
    createdAtFormatted = "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    createdAtFormatted = `${minutes}m`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    createdAtFormatted = `${hours}h`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    createdAtFormatted = `${days}d`;
  } else {
    createdAtFormatted = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function getUserPosts() {
    return axios.get(
      "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?limit=10",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  let { data } = useQuery({
    queryKey: ["getUserPosts"],
    queryFn: getUserPosts,
    staleTime: 500000,
    retry: 2,
    retryDelay: 3000,
    refetchInterval: 500000,
    refetchIntervalInBackground: true,
    refetchOnReconnect: true,
    gcTime: 500000,
    select: (data) => data?.data.posts.reverse(),
  });

  return (
    <>
<Helmet>
                <title>Profile</title>
            </Helmet>
    <div className="max-w-5xl mx-auto pb-20 md:pb-4 overflow-x-hidden">
      {/* Cover Photo Section */}
      <div className="relative">
        <div className="h-36 xs:h-90 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-b-lg">
          {" "}
          <img
            src={banner}
            alt="Cover"
            className="w-full h-full object-cover bg-contain rounded-b-lg"
          />
        </div>

        <button className="absolute bottom-4 right-4 bg-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-gray-100 transition-colors shadow-md">
          <FaCamera className="text-gray-700" />
          <span className="hidden sm:inline">Edit cover photo</span>
        </button>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-4 pt-4 bg-white shadow-sm">
        {/* Profile Picture */}
        <div className="flex flex-col lg:flex-row lg:items-end">
          <div className="relative -mt-12 xs:-mt-16 lg:-mt-20 mx-auto lg:mx-0">
            <div className="w-24 h-24 xs:w-32 xs:h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
              <img
                src={LogData?.data?.data?.user?.photo}
                alt="User"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <UplodaProfilePic />
          </div>

          {/* Name and Info */}
          <div className="mt-3 xs:mt-4 lg:mt-0 lg:ml-4 lg:pb-4 flex-1 text-center lg:text-left">
            <h1 className="text-xl xs:text-2xl md:text-3xl font-bold text-gray-900">
              {LogData?.data?.data?.user?.name}
            </h1>
            <p className="text-gray-500 font-medium text-sm xs:text-base">
              1.2K friends
            </p>
            {/* Friend Avatars */}
            <div className="flex -space-x-2 mt-2 justify-center lg:justify-start">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-white flex items-center justify-center"
                >
                  <span className="text-white text-[10px] xs:text-xs font-semibold">
                    {String.fromCharCode(64 + i)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 xs:mt-4 lg:mt-0 lg:pb-4 justify-center px-2">
            <button className="px-3 xs:px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-1 xs:gap-2 font-semibold hover:bg-blue-700 transition-colors text-sm xs:text-base">
              <FaUserPlus className="text-sm xs:text-base" />
              <span className="hidden xs:inline">Add Friend</span>
            </button>
            <button className="px-3 xs:px-4 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center justify-center gap-1 xs:gap-2 font-semibold hover:bg-gray-300 transition-colors text-sm xs:text-base">
              <FaFacebookMessenger className="text-sm xs:text-base" />
              <span className="hidden xs:inline">Message</span>
            </button>
            <button className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              <FaEllipsisH className="text-sm xs:text-base" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-4 border-gray-300" />

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-0 xs:gap-1 -mb-4 scrollbar-hide -mx-4 px-4">
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-blue-600 font-semibold border-b-4 border-blue-600 whitespace-nowrap text-sm xs:text-base">
            Posts
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            About
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Friends
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Photos
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Videos
          </button>
          <button className="hidden sm:block px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            Check-ins
          </button>
          <button className="px-2 xs:px-3 sm:px-4 py-3 xs:py-4 text-gray-500 font-semibold hover:bg-gray-100 rounded-t-lg transition-colors whitespace-nowrap text-sm xs:text-base">
            More
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 mt-4 px-2 sm:px-0">
        <div className="lg:w-2/5 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Intro</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-600">
                <FaBriefcase className="text-gray-500" />
                <span>
                  Work Mail{" "}
                  <span className="font-semibold text-gray-900">
                    {LogData?.data?.data?.user?.email?.charAt(0).toUpperCase() +
                      LogData?.data?.data?.user?.email?.slice(1)}
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-gray-600">
                <FaHome className="text-gray-500" />
                <span>
                  Date of Birth{" "}
                  <span className="font-semibold text-gray-900">
                    {LogData?.data?.data?.user?.dateOfBirth
                      ? new Date(
                          LogData.data.data.user.dateOfBirth,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaMapMarkerAlt className="text-gray-500" />
                <span>
                  From{" "}
                  <span className="font-semibold text-gray-900">
                    Los Angeles, California
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaHeart className="text-gray-500" />
                <span className="font-semibold text-gray-900">
                  {LogData?.data?.data?.user?.gender?.charAt(0).toUpperCase() +
                    LogData?.data?.data?.user?.gender?.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <FaClock className="text-gray-500" />

                <span>
                  Joind{" "}
                  <span className="font-semibold text-gray-900">
                    {" "}
                    {createdAtFormatted}
                  </span>
                </span>
              </div>
            </div>
            <button className="w-full mt-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Edit Details
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Photos</h2>
              <Link to="#" className="text-blue-600 hover:underline">
                See All Photos
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {data &&
                data
                  .flatMap((post) => post.image || [])
                  .slice(0, 9)
                  .map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`User post ${idx + 1}`}
                      onClick={() => navigate(`/post/${data[idx]._id}`)}
                      className={`aspect-square object-cover w-full h-full ${
                        idx === 0 ? "rounded-tl-lg" : ""
                      } ${idx === 2 ? "rounded-tr-lg" : ""} ${
                        idx === 6 ? "rounded-bl-lg" : ""
                      } ${idx === 8 ? "rounded-br-lg" : ""} hover:opacity-90 cursor-pointer transition-opacity`}
                    />
                  ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Friends</h2>
                <p className="text-gray-500 text-sm">1,234 friends</p>
              </div>
              <Link to="#" className="text-blue-600 hover:underline">
                See All Friends
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {friends.map((friend, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center mb-1">
                    <span className="text-white text-2xl font-bold">
                      {friend.name.charAt(0)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {friend.mutual} mutual
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:w-3/5 space-y-4">
          <PostContainer />

          {data?.map(
            (post) =>
              post && (
                <div className="pt-2" key={post._id}>
                  <Card post={post} deletcomment={true} updatecomment={true} />
                </div>
              ),
          )}
        </div>
      </div>
    </div>
    </>
  );
}
