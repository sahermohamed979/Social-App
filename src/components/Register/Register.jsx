import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-5xl w-full">
        {/* Left Side - Branding */}
        <div className="text-center lg:text-left lg:flex-1">
          <h1 className="text-4xl xs:text-5xl lg:text-6xl font-bold text-blue-600 mb-2 xs:mb-4">
            SocialApp
          </h1>
          <p className="text-lg xs:text-xl lg:text-2xl text-gray-600 max-w-md mx-auto lg:mx-0">
            Connect with friends and the world around you on SocialApp.
          </p>
        </div>

        {/* Right Side - Register Form */}
        <div className="w-full max-w-sm xs:max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            {/* Header */}
            <div className="text-center pb-2">
              <h2 className="text-2xl font-bold text-gray-800">
                Create a new account
              </h2>
              <p className="text-gray-500 text-sm mt-1">It's quick and easy.</p>
            </div>

            <hr className="border-gray-200" />

            {/* Form */}
            <form className="space-y-3">
              {/* Name Field */}
              <input
                type="text"
                name="name"
                placeholder="Full name"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Email Field */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Password Field */}
              <input
                type="password"
                name="password"
                placeholder="New password"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Confirm Password Field */}
              <input
                type="password"
                name="rePassword"
                placeholder="Confirm password"
                className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
              />

              {/* Date of Birth */}
              <div className="space-y-1">
                <label className="text-xs text-gray-600 font-medium">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg bg-gray-50 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    text-gray-700 transition-all"
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-1">
                <label className="text-xs text-gray-600 font-medium">
                  Gender
                </label>
                <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                  <label className="flex-1 flex items-center justify-between px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-all">
                    <span className="text-gray-700 text-sm xs:text-base">
                      Male
                    </span>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 accent-blue-600"
                    />
                  </label>
                  <label className="flex-1 flex items-center justify-between px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-all">
                    <span className="text-gray-700 text-sm xs:text-base">
                      Female
                    </span>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 accent-blue-600"
                    />
                  </label>
                </div>
              </div>

              {/* Terms Text */}
              <p className="text-xs text-gray-500 leading-relaxed">
                By clicking Sign Up, you agree to our{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>
                ,{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Cookies Policy
                </a>
                .
              </p>

              {/* Sign Up Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-md 
                    transition-colors duration-200 shadow-md"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center pt-4">
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium text-lg"
              >
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
