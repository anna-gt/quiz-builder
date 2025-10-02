"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Quiz } from "@/types/quiz";
import { QuizStorage } from "@/lib/quizStorage";
import { QuizEditor } from "@/components/QuizEditor";
import { Loader } from "@/components/shared/Loader";
import { NotFound } from "@/components/shared/NotFound";

export default function EditQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const quizId = params.id as string;

  useEffect(() => {
    const handleLoadQuiz = () => {
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
        setIsLoading(false);
      } else {
        const existingQuiz = QuizStorage.getQuiz(quizId);
        if (!existingQuiz) {
          router.push('/');
          return;
        }
        setQuiz(existingQuiz);
        setIsLoading(false);
      }
    };

    handleLoadQuiz();
  }, [quizId, router]);

  const handleSaveQuiz = (updatedQuiz: Quiz, blocks: Quiz['blocks']) => {
    const quizToSave: Quiz = {
      ...updatedQuiz,
      blocks,
      updatedAt: new Date().toISOString(),
    };
    QuizStorage.saveQuiz(quizToSave);
    setQuiz(quizToSave);
  };

  const handlePublishQuiz = (quizToPublish: Quiz) => {
    const publishedQuiz: Quiz = {
      ...quizToPublish,
      updatedAt: new Date().toISOString(),
    };
    QuizStorage.saveQuiz(publishedQuiz);
    setQuiz(publishedQuiz);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  if (!quiz) {
    return <NotFound />;
  }

  return (
    <QuizEditor
      quiz={quiz}
      onSave={handleSaveQuiz}
      onPublish={handlePublishQuiz}
    />
  );
}
