'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';

const BLOCK_TYPES = [
  { type: 'heading' as const, label: 'Heading', icon: '📝' },
  { type: 'question' as const, label: 'Question', icon: '❓' },
  { type: 'button' as const, label: 'Button', icon: '🔘' },
  { type: 'footer' as const, label: 'Footer', icon: '📄' },
];

interface BlockPaletteProps {
  onAddBlock: (type: 'heading' | 'question' | 'button' | 'footer', index?: number) => void;
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="w-full md:w-64 bg-gray-50 p-4">
      <h3 className="font-semibold text-lg mb-4 hidden md:block">Building Blocks</h3>
      <h3 className="font-semibold text-sm mb-3 md:hidden">Blocks</h3>
      
      <Droppable droppableId="palette" isDropDisabled={true}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0"
          >
            {BLOCK_TYPES.map((blockType, index) => (
              <Draggable
                key={blockType.type}
                draggableId={blockType.type}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`
                      flex items-center gap-2 p-2 md:p-3 bg-white border border-gray-200 rounded-lg 
                      hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-grab flex-shrink-0
                      ${snapshot.isDragging ? 'shadow-md cursor-grabbing' : ''}
                      md:w-full md:flex-shrink
                    `}
                    onClick={() => onAddBlock(blockType.type)}
                  >
                    <span className="text-lg md:text-xl">{blockType.icon}</span>
                    <span className="font-medium text-sm md:text-base">{blockType.label}</span>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}