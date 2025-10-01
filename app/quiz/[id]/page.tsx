'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Quiz, QuizBlock } from '@/types/quiz';
import { QuizStorage } from '@/lib/quizStorage';

function BlockViewer({ block }: { block: QuizBlock }) {
  switch (block.type) {
    case 'heading':
      return <h1 className="text-3xl font-bold text-center mb-6">{block.content}</h1>;
    
    case 'question':
      return (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">{block.content}</h3>
          
          {block.properties?.questionType === 'single' && (
            <div className="space-y-2">
              {block.properties.options?.map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name={`question-${block.id}`} className="w-4 h-4" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {block.properties?.questionType === 'multi' && (
            <div className="space-y-2">
              {block.properties.options?.map((option, index) => (
                <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          )}
          
          {block.properties?.questionType === 'text' && (
            <textarea 
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              rows={4}
              placeholder="Type your answer here..."
            />
          )}
        </div>
      );
    
    case 'button':
      return (
        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-6">
          {block.content || 'Next'}
        </button>
      );
    
    case 'footer':
      return (
        <footer className="text-center text-gray-600 text-sm mt-8">
          {block.content}
        </footer>
      );
    
    default:
      return null;
  }
}

export default function ViewQuizPage() {
  const params = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  const quizId = params.id as string;

  useEffect(() => {
    const existingQuiz = QuizStorage.getQuiz(quizId);
    if (!existingQuiz) {
      router.push('/');
      return;
    }
    setQuiz(existingQuiz);
    setLoading(false);
  }, [quizId, router]);

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
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!quiz.published) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Quiz Not Published</h1>
          <p className="text-gray-600 mb-6">This quiz hasn&apos;t been published yet.</p>
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