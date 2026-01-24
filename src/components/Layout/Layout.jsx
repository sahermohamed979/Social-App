import RightBar from "../UI/Rightbar/Rightbar";
import LeftBar from "../UI/Leftbar/Leftbar";
import Navbar from "../UI/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <div className="flex pt-14">
        {/* Left Sidebar - Fixed */}
        <LeftBar />

        {/* Main Feed - Center */}
        <main className="flex-1 w-full  px-2 sm:px-4 md:ml-16 lg:ml-56 xl:ml-64 2xl:ml-72 md:mr-0 lg:mr-56 xl:mr-72 2xl:mr-80 py-4 min-w-0">
          <Outlet />
        </main>

        {/* Right Sidebar - Fixed */}
        <RightBar />
      </div>
    </div>
  );
}
