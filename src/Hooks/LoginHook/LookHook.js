import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
export default function LoginHook() {
  let { setUser } = useContext(AuthContext);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  let schema = z.object({
    email: z.email("invalid mail"),
    password: z
      .string()
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "The password that you've entered is incorrect"
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

  async function handleLogin(values) {
    try {
      setIsloading(true);

      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signin",
        values
      );
      setUser(data.token);
      localStorage.setItem("token", data.token);
      if (data.message === "success") {
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/Home");
        }, 1000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error);
      setError(error.response?.data?.error);
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  return { FormData, handleLogin, isloading, error };
}
