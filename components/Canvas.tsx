import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { QuizBlock } from '@/types/quiz';
import { BlockRenderer } from './BlockRenderer';

interface CanvasProps {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
  onSelectBlock: (blockId: string) => void;
  onMoveBlock: (fromIndex: number, toIndex: number) => void;
  onDeleteBlock: (blockId: string) => void;
}

export function Canvas({ blocks, selectedBlockId, onSelectBlock, onMoveBlock, onDeleteBlock }: CanvasProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onMoveBlock(result.source.index, result.destination.index);
  };

  return (
    <div className="flex-1 bg-white p-6">
      <div className="max-w-2xl mx-auto">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="canvas">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="min-h-[600px] border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-4"
              >
                {blocks.length === 0 ? (
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
                            relative group border-2 rounded-lg p-4 transition-all
                            ${selectedBlockId === block.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-transparent hover:border-gray-300'
                            }
                            ${snapshot.isDragging ? 'shadow-lg rotate-2' : ''}
                          `}
                          onClick={() => onSelectBlock(block.id)}
                        >
                          <BlockRenderer 
                            block={block} 
                            isSelected={selectedBlockId === block.id}
                          />
                          
                          {/* Delete button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteBlock(block.id);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
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
        </DragDropContext>
      </div>
    </div>
  );
}