"use client";
import AdminForm from "@/components/AdminForm";
import QuizQuestions from "@/components/QuizQuestions";

export default function Admin() {
  return (
    <div className="py-6">
      <QuizQuestions />
      <AdminForm />
    </div>
  );
}
