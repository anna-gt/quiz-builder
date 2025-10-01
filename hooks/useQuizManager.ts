import { useState, useEffect } from 'react';
import { Quiz, QuizBlock } from '@/types/quiz';
import { QuizStorage } from '@/lib/quizStorage';

export function useQuizManager() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = () => {
    setLoading(true);
    const allQuizzes = QuizStorage.getAllQuizzes();
    setQuizzes(allQuizzes);
    setLoading(false);
  };

  const createQuiz = (title: string = 'New Quiz'): Quiz => {
    const newQuiz: Quiz = {
      id: crypto.randomUUID(),
      title,
      blocks: [],
      published: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    QuizStorage.saveQuiz(newQuiz);
    loadQuizzes();
    return newQuiz;
  };

  const updateQuiz = (quizId: string, updates: Partial<Quiz>): void => {
    const existingQuiz = QuizStorage.getQuiz(quizId);
    if (!existingQuiz) return;

    const updatedQuiz: Quiz = {
      ...existingQuiz,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    QuizStorage.saveQuiz(updatedQuiz);
    loadQuizzes();
  };

  const saveQuizBlocks = (quizId: string, blocks: QuizBlock[]): void => {
    updateQuiz(quizId, { blocks });
  };

  const publishQuiz = (quizId: string): void => {
    updateQuiz(quizId, { published: true });
  };

  const unpublishQuiz = (quizId: string): void => {
    updateQuiz(quizId, { published: false });
  };

  const deleteQuiz = (quizId: string): void => {
    QuizStorage.deleteQuiz(quizId);
    loadQuizzes();
  };

  return {
    quizzes,
    loading,
    createQuiz,
    updateQuiz,
    saveQuizBlocks,
    publishQuiz,
    unpublishQuiz,
    deleteQuiz,
    refreshQuizzes: loadQuizzes,
  };
}