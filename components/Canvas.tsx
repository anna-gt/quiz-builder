'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import { BlockRenderer } from './BlockRenderer';
import { MobileWarning } from '@/components/shared/MobileWarning';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { Button } from '@/components/shared/Button';
import { QuizBlock } from '@/types/quiz';

interface CanvasProps {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onDeleteBlock: (blockId: string) => void;
}

export function Canvas({ 
  blocks, 
  selectedBlockId, 
  onSelectBlock, 
  onDeleteBlock,
}: CanvasProps) {
  const { isMobile } = useDragAndDrop();

  const handleSelectBlock = (blockId: string) => {
    onSelectBlock(blockId);
  };

  const handleDeleteBlock = (blockId: string) => {
    onDeleteBlock(blockId);
  };

  if (isMobile) {
    return (
      <div className="flex-1 bg-white p-4">
        <div className="max-w-2xl mx-auto">
          <MobileWarning />
          
          <div className="min-h-[400px] border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-4">
            {blocks.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-sm">Tap blocks above to add to your quiz</p>
              </div>
            ) : (
              blocks.map((block) => (
                <div
                  key={block.id}
                  className={`
                    relative group border-2 rounded-lg p-4 transition-all
                    ${selectedBlockId === block.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                  onClick={() => handleSelectBlock(block.id)}
                >
                  <BlockRenderer 
                    block={block} 
                    isEditing={false}
                  />
                  
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBlock(block.id);
                      }}
                      variant="danger"
                      size="sm"
                    >
                      Delete
                    </Button>
                    <span className="text-gray-400 text-xs">
                      {selectedBlockId === block.id ? '✓ Selected' : 'Tap to select'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <Droppable droppableId="canvas">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`
                min-h-[600px] border-2 rounded-lg p-4 space-y-4 transition-colors
                ${snapshot.isDraggingOver ? 'border-blue-300 bg-blue-50' : 'border-dashed border-gray-300'}
                ${blocks.length === 0 ? 'flex items-center justify-center' : ''}
              `}
            >
              {blocks.length === 0 && !snapshot.isDraggingOver ? (
                <div className="text-center text-gray-500 py-12">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg">Drag blocks here to start building your quiz</p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                          relative group border-2 rounded-lg p-4 transition-all cursor-grab
                          ${selectedBlockId === block.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-transparent hover:border-gray-300'
                          }
                          ${snapshot.isDragging ? 'shadow-lg rotate-2 cursor-grabbing' : ''}
                        `}
                        onClick={() => handleSelectBlock(block.id)}
                      >
                        <BlockRenderer 
                          block={block} 
                          isEditing={false}
                        />
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBlock(block.id);
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          ×
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}