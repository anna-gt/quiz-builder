'use client';

import { QuizList } from '@/components/QuizList';
import { useQuizManager } from '@/hooks/useQuizManager';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const {
    quizzes,
    loading,
    createQuiz,
    deleteQuiz,
  } = useQuizManager();

  const handleCreateQuiz = () => {
    const newQuiz = createQuiz();
    router.push(`/quiz/edit/${newQuiz.id}`);
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(id);
    }
  };

  return (
    <QuizList
      quizzes={quizzes}
      onCreateQuiz={handleCreateQuiz}
      onDeleteQuiz={handleDeleteQuiz}
      loading={loading}
    />
  );
}