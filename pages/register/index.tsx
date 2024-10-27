"use client";
import { useAuth } from "@/context/AuthContext";
import RegisterForm from "@/components/RegisterForm";
import { useRouter } from "next/navigation";

export default function Register() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  if (isLoggedIn) {
    router.replace("/");
  }

  return <RegisterForm />;
}
