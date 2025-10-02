"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Quiz } from "@/types/quiz";
import { QuizStorage } from "@/lib/quizStorage";
import { BlockViewer } from "@/components/BlockViewer";
import { Loader } from "@/components/shared/Loader";
import { NotFound } from "@/components/shared/NotFound";

export default function ViewQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const quizId = params.id as string;

  useEffect(() => {
    const existingQuiz = QuizStorage.getQuiz(quizId);
    if (!existingQuiz) {
      router.push("/");
      return;
    }
    setQuiz(existingQuiz);
    setIsLoading(false);
  }, [quizId, router]);

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

  if (!quiz.published) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Quiz Not Published</h1>
          <p className="text-gray-600 mb-6">
            This quiz hasn&apos;t been published yet.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
            <Link href={`/quiz/edit/${quiz.id}`} className="btn-primary">
              Edit Quiz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          </div>

          <div className="space-y-6">
            {quiz.blocks.map((block) => (
              <BlockViewer key={block.id} block={block} />
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to All Quizzes
          </Link>
        </div>
      </div>
    </div>
  );
}
