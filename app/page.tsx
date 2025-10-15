"use client";

import { QuizList } from "@/components/QuizList";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { useConfirmation } from "@/hooks/useConfirmation";
import { useQuizManager } from "@/hooks/useQuizManager";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { quizzes, loading, createQuiz, deleteQuiz } = useQuizManager();

  const {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  } = useConfirmation();

  const handleCreateQuiz = () => {
    const newQuiz = createQuiz();
    router.push(`/quiz/edit/${newQuiz.id}`);
  };

  const handleDeleteQuiz = (id: string) => {
    const quizToDelete = quizzes.find((quiz) => quiz.id === id);
    showConfirmation(
      "Delete Quiz",
      `Are you sure you want to delete "${
        quizToDelete?.title || "this quiz"
      }"? This action cannot be undone.`,
      () => deleteQuiz(id)
    );
  };

  return (
    <>
      <QuizList
        quizzes={quizzes}
        onCreateQuiz={handleCreateQuiz}
        onDeleteQuiz={handleDeleteQuiz}
        loading={loading}
      />

      <ConfirmationDialog
        isOpen={confirmationState.isOpen}
        title={confirmationState.title}
        message={confirmationState.message}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={hideConfirmation}
      />
    </>
  );
}
