import { Link } from "react-router-dom";
import {
  FaUserFriends,
  FaClock,
  FaBookmark,
  FaUsers,
  FaVideo,
  FaStore,
  FaCalendarAlt,
  FaFlag,
  FaGamepad,
  FaChevronDown,
} from "react-icons/fa";
import useLogData from "../../../Hooks/LogDataHook/LogDataHook";

export default function Leftbar() {
  const { data } = useLogData();

  const menuItems = [
    { icon: FaUserFriends, label: "Friends", link: "#" },
    { icon: FaClock, label: "Memories", link: "#" },
    { icon: FaBookmark, label: "Saved", link: "#" },
    { icon: FaUsers, label: "Groups", link: "#" },
    { icon: FaVideo, label: "Video", link: "#" },
    { icon: FaStore, label: "Marketplace", link: "#" },
    { icon: FaCalendarAlt, label: "Events", link: "#" },
    { icon: FaFlag, label: "Pages", link: "#" },
    { icon: FaGamepad, label: "Gaming", link: "#" },
  ];

  const shortcuts = [
    { name: "React Developers", img: "R" },
    { name: "JavaScript Community", img: "J" },
    { name: "Web Design Hub", img: "W" },
  ];

  return (
    <aside className="hidden md:block fixed left-0 top-14 md:w-16 lg:w-56 xl:w-64 2xl:w-72 h-[calc(100vh-56px)] overflow-y-auto p-2 scrollbar-thin bg-gray-100 md:bg-transparent">
      {/* User Profile */}
      <Link
        to="/profile"
        className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-full  flex items-center justify-center flex-shrink-0">
          <img
            src={data?.data.user.photo}
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <span className="hidden lg:block font-medium text-gray-800 text-sm xl:text-base truncate">
         {data?.data.user.name}
        </span>
      </Link>

      {/* Menu Items */}
      <div className="mt-2">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors group relative"
            title={item.label}
          >
            <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 group-hover:bg-gray-300">
              <item.icon className="text-blue-600 text-lg" />
            </div>
            <span className="hidden lg:block text-gray-800 text-sm font-medium">
              {item.label}
            </span>
            {/* Tooltip for collapsed sidebar */}
            <span className="lg:hidden absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
              {item.label}
            </span>
          </Link>
        ))}

        {/* See More */}
        <button className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors w-full group relative">
          <div className="w-10 h-10 lg:w-9 lg:h-9 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <FaChevronDown className="text-gray-700" />
          </div>
          <span className="hidden lg:block text-gray-800 text-sm font-medium">
            See More
          </span>
          <span className="lg:hidden absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
            See More
          </span>
        </button>
      </div>

      {/* Divider - Hidden on collapsed */}
      <hr className="hidden lg:block my-3 border-gray-300" />

      {/* Shortcuts - Hidden on collapsed */}
      <div className="hidden lg:block">
        <h3 className="text-gray-500 font-semibold text-sm px-2 mb-2">
          Your Shortcuts
        </h3>
        {shortcuts.map((shortcut, index) => (
          <Link
            key={index}
            to="#"
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-semibold text-sm">
                {shortcut.img}
              </span>
            </div>
            <span className="text-gray-800 text-sm font-medium">
              {shortcut.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Footer - Hidden on collapsed */}
      <div className="hidden lg:block mt-4 px-2">
        <p className="text-xs text-gray-500">
          Privacy · Terms · Advertising · Cookies · More · SocialApp © 2026
        </p>
      </div>
    </aside>
  );
}
