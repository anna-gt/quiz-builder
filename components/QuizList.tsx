import Link from 'next/link';
import { Quiz } from '@/types/quiz';

interface QuizListProps {
  quizzes: Quiz[];
  onCreateQuiz: () => void;
  onDeleteQuiz: (id: string) => void;
  loading?: boolean;
}

export function QuizList({ quizzes, onCreateQuiz, onDeleteQuiz, loading }: QuizListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Quizzes</h1>
        <button
          onClick={onCreateQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Create Quiz
        </button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold mb-2">No quizzes yet</h2>
          <p className="text-gray-600 mb-4">Create your first quiz to get started</p>
          <button
            onClick={onCreateQuiz}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Your First Quiz
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{quiz.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      quiz.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quiz.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(quiz.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/quiz/edit/${quiz.id}`}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/quiz/${quiz.id}`}
                        className="text-green-600 hover:text-green-900 text-sm font-medium"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => onDeleteQuiz(quiz.id)}
                        className="text-red-600 hover:text-red-900 text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}