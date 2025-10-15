import { QuizBlock } from "@/types/quiz";
import { Button } from "./shared/Button";
import { Input } from "./shared/Input";

interface BlockRendererProps {
  block: QuizBlock;
  isEditing: boolean;
  onUpdate?: (updates: Partial<QuizBlock>) => void;
}

export function BlockRenderer({
  block,
  isEditing,
  onUpdate,
}: BlockRendererProps) {
  const handleContentClick = (e: React.MouseEvent) => {
    if (!isEditing && window.innerWidth >= 854) {
      e.preventDefault();
    }
  };

  const renderQuestionPreview = () => {
    const questionType = block.properties?.questionType || "single";

    switch (questionType) {
      case "single":
        return (
          <div className="space-y-2 bg-gray-50 p-3 rounded border mt-3">
            <p className="text-sm text-gray-600 mb-2">Single Choice Preview:</p>
            {block.properties?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-grab"
              >
                <input
                  type="radio"
                  name={`preview-${block.id}`}
                  className="w-4 h-4 cursor-grab"
                  readOnly
                />
                <span className="cursor-grab">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
            {(!block.properties?.options ||
              block.properties.options.length === 0) && (
              <p className="text-sm text-gray-400">No options added yet</p>
            )}
          </div>
        );

      case "multi":
        return (
          <div className="space-y-2 bg-gray-50 p-3 rounded border mt-3">
            <p className="text-sm text-gray-600 mb-2">
              Multiple Choice Preview:
            </p>
            {block.properties?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-grab"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 cursor-grab"
                  readOnly
                />
                <span className="cursor-grab">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
            {(!block.properties?.options ||
              block.properties.options.length === 0) && (
              <p className="text-sm text-gray-400">No options added yet</p>
            )}
          </div>
        );

      case "text":
        return (
          <div className="bg-gray-50 p-3 rounded border mt-3">
            <p className="text-sm text-gray-600 mb-2">Text Answer Preview:</p>
            <textarea
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 cursor-grab bg-white"
              rows={3}
              placeholder="User will type answer here..."
              readOnly
            />
          </div>
        );

      default:
        return null;
    }
  };

  const renderQuestionView = () => {
    const questionType = block.properties?.questionType || "single";

    switch (questionType) {
      case "single":
        return (
          <div className="space-y-2 mt-3">
            {block.properties?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-grab"
              >
                <input
                  type="radio"
                  name={`question-${block.id}`}
                  className="w-4 h-4 cursor-grab"
                />
                <span className="cursor-grab">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
          </div>
        );

      case "multi":
        return (
          <div className="space-y-2 mt-3">
            {block.properties?.options?.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-2 cursor-grab"
              >
                <input type="checkbox" className="w-4 h-4 cursor-grab" />
                <span className="cursor-grab">
                  {option || `Option ${index + 1}`}
                </span>
              </label>
            ))}
          </div>
        );

      case "text":
        return (
          <textarea
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 cursor-grab mt-3"
            rows={4}
            placeholder="Type your answer here..."
          />
        );

      default:
        return null;
    }
  };

  const handleContentChange = (content: string) => {
    onUpdate?.({ content });
  };

  const renderContent = () => {
    switch (block.type) {
      case "heading":
        return isEditing ? (
          <Input
            value={block.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Enter heading..."
            className="text-2xl font-bold"
            onClick={handleContentClick}
          />
        ) : (
          <h2
            className="text-2xl font-bold cursor-grab"
            onClick={handleContentClick}
          >
            {block.content || "Heading"}
          </h2>
        );

      case "question":
        return (
          <div onClick={handleContentClick}>
            {isEditing ? (
              <>
                <Input
                  value={block.content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="Enter question..."
                  className="text-lg font-medium mb-3 cursor-grab"
                />
                {renderQuestionPreview()}
              </>
            ) : (
              <>
                <h3 className="text-lg font-medium cursor-grab">
                  {block.content || "Question"}
                </h3>
                {renderQuestionView()}
              </>
            )}
          </div>
        );

      case "button":
        return isEditing ? (
          <div className="space-y-3">
            <Input
              value={block.content}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Button text..."
              className="text-base"
            />
            <Button
              variant="primary"
              className="w-full"
              onClick={handleContentClick}
            >
              {block.content || "Button Preview"}
            </Button>
          </div>
        ) : (
          <Button
            variant="primary"
            className="w-full"
            onClick={handleContentClick}
          >
            {block.content || "Next"}
          </Button>
        );

      case "footer":
        return isEditing ? (
          <Input
            value={block.content}
            onChange={(e) => handleContentChange(e.target.value)}
            placeholder="Footer text..."
            className="text-sm text-gray-600"
            onClick={handleContentClick}
          />
        ) : (
          <p
            className="text-sm text-gray-600 cursor-grab"
            onClick={handleContentClick}
          >
            {block.content || "Footer text"}
          </p>
        );

      default:
        return null;
    }
  };

  return (
    <div className={"cursor-grab"}>
      {renderContent()}
    </div>
  );
}
