import { QuizBlock } from '@/types/quiz';
import { useState, useCallback } from 'react';

export const useQuizEditor = (initialBlocks: QuizBlock[] = []) => {
  const [state, setState] = useState({
    blocks: initialBlocks,
    selectedBlockId: null as string | null,
  });

  const setBlocks = useCallback((newBlocks: QuizBlock[]) => {
    setState(prev => ({
      ...prev,
      blocks: newBlocks,
    }));
  }, []);

  const addBlock = useCallback((type: QuizBlock['type'], index?: number) => {
    const newBlock: QuizBlock = {
      id: crypto.randomUUID(),
      type,
      content: '',
      properties: type === 'question' ? { questionType: 'single', options: [''] } : undefined,
    };

    setState(prev => {
      const newBlocks = [...prev.blocks];
      const insertIndex = index !== undefined ? index : newBlocks.length;
      newBlocks.splice(insertIndex, 0, newBlock);
      return { ...prev, blocks: newBlocks, selectedBlockId: newBlock.id };
    });
  }, []);

  const updateBlock = useCallback((blockId: string, updates: Partial<QuizBlock>) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === blockId ? { ...block, ...updates } : block
      ),
    }));
  }, []);

  const deleteBlock = useCallback((blockId: string) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks.filter(block => block.id !== blockId),
      selectedBlockId: prev.selectedBlockId === blockId ? null : prev.selectedBlockId,
    }));
  }, []);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setState(prev => {
      const newBlocks = [...prev.blocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  const selectBlock = useCallback((blockId: string | null) => {
    setState(prev => ({ ...prev, selectedBlockId: blockId }));
  }, []);

  return {
    blocks: state.blocks,
    selectedBlockId: state.selectedBlockId,
    setBlocks,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    selectBlock,
  };
};