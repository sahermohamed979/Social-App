import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useMutation } from "@tanstack/react-query";
export default function LoginHook() {
  let { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  let schema = z.object({
    email: z.email("invalid mail"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "The password that you've entered is incorrect",
      ),
  });

  let FormData = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: handleLogin,

    onSuccess: (data) => {
      toast.success("Login successful! Redirecting...");
      setUser(data.data.token);
      localStorage.setItem("token", data.data.token);
      setTimeout(() => {
        navigate("/Home");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error);
      setError(error.response?.data?.error);
    },
  });
  function handleLogin(values) {
    return axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values,
    );
  }

  return { FormData, mutate, isPending, error };
}
