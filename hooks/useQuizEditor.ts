import { QuizBlock } from "@/types/quiz";
import { useState, useCallback } from "react";

export const useQuizEditor = (initialBlocks: QuizBlock[] = []) => {
  const [state, setState] = useState({
    blocks: initialBlocks,
    selectedBlockId: null as string | null,
  });

  const handleSetBlocks = useCallback((newBlocks: QuizBlock[]) => {
    setState((prev) => ({
      ...prev,
      blocks: newBlocks,
    }));
  }, []);

  const handleAddBlock = useCallback(
    (type: QuizBlock["type"], index?: number) => {
      const baseBlock: Omit<QuizBlock, "id"> = {
        type,
        content: "",
      };

      if (type === "question") {
        baseBlock.properties = {
          questionType: "single",
          options: ["Option 1"],
        };
      }

      const newBlock: QuizBlock = {
        id: crypto.randomUUID(),
        ...baseBlock,
      };

      setState((prev) => {
        const newBlocks = [...prev.blocks];
        const insertIndex = index !== undefined ? index : newBlocks.length;
        newBlocks.splice(insertIndex, 0, newBlock);
        return { ...prev, blocks: newBlocks, selectedBlockId: newBlock.id };
      });
    },
    []
  );

  const handleInsertBlock = useCallback(
    (type: QuizBlock["type"], index: number) => {
      handleAddBlock(type, index);
    },
    [handleAddBlock]
  );

  const handleUpdateBlock = useCallback(
    (blockId: string, updates: Partial<QuizBlock>) => {
      setState((prev) => ({
        ...prev,
        blocks: prev.blocks.map((block) =>
          block.id === blockId ? { ...block, ...updates } : block
        ),
      }));
    },
    []
  );

  const handleDeleteBlock = useCallback((blockId: string) => {
    setState((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((block) => block.id !== blockId),
      selectedBlockId:
        prev.selectedBlockId === blockId ? null : prev.selectedBlockId,
    }));
  }, []);

  const handleMoveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setState((prev) => {
      const newBlocks = [...prev.blocks];
      const [movedBlock] = newBlocks.splice(fromIndex, 1);
      newBlocks.splice(toIndex, 0, movedBlock);
      return { ...prev, blocks: newBlocks };
    });
  }, []);

  const handleSelectBlock = useCallback((blockId: string | null) => {
    setState((prev) => ({ ...prev, selectedBlockId: blockId }));
  }, []);

  return {
    blocks: state.blocks,
    selectedBlockId: state.selectedBlockId,
    onAddBlock: handleAddBlock,
    onInsertBlock: handleInsertBlock,
    onUpdateBlock: handleUpdateBlock,
    onDeleteBlock: handleDeleteBlock,
    onMoveBlock: handleMoveBlock,
    onSelectBlock: handleSelectBlock,
    onSetBlocks: handleSetBlocks,
  };
};
