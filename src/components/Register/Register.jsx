import { Link } from "react-router-dom";
import { useState } from "react";
import FormField from "../UI/FormField/Formfield";
import AuthText from "../UI/Authtext/AuthText";
import useSignUpHook from "../../Hooks/SighUpHook/SignUpHook.js";
import {
  faSpinner,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

export default function Register() {
  const { FormData, mutate, isPending } = useSignUpHook();
  let { register, handleSubmit, formState } = FormData;
  const [showpassword, setShowpassword] = useState(false);

  const PasswordValue = FormData.watch("password");

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-5xl w-full">
          {/* Left Side - Branding */}
          <AuthText />

          {/* Right Side - Register Form */}
          <div className="w-full max-w-sm xs:max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              {/* Header */}
              <div className="text-center pb-2">
                <h2 className="text-2xl font-bold text-gray-800">
                  Create a new account
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  It's quick and easy.
                </p>
              </div>
              <hr className="border-gray-200" />

              <form className="space-y-3" onSubmit={handleSubmit(mutate)}>
                {/* Name Field */}
                <FormField
                  type="name"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
                  id="name"
                  {...register("name")}
                  name="name"
                  placeholder="Enter your name"
                />
                {formState.touchedFields?.name && formState.errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.name.message}
                  </p>
                )}

                {/* Email Field */}
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
                {formState.touchedFields?.email && formState.errors?.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formState.errors.email.message}
                  </p>
                )}
                {/* Password Field */}
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
                {formState.touchedFields?.password &&
                  formState.errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.password.message}
                    </p>
                  )}
                {/* Confirm Password Field */}
                <FormField
                  type="password"
                  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md text-base xs:text-lg bg-gray-50 
                  focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                  placeholder-gray-500 transition-all"
                  id="rePassword"
                  {...register("rePassword")}
                  placeholder="Confirm your password"
                  name="rePassword"
                />
                {formState.touchedFields?.rePassword &&
                  formState.errors?.rePassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.rePassword.message}
                    </p>
                  )}
                {/* Date of Birth */}
                <div className="space-y-1">
                  <label className="text-xs text-gray-600 font-medium">
                    Date of birth
                  </label>
                  <FormField
                    type="date"
                    {...register("dateOfBirth")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md text-lg bg-gray-50 
                    focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    text-gray-700 transition-all"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    placeholder="Select your date of birth"
                  />
                  {formState.touchedFields?.dateOfBirth &&
                    formState.errors?.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">
                        {formState.errors.dateOfBirth.message}
                      </p>
                    )}
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
                      <FormField
                        type="radio"
                        {...register("gender")}
                        value="male"
                        className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 accent-blue-600"
                        id="gender"
                        name="gender"
                      />
                    </label>
                    <label className="flex-1 flex items-center justify-between px-3 xs:px-4 py-2.5 xs:py-3 border border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-all">
                      <span className="text-gray-700 text-sm xs:text-base">
                        Female
                      </span>
                      <FormField
                        type="radio"
                        {...register("gender")}
                        value="female"
                        id="gender"
                        name="gender"
                        className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 accent-blue-600"
                      />
                    </label>
                  </div>
                  {formState.touchedFields?.gender &&
                    formState.errors?.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {formState.errors.gender.message}
                      </p>
                    )}
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
                    disabled={isPending}
                    type="submit"
                    className="w-full disabled: py-3 d px-4 disabled:cursor-not-allowed bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-md 
                    transition-colors duration-200 shadow-md"
                  >
                    {isPending ? (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    ) : (
                      "Sign Up"
                    )}
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
    </>
  );
}
