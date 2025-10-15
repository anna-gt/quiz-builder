import { useConfirmation } from "@/hooks/useConfirmation";
import { QuizBlock } from "@/types/quiz";
import { Input } from "./shared/Input";
import { Button } from "./shared/Button";
import { ConfirmationDialog } from "./shared/ConfirmationDialog";
import { useEffect } from "react";

interface PropertiesPanelProps {
  selectedBlock: QuizBlock | null;
  onUpdateBlock: (updates: Partial<QuizBlock>) => void;
}

export function PropertiesPanel({
  selectedBlock,
  onUpdateBlock,
}: PropertiesPanelProps) {
  const {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  } = useConfirmation();

  useEffect(() => {
    if (selectedBlock?.type === 'question' && !selectedBlock.properties) {
      onUpdateBlock({
        properties: {
          questionType: 'single',
          options: ['Option 1']
        }
      });
    }
  }, [selectedBlock, onUpdateBlock]);

  if (!selectedBlock) {
    return (
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 flex items-center justify-center">
        <p className="text-gray-500">Select a block to edit properties</p>
      </div>
    );
  }

  const getContentLabel = () => {
    switch (selectedBlock.type) {
      case "heading":
        return "Title";
      case "question":
        return "Question";
      case "button":
        return "Button Text";
      case "footer":
        return "Footer Text";
      default:
        return "Content";
    }
  };

  const handleRemoveOption = (indexToRemove: number) => {
    if (!selectedBlock?.properties?.options) return;

    const optionText =
      selectedBlock.properties.options[indexToRemove] ||
      `Option ${indexToRemove + 1}`;

    showConfirmation(
      "Remove Option",
      `Are you sure you want to remove "${optionText}"?`,
      () => {
        const newOptions = selectedBlock.properties!.options!.filter(
          (_, index) => index !== indexToRemove
        );
        onUpdateBlock({
          properties: {
            ...selectedBlock.properties,
            options: newOptions.length > 0 ? newOptions : [""],
          },
        });
      }
    );
  };

  const handleAddOption = () => {
    const newOptions = [...(selectedBlock?.properties?.options || []), ""];
    onUpdateBlock({
      properties: {
        ...selectedBlock?.properties,
        options: newOptions,
      },
    });
  };

  const handleUpdateOption = (index: number, value: string) => {
    const newOptions = [...(selectedBlock?.properties?.options || [])];
    newOptions[index] = value;
    onUpdateBlock({
      properties: {
        ...selectedBlock?.properties,
        options: newOptions,
      },
    });
  };

  const handleChangeQuestionType = (
    questionType: "single" | "multi" | "text"
  ) => {
    onUpdateBlock({
      properties: {
        ...selectedBlock?.properties,
        questionType,
        options: questionType === 'text' ? [] : selectedBlock.properties?.options || ['']
      },
    });
  };

  const handleChangeContent = (content: string) => {
    onUpdateBlock({ content });
  };

  return (
    <>
      <div className="w-80 bg-gray-50 border-l border-gray-200 p-4">
        <h3 className="font-semibold text-lg mb-4">Block Properties</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getContentLabel()}
            </label>
            <Input
              value={selectedBlock.content}
              onChange={(e) => handleChangeContent(e.target.value)}
              placeholder={`Enter ${getContentLabel().toLowerCase()}...`}
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
                  onChange={(e) => handleChangeQuestionType(e.target.value as "single" | "multi" | "text")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="single">Single Choice</option>
                  <option value="multi">Multiple Choice</option>
                  <option value="text">Text Answer</option>
                </select>
              </div>

              {(selectedBlock.properties?.questionType === "single" ||
                selectedBlock.properties?.questionType === "multi") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Options
                  </label>
                  <div className="space-y-2">
                    {selectedBlock.properties?.options?.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) =>
                            handleUpdateOption(index, e.target.value)
                          }
                          placeholder={`Option ${index + 1}`}
                        />
                        <Button
                          onClick={() => handleRemoveOption(index)}
                          disabled={selectedBlock.properties?.options?.length === 1}
                          variant="danger"
                          className="px-2 flex-shrink-0"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={handleAddOption}
                      variant="primary"
                      className="w-full"
                    >
                      Add Option
                    </Button>
                  </div>
                </div>
              )}

              {selectedBlock.properties?.questionType === "text" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-700">
                    Users will be able to type their answer in a text field.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmationDialog
        isOpen={confirmationState.isOpen}
        title={confirmationState.title}
        message={confirmationState.message}
        onConfirm={handleConfirm}
        onCancel={hideConfirmation}
      />
    </>
  );
}