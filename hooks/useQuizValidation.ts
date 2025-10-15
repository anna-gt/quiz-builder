import { Quiz, QuizBlock } from "@/types/quiz";

export function useQuizValidation() {
  const validateQuiz = (
    quiz: Quiz,
    blocks: QuizBlock[]
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!quiz.title || quiz.title.trim() === "") {
      errors.push("Quiz title is required");
    }

    const hasQuestions = blocks.some((block) => block.type === "question");
    if (!hasQuestions) {
      errors.push("Quiz must contain at least one question");
    }

    const emptyQuestions = blocks.filter(
      (block) =>
        block.type === "question" &&
        (!block.content || block.content.trim() === "")
    );
    if (emptyQuestions.length > 0) {
      errors.push("All questions must have content");
    }

    const questionsWithoutOptions = blocks.filter(
      (block) =>
        block.type === "question" &&
        (block.properties?.questionType === "single" ||
          block.properties?.questionType === "multi") &&
        (!block.properties.options ||
          block.properties.options.length === 0 ||
          block.properties.options.every((opt) => !opt.trim()))
    );
    if (questionsWithoutOptions.length > 0) {
      errors.push("Questions with choices must have at least one option");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return { validateQuiz };
}
