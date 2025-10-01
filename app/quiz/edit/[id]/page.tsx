'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Quiz } from '@/types/quiz';
import { QuizStorage } from '@/lib/quizStorage';
import { QuizEditor } from '@/components/QuizEditor';

export default function EditQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const quizId = params.id as string;

  useEffect(() => {
    if (quizId === 'new') {
      const newQuiz: Quiz = {
        id: crypto.randomUUID(),
        title: 'New Quiz',
        blocks: [],
        published: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setQuiz(newQuiz);
      setLoading(false);
    } else {
      const existingQuiz = QuizStorage.getQuiz(quizId);
      if (!existingQuiz) {
        router.push('/');
        return;
      }
      setQuiz(existingQuiz);
      setLoading(false);
    }
  }, [quizId, router]);

  const handleSave = (updatedQuiz: Quiz, blocks: Quiz['blocks']) => {
    const quizToSave: Quiz = {
      ...updatedQuiz,
      blocks,
      updatedAt: new Date().toISOString(),
    };
    QuizStorage.saveQuiz(quizToSave);
    setQuiz(quizToSave);
  };

  const handlePublish = (quizToPublish: Quiz) => {
    const publishedQuiz: Quiz = {
      ...quizToPublish,
      published: !quizToPublish.published,
      updatedAt: new Date().toISOString(),
    };
    QuizStorage.saveQuiz(publishedQuiz);
    setQuiz(publishedQuiz);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz not found</h1>
          <button
            onClick={() => router.push('/')}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <QuizEditor
      quiz={quiz}
      onSave={handleSave}
      onPublish={handlePublish}
    />
  );
}