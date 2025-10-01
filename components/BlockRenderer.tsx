import { QuizBlock } from "@/types/quiz";

interface BlockRendererProps {
  block: QuizBlock;
  isSelected: boolean;
  onUpdate?: (updates: Partial<QuizBlock>) => void;
}

export function BlockRenderer({ block, isSelected, onUpdate }: BlockRendererProps) {
  const renderContent = () => {
    switch (block.type) {
      case 'heading':
        return isSelected ? (
          <input
            type="text"
            value={block.content}
            onChange={(e) => onUpdate?.({ content: e.target.value })}
            placeholder="Enter heading..."
            className="text-2xl font-bold w-full border-none outline-none bg-transparent"
          />
        ) : (
          <h2 className="text-2xl font-bold">{block.content || 'Heading'}</h2>
        );

      case 'question':
        return (
          <div className="space-y-3">
            {isSelected ? (
              <input
                type="text"
                value={block.content}
                onChange={(e) => onUpdate?.({ content: e.target.value })}
                placeholder="Enter question..."
                className="text-lg font-medium w-full border-b border-gray-300 outline-none bg-transparent"
              />
            ) : (
              <h3 className="text-lg font-medium">{block.content || 'Question'}</h3>
            )}
            
            {block.properties?.questionType === 'single' && (
              <div className="space-y-2">
                {block.properties.options?.map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input type="radio" name={`question-${block.id}`} />
                    {isSelected ? (
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...(block.properties?.options || [])];
                          newOptions[index] = e.target.value;
                          onUpdate?.({ properties: { ...block.properties, options: newOptions } });
                        }}
                        className="flex-1 border-b border-gray-300 outline-none"
                      />
                    ) : (
                      <span>{option || `Option ${index + 1}`}</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            {block.content || 'Next'}
          </button>
        );

      case 'footer':
        return isSelected ? (
          <input
            type="text"
            value={block.content}
            onChange={(e) => onUpdate?.({ content: e.target.value })}
            placeholder="Footer text..."
            className="text-sm text-gray-600 w-full border-none outline-none bg-transparent"
          />
        ) : (
          <p className="text-sm text-gray-600">{block.content || 'Footer text'}</p>
        );

      default:
        return null;
    }
  };

  return (
    <div className="cursor-move">
      {renderContent()}
    </div>
  );
}