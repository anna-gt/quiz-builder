import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { StorageErrorBoundary } from "@/components/StorageErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quiz Builder",
  description: "Create and publish interactive quizzes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <StorageErrorBoundary>
            <div className="min-h-screen bg-gray-50">{children}</div>
          </StorageErrorBoundary>
        </ErrorBoundary>
      </body>
    </html>
  );
}
