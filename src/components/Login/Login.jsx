import { Link } from "react-router-dom";
import AuthText from "../UI/Authtext/AuthText";

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 xs:p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 xs:gap-8 lg:gap-16 max-w-5xl w-full">
        {/* Left Side - Branding */}
        <AuthText />
        {/* Right Side - Login Form */}
        <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4">
            {/* Form */}
            <form className="space-y-2 xs:space-y-3">
              {/* Email Field */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md text-sm xs:text-base sm:text-lg bg-white 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Password Field */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 sm:py-4 border border-gray-300 rounded-md text-sm xs:text-base sm:text-lg bg-white 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-2.5 xs:py-3 sm:py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white text-base xs:text-lg sm:text-xl font-bold rounded-md 
                  transition-colors duration-200 shadow-md"
              >
                Log In
              </button>
            </form>

            {/* Forgot Password */}
            <div className="text-center">
              <Link
                to="#"
                className="text-blue-600 hover:underline text-xs xs:text-sm sm:text-base"
              >
                Forgotten password?
              </Link>
            </div>

            {/* Divider */}
            <hr className="border-gray-300" />

            {/* Create Account Button */}
            <div className="text-center pt-1 xs:pt-2">
              <Link
                to="/signup"
                className="inline-block py-2.5 xs:py-3 sm:py-4 px-3 xs:px-4 sm:px-8 bg-green-500 hover:bg-green-600 text-white text-sm xs:text-base sm:text-lg font-bold rounded-md 
                  transition-colors duration-200 shadow-md"
              >
                Create new account
              </Link>
            </div>
          </div>

          {/* Create Page Link */}
          <p className="text-center mt-4 xs:mt-6 text-xs xs:text-sm sm:text-base text-gray-700">
            <Link to="#" className="font-semibold hover:underline">
              Create a Page
            </Link>{" "}
            for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>
  );
}
