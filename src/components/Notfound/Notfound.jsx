import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FaHome, FaSearch, FaExclamationTriangle } from "react-icons/fa";

export default function Notfound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - 404</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 xs:p-4">
        <div className="text-center max-w-md mx-auto">
          {/* Icon */}
          <div className="mb-4 xs:mb-6">
            <div className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <FaExclamationTriangle className="text-3xl xs:text-4xl sm:text-5xl text-gray-400" />
            </div>
          </div>

          {/* Error Code */}
          <h1 className="text-5xl xs:text-6xl sm:text-8xl font-bold text-blue-600 mb-2 xs:mb-4">
            404
          </h1>

          {/* Title */}
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 xs:mb-8 text-xs xs:text-sm sm:text-base px-2 xs:px-4">
            Sorry, the page you're looking for doesn't exist or has been moved.
            Please check the URL or go back to the homepage.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 justify-center px-2 xs:px-4">
            <Link
              to="/home"
              className="flex items-center justify-center gap-2 px-4 xs:px-6 py-2.5 xs:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm xs:text-base"
            >
              <FaHome />
              <span>Go to Home</span>
            </Link>
            <Link
              to="#"
              className="flex items-center justify-center gap-2 px-4 xs:px-6 py-2.5 xs:py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm xs:text-base"
            >
              <FaSearch />
              <span>Search</span>
            </Link>
          </div>

          {/* Help Links */}
          <div className="mt-6 xs:mt-8 pt-4 xs:pt-6 border-t border-gray-300">
            <p className="text-xs xs:text-sm text-gray-500">
              Need help?{" "}
              <Link to="#" className="text-blue-600 hover:underline">
                Visit Help Center
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
