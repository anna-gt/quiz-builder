'use client';

import { useEffect, useState } from 'react';

interface ValidationErrorProps {
  errors: string[];
  onClose?: () => void;
  autoHide?: boolean;
  autoHideDuration?: number;
}

export function ValidationError({ 
  errors, 
  onClose, 
  autoHide = true,
  autoHideDuration = 5000 
}: ValidationErrorProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setIsVisible(true);
      
      if (autoHide && onClose) {
        const timer = setTimeout(() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }, autoHideDuration);

        return () => clearTimeout(timer);
      }
    }
  }, [errors, autoHide, autoHideDuration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  if (errors.length === 0 || !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-4 max-w-md z-50 shadow-lg transform transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-red-800 flex items-center gap-2">
          <span>⚠️</span>
          Cannot Publish Quiz
        </h4>
        {onClose && (
          <button
            onClick={handleClose}
            className="text-red-500 hover:text-red-700 cursor-pointer text-lg font-bold ml-2 w-6 h-6 flex items-center justify-center rounded hover:bg-red-100 transition-colors"
          >
            ×
          </button>
        )}
      </div>
      <ul className="text-red-700 text-sm space-y-1">
        {errors.map((error, index) => (
          <li key={index}>• {error}</li>
        ))}
      </ul>
    </div>
  );
}