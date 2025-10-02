'use client';

import { Component, ReactNode } from 'react';
import Link from 'next/link';
import { Button } from './shared/Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasStorageError: boolean;
}

export class StorageErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasStorageError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    if (error.name.includes('QuotaExceeded') || error.name.includes('Storage')) {
      return { hasStorageError: true };
    }
    return { hasStorageError: false };
  }

  public componentDidCatch(error: Error) {
    console.error('StorageErrorBoundary caught an error:', error);
  }

  public render() {
    if (this.state.hasStorageError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
            <div className="text-6xl mb-4">💾</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Storage Error</h1>
            <p className="text-gray-600 mb-4">
              There seems to be an issue with your browser&apos;s storage. This might be due to:
            </p>
            <ul className="text-sm text-gray-600 text-left mb-6 space-y-1">
              <li>• Storage quota exceeded</li>
              <li>• Private browsing mode</li>
              <li>• Browser restrictions</li>
            </ul>
            <div className="space-y-3">
              <Button
                onClick={() => this.setState({ hasStorageError: false })}
                className="w-full"
              >
                Try Again
              </Button>
              <Link
                href="/"
                className="block w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}