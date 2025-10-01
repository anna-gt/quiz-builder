import { BlockType } from "@/types/quiz";


const BLOCK_TYPES = [
  { type: 'heading' as const, label: 'Heading', icon: '📝' },
  { type: 'question' as const, label: 'Question', icon: '❓' },
  { type: 'button' as const, label: 'Button', icon: '🔘' },
  { type: 'footer' as const, label: 'Footer', icon: '📄' },
];

interface BlockPaletteProps {
  onAddBlock: (type: BlockType) => void;
}

export function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <h3 className="font-semibold text-lg mb-4">Building Blocks</h3>
      <div className="space-y-2">
        {BLOCK_TYPES.map((blockType) => (
          <button
            key={blockType.type}
            onClick={() => onAddBlock(blockType.type)}
            className="w-full flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
          >
            <span className="text-xl">{blockType.icon}</span>
            <span className="font-medium">{blockType.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}