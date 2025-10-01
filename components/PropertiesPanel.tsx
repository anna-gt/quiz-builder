import { QuizBlock } from "@/types/quiz";

interface PropertiesPanelProps {
  selectedBlock: QuizBlock | null;
  onUpdateBlock: (updates: Partial<QuizBlock>) => void;
}

export function PropertiesPanel({ selectedBlock, onUpdateBlock }: PropertiesPanelProps) {
  if (!selectedBlock) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 flex items-center justify-center">
        <p className="text-gray-500">Select a block to edit properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
      <h3 className="font-semibold text-lg mb-4">Block Properties</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <input
            type="text"
            value={selectedBlock.content}
            onChange={(e) => onUpdateBlock({ content: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {selectedBlock.type === 'question' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question Type
              </label>
              <select
                value={selectedBlock.properties?.questionType || 'single'}
                onChange={(e) => onUpdateBlock({
                  properties: {
                    ...selectedBlock.properties,
                    questionType: e.target.value as 'single' | 'multi' | 'text'
                  }
                })}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="single">Single Choice</option>
                <option value="multi">Multiple Choice</option>
                <option value="text">Text Answer</option>
              </select>
            </div>

            {(selectedBlock.properties?.questionType === 'single' || 
              selectedBlock.properties?.questionType === 'multi') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Options
                </label>
                <div className="space-y-2">
                  {selectedBlock.properties?.options?.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...(selectedBlock.properties?.options || [])];
                        newOptions[index] = e.target.value;
                        onUpdateBlock({
                          properties: {
                            ...selectedBlock.properties,
                            options: newOptions
                          }
                        });
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  ))}
                  <button
                    onClick={() => {
                      const newOptions = [...(selectedBlock.properties?.options || []), ''];
                      onUpdateBlock({
                        properties: {
                          ...selectedBlock.properties,
                          options: newOptions
                        }
                      });
                    }}
                    className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}