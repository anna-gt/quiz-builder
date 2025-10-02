"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useQuizEditor } from "@/hooks/useQuizEditor";
import { useConfirmation } from "@/hooks/useConfirmation";
import { BlockPalette } from "./BlockPalette";
import { Canvas } from "./Canvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { EditorHeader } from "./EditorHeader";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Quiz, QuizBlock } from "@/types/quiz";

interface QuizEditorProps {
  quiz: Quiz;
  onSave: (quiz: Quiz, blocks: QuizBlock[]) => void;
  onPublish: (quiz: Quiz) => void;
}

export function QuizEditor({ quiz, onSave, onPublish }: QuizEditorProps) {
  const router = useRouter();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingTitle, setPendingTitle] = useState(quiz.title);
  const [lastSavedState, setLastSavedState] = useState({
    title: quiz.title,
    blocks: quiz.blocks,
    published: quiz.published,
  });

  const {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  } = useConfirmation();

  const {
    blocks,
    selectedBlockId,
    onAddBlock,
    onInsertBlock,
    onUpdateBlock,
    onDeleteBlock,
    onMoveBlock,
    onSelectBlock,
    onSetBlocks,
  } = useQuizEditor(quiz.blocks);

  useEffect(() => {
    onSetBlocks(quiz.blocks);
    setPendingTitle(quiz.title);
    setLastSavedState({
      title: quiz.title,
      blocks: quiz.blocks,
      published: quiz.published,
    });
    setHasUnsavedChanges(false);
  }, [quiz.id, quiz.blocks, quiz.title, quiz.published, onSetBlocks]);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(blocks) !== JSON.stringify(lastSavedState.blocks) ||
      pendingTitle !== lastSavedState.title;

    setHasUnsavedChanges(hasChanges);
  }, [blocks, pendingTitle, lastSavedState]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.source.droppableId !== result.destination.droppableId) {
      const blockType = result.draggableId as QuizBlock["type"];
      onInsertBlock(blockType, result.destination.index);
    } else {
      onMoveBlock(result.source.index, result.destination.index);
    }
  };

  const selectedBlock =
    blocks.find((block) => block.id === selectedBlockId) || null;

  const handleSave = () => {
    const quizToSave: Quiz = {
      ...quiz,
      title: pendingTitle,
      blocks,
      updatedAt: new Date().toISOString(),
    };

    onSave(quizToSave, blocks);

    setLastSavedState({
      title: pendingTitle,
      blocks: [...blocks],
      published: quiz.published,
    });

    setHasUnsavedChanges(false);
  };

  const handlePublish = () => {
    const action = quiz.published ? "unpublish" : "publish";
    const actionText = quiz.published ? "Unpublish" : "Publish";

    showConfirmation(
      `${actionText} Quiz`,
      `Are you sure you want to ${action} "${pendingTitle}"?`,
      () => {
        const updatedQuiz: Quiz = {
          ...quiz,
          title: pendingTitle,
          blocks,
          published: !quiz.published,
          updatedAt: new Date().toISOString(),
        };

        onPublish(updatedQuiz);

        setLastSavedState({
          title: pendingTitle,
          blocks: [...blocks],
          published: updatedQuiz.published,
        });

        setHasUnsavedChanges(false);
      }
    );
  };

  const handleUpdateQuiz = (updates: Partial<Quiz>) => {
    if (updates.title !== undefined) {
      setPendingTitle(updates.title);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      showConfirmation(
        "Unsaved Changes",
        "You have unsaved changes. Are you sure you want to leave?",
        () => router.push("/")
      );
    } else {
      router.push("/");
    }
  };

  const handleDeleteBlock = (blockId: string) => {
    const blockToDelete = blocks.find((block) => block.id === blockId);
    showConfirmation(
      "Delete Block",
      `Are you sure you want to delete this ${blockToDelete?.type} block?`,
      () => onDeleteBlock(blockId)
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col h-screen bg-white">
        <EditorHeader
          quiz={{ ...quiz, title: pendingTitle }}
          onUpdateQuiz={handleUpdateQuiz}
          onSave={handleSave}
          onPublish={handlePublish}
          onCancel={handleCancel}
        />

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
          <div className="md:w-64 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
            <BlockPalette onAddBlock={onAddBlock} />
          </div>

          <div className="flex-1 overflow-auto">
            <Canvas
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={onSelectBlock}
              onDeleteBlock={handleDeleteBlock}
            />
          </div>

          <div className="md:w-80 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200">
            <PropertiesPanel
              selectedBlock={selectedBlock}
              onUpdateBlock={(updates) => {
                if (selectedBlockId) {
                  onUpdateBlock(selectedBlockId, updates);
                }
              }}
            />
          </div>
        </div>
      </div>

      <ConfirmationDialog
        isOpen={confirmationState.isOpen}
        title={confirmationState.title}
        message={confirmationState.message}
        onConfirm={handleConfirm}
        onCancel={hideConfirmation}
      />
    </DragDropContext>
  );
}
