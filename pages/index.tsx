"use client";
import { useAuth } from "@/context/AuthContext";
import LoginForm from "@/components/LoginForm";
import Quiz from "@/components/Quiz";

export default function Home() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Quiz />;
  }

  return <LoginForm />;
}
