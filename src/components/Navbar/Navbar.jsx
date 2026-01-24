import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaVideo,
  FaStore,
  FaBell,
  FaFacebookMessenger,
  FaCaretDown,
  FaSearch,
  FaBars,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaMoon,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import useLogData from "../../../Hooks/LogDataHook/LogDataHook";

export default function Navbar() {
  const { data, clearLogCache } = useLogData();

  let { setUser } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  let navigate = useNavigate();
  function SignOut() {
    localStorage.removeItem("token");
    clearLogCache();
    navigate("/login");
    setUser(null);
  }
  return (
    <>
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-14">
        <div className="flex items-center justify-between h-full px-1 xs:px-2 sm:px-4">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center gap-1 xs:gap-2">
            {/* Logo */}
            <Link to="/home" className="shrink-0 flex items-center gap-1.5">
              <div className="relative w-9 h-9 xs:w-10 xs:h-10">
                {/* Outer ring with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl rotate-6 opacity-80"></div>
                {/* Inner background */}
                <div className="absolute inset-0.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  {/* Letter S with style */}
                  <span
                    className="text-white text-lg xs:text-xl font-black tracking-tight"
                    style={{ fontFamily: "system-ui" }}
                  >
                    S
                  </span>
                  {/* Small dot accent */}
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 xs:w-2.5 xs:h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
              </div>
              {/* App name - hidden on very small screens */}
              <span className="hidden sm:block text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Social
              </span>
            </Link>

            {/* Search Bar - Hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-2 ml-2">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search SocialApp"
                className="bg-transparent outline-none w-24 md:w-40 lg:w-64 text-sm"
              />
            </div>

            {/* Mobile Search Icon */}
            <button className="sm:hidden w-9 h-9 xs:w-10 xs:h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <FaSearch className="text-gray-600 text-sm xs:text-base" />
            </button>
          </div>

          {/* Center Section - Navigation Icons */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 max-w-md lg:max-w-xl">
            <Link
              to="/home"
              className="flex items-center justify-center py-2 px-4 lg:px-8 xl:px-12 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors border-b-4 border-blue-600 text-blue-600"
            >
              <FaHome className="text-xl lg:text-2xl" />
            </Link>
            <button className="flex items-center justify-center py-2 px-4 lg:px-8 xl:px-12 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700 border-b-4 border-transparent">
              <FaUserFriends className="text-xl lg:text-2xl" />
            </button>
            <button className="flex items-center justify-center py-2 px-4 lg:px-8 xl:px-12 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700 border-b-4 border-transparent">
              <FaVideo className="text-xl lg:text-2xl" />
            </button>
            <button className="flex items-center justify-center py-2 px-4 lg:px-8 xl:px-12 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700 border-b-4 border-transparent">
              <FaStore className="text-xl lg:text-2xl" />
            </button>
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center gap-1">
            {/* Messenger */}
            <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors relative">
              <FaFacebookMessenger className="text-gray-700 text-sm xs:text-base sm:text-lg" />
              <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-4 h-4 xs:w-5 xs:h-5 bg-red-500 text-white text-[9px] xs:text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            {/* Notifications */}
            <button className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors relative">
              <FaBell className="text-gray-700 text-sm xs:text-base sm:text-lg" />
              <span className="absolute -top-0.5 -right-0.5 xs:-top-1 xs:-right-1 w-4 h-4 xs:w-5 xs:h-5 bg-red-500 text-white text-[9px] xs:text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hidden md:flex items-center gap-1 hover:opacity-90 transition-opacity relative"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center cursor-pointer">
                  <img
                    src={data?.data.user.photo}
                    alt="User Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <FaCaretDown
                  className={`text-gray-700 text-sm transition-transform absolute bottom-0 bg-white rounded-full z-40 left-6 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu - Desktop only */}
              {isDropdownOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="hidden md:block fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>

                  {/* Dropdown */}
                  <div className="hidden md:block absolute right-0 top-12 w-72 sm:w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                    {/* User Info */}
                    <div className="p-3 border-b border-gray-100">
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <img
                            src={data?.data.user.photo}
                            alt="User"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {data?.data.user.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            See your profile
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Auth Links */}

                    {/* Menu Items */}
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaCog className="text-gray-700" />
                        </div>
                        <Link
                          to="/settings"
                          className="font-medium text-gray-800"
                        >
                          Settings & Privacy
                        </Link>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaQuestionCircle className="text-gray-700" />
                        </div>
                        <span className="font-medium text-gray-800">
                          Help & Support
                        </span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaMoon className="text-gray-700" />
                        </div>
                        <span className="font-medium text-gray-800">
                          Display & Accessibility
                        </span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                          <FaSignOutAlt className="text-gray-700" />
                        </div>
                        <span
                          onClick={SignOut}
                          className="font-medium text-gray-800 cursor-pointer"
                        >
                          Log Out
                        </span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0  bg-white border-t border-gray-200 z-50 h-12 xs:h-14">
        <div className="flex items-center justify-around h-full px-1">
          <Link
            to="/home"
            className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-blue-600"
          >
            <FaHome className="text-lg xs:text-xl" />
          </Link>
          <button className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-gray-500">
            <FaUserFriends className="text-lg xs:text-xl" />
          </button>
          <button className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-gray-500">
            <FaVideo className="text-lg xs:text-xl" />
          </button>
          <button className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-gray-500">
            <FaStore className="text-lg xs:text-xl" />
          </button>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-gray-500"
          >
            <FaBars className="text-lg xs:text-xl" />
          </button>
          <Link
            to="/profile"
            className="flex-1 flex flex-col items-center justify-center py-1 xs:py-2 text-gray-500"
          >
            <FaUser className="text-lg xs:text-xl" />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isDropdownOpen && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsDropdownOpen(false)}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="md:hidden fixed bottom-14 left-2 right-2 bg-white rounded-t-2xl shadow-2xl z-50 max-h-[70vh] overflow-y-auto">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>

            {/* User Info */}
            <div className="px-4 pb-3 border-b border-gray-100">
              <Link
                to="/profile"
                className="flex items-center gap-3 p-3 hover:bg-gray-100 rounded-xl transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={data?.data.user.photo}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    Saher Mohamed
                  </p>
                  <p className="text-sm text-gray-500">See your profile</p>
                </div>
              </Link>
            </div>

            {/* Auth Links */}

            {/* Menu Items */}
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                Settings
              </p>
              <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaCog className="text-gray-700" />
                </div>
                <Link to="/settings" className="font-medium text-gray-800">
                  Settings & Privacy
                </Link>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaQuestionCircle className="text-gray-700" />
                </div>
                <span className="font-medium text-gray-800">
                  Help & Support
                </span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaMoon className="text-gray-700" />
                </div>
                <span className="font-medium text-gray-800">
                  Display & Accessibility
                </span>
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-gray-100 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <FaSignOutAlt className="text-red-600" />
                </div>
                <span
                  className="font-medium text-gray-800 cursor-pointer"
                  onClick={SignOut}
                >
                  Log Out
                </span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
