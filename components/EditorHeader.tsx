import { useState, useEffect } from 'react';
import { Quiz } from '@/types/quiz';
import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

interface EditorHeaderProps {
  quiz: Quiz;
  onUpdateQuiz: (updates: Partial<Quiz>) => void;
  onPublish: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function EditorHeader({ quiz, onUpdateQuiz, onPublish, onSave, onCancel }: EditorHeaderProps) {
  const [localTitle, setLocalTitle] = useState(quiz.title);

  useEffect(() => {
    setLocalTitle(quiz.title);
  }, [quiz.title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setLocalTitle(newTitle);
    onUpdateQuiz({ title: newTitle });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Input
            value={localTitle}
            onChange={handleTitleChange}
            className="text-lg sm:text-2xl font-bold flex-1 min-w-0"
            placeholder="Quiz Title"
          />
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
              quiz.published 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {quiz.published ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-gray-500 hidden sm:block">
            Updated: {new Date(quiz.updatedAt).toLocaleDateString()}
          </span>
          
          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="secondary"
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
            >
              Cancel
            </Button>
            
            <Button
              onClick={onSave}
              variant="primary"
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
            >
              Save
            </Button>
            
            <Button
              onClick={onPublish}
              variant={quiz.published ? "secondary" : "primary"}
              className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
            >
              {quiz.published ? 'Unpublish' : 'Publish'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}