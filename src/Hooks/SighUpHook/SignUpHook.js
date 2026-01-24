import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { useMutation } from "@tanstack/react-query";
export default function SignUpHook() {
  let navigate = useNavigate();

  let schema = z
    .object({
      name: z
        .string()
        .min(3, "min length must be 3 chars")
        .max(15, "max length must be 15 chars"),
      email: z.email("invalid mail"),
      password: z
        .string()
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "password must start with capital letter , then numbers....",
        ),
      rePassword: z.string(),
      dateOfBirth: z
        .string()
        .regex(
          /^\d{4}-\d{2}-\d{2}$/,
          "Invalid date format, expected YYYY-MM-DD",
        )
        .refine((date) => {
          const userDate = new Date(date); // user Date
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return now > userDate;
        }, "can't enter futere date"),

      gender: z.enum(
        ["male", "female"],
        "gender must be one of male or female",
      ),
    })
    .refine((obj) => obj.password === obj.rePassword, {
      error: "password and repassord must be same",
      path: ["rePassword"],
    });

  let FormData = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleSighup,

    onSuccess: () => {
      toast.success("Signup successful! Please log in.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.error);
    },
  });
  function handleSighup(values) {
    return axios.post(
      "https://linked-posts.routemisr.com/users/signup",
      values,
    );
  }

  return { FormData, mutate, isPending };
}
