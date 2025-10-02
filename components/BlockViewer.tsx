import { QuizBlock } from '@/types/quiz';
import { Button } from '@/components/shared/Button';

interface BlockViewerProps {
  block: QuizBlock;
}

export function BlockViewer({ block }: BlockViewerProps) {
  const renderQuestionContent = () => {
    const questionType = block.properties?.questionType || 'single';
    
    switch (questionType) {
      case 'single':
        return (
          <div className="space-y-2 mt-3">
            {block.properties?.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="radio" name={`question-${block.id}`} className="w-4 h-4 cursor-pointer" />
                <span className="cursor-pointer">{option || `Option ${index + 1}`}</span>
              </label>
            ))}
          </div>
        );
      
      case 'multi':
        return (
          <div className="space-y-2 mt-3">
            {block.properties?.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 cursor-pointer" />
                <span className="cursor-pointer">{option || `Option ${index + 1}`}</span>
              </label>
            ))}
          </div>
        );
      
      case 'text':
        return (
          <textarea 
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 cursor-text mt-3"
            rows={4}
            placeholder="Type your answer here..."
          />
        );
      
      default:
        return null;
    }
  };

  switch (block.type) {
    case 'heading':
      return <h1 className="text-3xl font-bold text-center mb-6">{block.content}</h1>;
    
    case 'question':
      return (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">{block.content}</h3>
          {renderQuestionContent()}
        </div>
      );
    
    case 'button':
      return (
        <Button
          variant="primary"
          className="w-full py-3 mb-6 text-lg"
        >
          {block.content || 'Next'}
        </Button>
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