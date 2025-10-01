import { Quiz } from '@/types/quiz';

interface EditorHeaderProps {
  quiz: Quiz;
  onUpdateQuiz: (updates: Partial<Quiz>) => void;
  onPublish: () => void;
  onSave: () => void;
}

export function EditorHeader({ quiz, onUpdateQuiz, onPublish, onSave }: EditorHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => onUpdateQuiz({ title: e.target.value })}
            className="text-2xl font-bold border-none outline-none bg-transparent w-full max-w-md"
            placeholder="Quiz Title"
          />
          
          <span className={`px-2 py-1 text-xs rounded-full ${
            quiz.published 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {quiz.published ? 'Published' : 'Draft'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Last updated: {new Date(quiz.updatedAt).toLocaleDateString()}
          </span>
          
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          
          <button
            onClick={onPublish}
            className={`px-4 py-2 rounded-lg transition-colors ${
              quiz.published
                ? 'bg-gray-500 text-white hover:bg-gray-600'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            {quiz.published ? 'Unpublish' : 'Publish'}
          </button>
        </div>
      </div>
    </header>
  );
}