import { Link, useNavigate } from "react-router-dom";
import {
  FaLock,
  FaShieldAlt,
  FaEyeSlash,
  FaArrowLeft,
  FaKey,
  FaUserCog,
  FaQuestionCircle,
  FaChevronRight,
  FaEye,
} from "react-icons/fa";
import useLogData from "../../Hooks/LogDataHook/LogDataHook";
import z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";

export default function SettingChangePas() {
  const [showPass, setShowPass] = useState(false);
  const LogData = useLogData();
  const navigate = useNavigate();
  // Schema Validation
  let schema = z.object({
    password: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be 8+ chars, include uppercase, number and special char",
      ),
  });

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  function handleChangePas(data) {
    return axios.patch(
      `https://linked-posts.routemisr.com/users/change-password`,
      data,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: handleChangePas,
    onSuccess: () => {
      toast.success("Password changed successfully!");
      reset();
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const settingsMenu = [
    { id: "password", label: "Password & Security", icon: FaKey, active: true },
    { id: "account", label: "Account Settings", icon: FaUserCog },
  ];

  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <div className="max-w-6xl mx-auto pb-20 md:pb-10 px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-1/3 xl:w-1/4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <img
                    src={LogData?.data?.data?.user?.photo}
                    alt="User"
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">
                      {LogData?.data?.data?.user?.name}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      Personal Settings
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-3">
                {settingsMenu.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                      item.active
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={`text-lg ${item.active ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`}
                      />
                      <span className="font-semibold text-sm">
                        {item.label}
                      </span>
                    </div>
                    {item.active && (
                      <FaChevronRight className="text-xs opacity-70" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  to="/home"
                  className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                >
                  <FaArrowLeft />
                </Link>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    Change Password
                  </h1>
                  <p className="text-gray-500 text-sm">
                    Update your credentials to stay protected
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FaShieldAlt className="text-xl" />
              </div>
            </div>

            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8">
                <form
                  className="space-y-6 max-w-2xl"
                  onSubmit={handleSubmit((data) => mutate(data))}
                >
                  {/* Current Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      Current Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaLock
                          className={`text-gray-300 transition-colors ${errors.password ? "text-red-400" : "group-focus-within:text-blue-500"}`}
                        />
                      </div>
                      <input
                        {...register("password")}
                        type={showPass ? "text" : "password"}
                        placeholder="••••••••"
                        className={`w-full pl-11 pr-12 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:ring-4 transition-all placeholder-gray-300 outline-none ${
                          errors.password
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-transparent focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="h-px bg-gray-100 my-2" />

                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">
                      New Password
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaKey
                          className={`text-gray-300 transition-colors ${errors.newPassword ? "text-red-400" : "group-focus-within:text-blue-500"}`}
                        />
                      </div>
                      <input
                        {...register("newPassword")}
                        type={showPass ? "text" : "password"}
                        placeholder="Minimum 8 characters"
                        className={`w-full pl-11 pr-12 py-4 bg-gray-50 border-2 rounded-2xl focus:bg-white focus:ring-4 transition-all placeholder-gray-300 outline-none ${
                          errors.newPassword
                            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
                            : "border-transparent focus:border-blue-500 focus:ring-blue-500/10"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPass ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="flex-1 py-4 px-8 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <>
                          <FontAwesomeIcon icon={faSpinner} spin />
                          <span>Updating...</span>
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Security Tip Footer */}
              <div className="bg-gray-50 p-6 flex items-start gap-4">
                <div className="bg-amber-100 text-amber-600 p-3 rounded-xl">
                  <FaQuestionCircle className="text-lg" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-gray-900 text-sm">
                    Security Recommendation
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-lg">
                    Use a combination of uppercase letters, numbers, and symbols
                    to ensure your account remains secure. Avoid using common
                    phrases or personal dates.
                  </p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
