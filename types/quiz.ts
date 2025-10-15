export type BlockType = 'heading' | 'question' | 'button' | 'footer';

export interface QuizBlock {
  id: string;
  type: BlockType;
  content: string;
  properties?: {
    questionType?: 'single' | 'multi' | 'text';
    options?: string[];
  };
}

export interface Quiz {
  id: string;
  title: string;
  blocks: QuizBlock[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EditorState {
  blocks: QuizBlock[];
  selectedBlockId: string | null;
}