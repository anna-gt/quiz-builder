'use client';

import { useEffect } from 'react';
import { useQuizEditor } from '@/hooks/useQuizEditor';
import { BlockPalette } from './BlockPalette';
import { Canvas } from './Canvas';
import { PropertiesPanel } from './PropertiesPanel';
import { EditorHeader } from './EditorHeader';
import { Quiz, QuizBlock } from '@/types/quiz';

interface QuizEditorProps {
  quiz: Quiz;
  onSave: (quiz: Quiz, blocks: QuizBlock[]) => void;
  onPublish: (quiz: Quiz) => void;
}

export function QuizEditor({ quiz, onSave, onPublish }: QuizEditorProps) {
  const {
    blocks,
    selectedBlockId,
    setBlocks,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    selectBlock,
  } = useQuizEditor(quiz.blocks);

  useEffect(() => {
    setBlocks(quiz.blocks);
  }, [quiz.id, quiz.blocks, setBlocks]);

  const selectedBlock = blocks.find(block => block.id === selectedBlockId) || null;

  const handleSave = () => {
    onSave(quiz, blocks);
  };

  const handlePublish = () => {
    onPublish(quiz);
  };

  const handleUpdateQuiz = (updates: Partial<Quiz>) => {
    onSave({ ...quiz, ...updates }, blocks);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <EditorHeader
        quiz={quiz}
        onUpdateQuiz={handleUpdateQuiz}
        onSave={handleSave}
        onPublish={handlePublish}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <BlockPalette onAddBlock={addBlock} />
        
        <Canvas
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={selectBlock}
          onMoveBlock={moveBlock}
          onDeleteBlock={deleteBlock}
        />
        
        <PropertiesPanel
          selectedBlock={selectedBlock}
          onUpdateBlock={(updates) => {
            if (selectedBlockId) {
              updateBlock(selectedBlockId, updates);
            }
          }}
        />
      </div>
    </div>
  );
}