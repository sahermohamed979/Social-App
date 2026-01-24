import { Link } from "react-router-dom";
import AuthText from "../UI/Authtext/AuthText";
import { useState } from "react";
import FormField from "../UI/FormField/Formfield";
import useLoginHook from "../../Hooks/LoginHook/LookHook";
import {
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Login() {
  const { FormData, mutate, isPending, error } = useLoginHook();
  let { formState } = FormData;
  let { register, handleSubmit } = FormData;
  const [showpassword, setShowpassword] = useState(false);

  const PasswordValue = FormData.watch("password");
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 xs:p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 xs:gap-8 lg:gap-16 max-w-5xl w-full">
          <AuthText />
          <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-3 xs:p-4 sm:p-6 space-y-3 xs:space-y-4">
              {/* Form */}
              <form
                className="space-y-2 xs:space-y-3"
                onSubmit={handleSubmit(mutate)}
              >
                <FormField
                  type="email"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
                  id="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  name="email"
                />

                <div className="relative">
                  <FormField
                    type={showpassword ? "text" : "password"}
                    className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all relative"
                    id="password"
                    {...register("password")}
                    placeholder="Enter your password"
                    name="password"
                  />
                  {PasswordValue && (
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                      onClick={() => setShowpassword(!showpassword)}
                    >
                      {showpassword ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </span>
                  )}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                {formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.password.message}
                  </p>
                )}
                {formState.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.email.message}
                  </p>
                )}
                {/* Login Button */}
                <button
                  disabled={isPending}
                  type="submit"
                  className="w-full py-2.5 xs:py-3 sm:py-4 px-4 bg-blue-600 hover:bg-blue-700 text-white text-base xs:text-lg sm:text-xl font-bold rounded-md 
                  transition-colors duration-200 shadow-md"
                >
                  {isPending ? (
                    <FontAwesomeIcon icon={faSpinner} spin />
                  ) : (
                    "Login"
                  )}
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
          </div>
        </div>
      </div>
    </>
  );
}
