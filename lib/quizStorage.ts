import { Quiz } from "@/types/quiz";

const QUIZ_INDEX_KEY = "quizbuilder.index";
const QUIZ_PREFIX = "quizbuilder.quiz.";
const INITIALIZED_KEY = "quizbuilder.initialized";

const SAMPLE_QUIZZES: Quiz[] = [
  {
    id: "sample-1",
    title: "Sample Quiz 1",
    blocks: [
      { id: "1", type: "heading", content: "Welcome to the Quiz!" },
      {
        id: "2",
        type: "question",
        content: "What is your favorite color?",
        properties: {
          questionType: "single",
          options: ["Red", "Blue", "Green", "Yellow"],
        },
      },
      { id: "3", type: "button", content: "Next" },
    ],
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sample-2",
    title: "Sample Quiz 2",
    blocks: [
      { id: "1", type: "heading", content: "Programming Quiz" },
      {
        id: "2",
        type: "question",
        content: "Which of these are programming languages?",
        properties: {
          questionType: "multi",
          options: ["JavaScript", "HTML", "CSS", "Python"],
        },
      },
      { id: "3", type: "button", content: "Submit" },
      { id: "4", type: "footer", content: "© 2025 Quiz Builder" },
    ],
    published: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export class QuizStorage {
  private static isInitialized(): boolean {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(INITIALIZED_KEY) === "true";
  }

  private static initialize(): void {
    if (this.isInitialized() || typeof window === "undefined") return;

    try {
      SAMPLE_QUIZZES.forEach((quiz) => {
        localStorage.setItem(`${QUIZ_PREFIX}${quiz.id}`, JSON.stringify(quiz));
      });

      const quizIds = SAMPLE_QUIZZES.map((quiz) => quiz.id);
      localStorage.setItem(QUIZ_INDEX_KEY, JSON.stringify(quizIds));
      localStorage.setItem(INITIALIZED_KEY, "true");
    } catch (error) {
      console.error("Failed to initialize storage:", error);
    }
  }

  private static safeJSONParse<T>(value: string | null, fallback: T): T {
    try {
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      console.error("JSON parse error:", error);
      return fallback;
    }
  }

  private static safeJSONStringify<T>(value: T): string {
    try {
      return JSON.stringify(value);
    } catch (error) {
      console.error("JSON stringify error:", error);
      return "{}";
    }
  }

  private static safeGetItem(key: string): string | null {
    try {
      if (typeof window === "undefined") return null;
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading from localStorage key ${key}:`, error);
      this.showToast("Storage read error", "error");
      throw new Error("STORAGE_READ_ERROR");
    }
  }

  private static safeSetItem(key: string, value: string): void {
    try {
      if (typeof window === "undefined") return;
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error writing to localStorage key ${key}:`, error);
      this.showToast("Storage write error", "error");
      throw new Error("STORAGE_WRITE_ERROR");
    }
  }

  private static isValidQuiz(quiz: unknown): quiz is Quiz {
    if (!quiz || typeof quiz !== "object") return false;

    const q = quiz as Record<string, unknown>;

    return (
      typeof q.id === "string" &&
      typeof q.title === "string" &&
      Array.isArray(q.blocks) &&
      typeof q.published === "boolean" &&
      typeof q.createdAt === "string" &&
      typeof q.updatedAt === "string"
    );
  }

  static getAllQuizzes(): Quiz[] {
    if (typeof window === "undefined") return [];

    this.initialize();

    try {
      const indexJson = this.safeGetItem(QUIZ_INDEX_KEY);
      if (!indexJson) return [];

      const quizIds: string[] = this.safeJSONParse(indexJson, []);
      const quizzes: Quiz[] = [];

      for (const id of quizIds) {
        try {
          const quizJson = this.safeGetItem(`${QUIZ_PREFIX}${id}`);
          if (quizJson) {
            const quiz = this.safeJSONParse<unknown>(quizJson, null);
            if (this.isValidQuiz(quiz)) {
              quizzes.push(quiz);
            } else {
              console.warn(`Invalid quiz data for ID: ${id}`);
            }
          }
        } catch (error) {
          console.error(`Error parsing quiz ${id}:`, error);
          continue;
        }
      }

      return quizzes.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } catch (error) {
      console.error("Error reading quizzes:", error);
      return [];
    }
  }

  static getQuiz(id: string): Quiz | null {
    if (typeof window === "undefined") return null;

    try {
      const quizJson = this.safeGetItem(`${QUIZ_PREFIX}${id}`);
      if (!quizJson) return null;

      const quiz = this.safeJSONParse<unknown>(quizJson, null);
      return this.isValidQuiz(quiz) ? quiz : null;
    } catch (error) {
      console.error("Error reading quiz:", error);
      return null;
    }
  }

  static saveQuiz(quiz: Quiz): void {
    if (typeof window === "undefined") return;

    try {
      if (!this.isValidQuiz(quiz)) {
        throw new Error("Invalid quiz data");
      }

      this.safeSetItem(
        `${QUIZ_PREFIX}${quiz.id}`,
        this.safeJSONStringify(quiz)
      );

      const indexJson = this.safeGetItem(QUIZ_INDEX_KEY);
      const quizIds: string[] = this.safeJSONParse(indexJson, []);

      if (!quizIds.includes(quiz.id)) {
        quizIds.push(quiz.id);
        this.safeSetItem(QUIZ_INDEX_KEY, this.safeJSONStringify(quizIds));
      }

      this.showToast("Quiz saved successfully!", "success");
    } catch (error) {
      console.error("Error saving quiz:", error);
      this.showToast("Failed to save quiz", "error");
      throw error;
    }
  }

  static deleteQuiz(id: string): void {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem(`${QUIZ_PREFIX}${id}`);

      const indexJson = localStorage.getItem(QUIZ_INDEX_KEY);
      if (indexJson) {
        const quizIds: string[] = JSON.parse(indexJson).filter(
          (quizId: string) => quizId !== id
        );
        localStorage.setItem(QUIZ_INDEX_KEY, JSON.stringify(quizIds));
      }

      this.showToast("Quiz deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting quiz:", error);
      this.showToast("Failed to delete quiz", "error");
    }
  }

  private static showToast(message: string, type: "success" | "error"): void {
    if (typeof window === "undefined") return;

    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 p-4 rounded-lg text-white ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } z-50`;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  }
}
