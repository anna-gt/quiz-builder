import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  multiline?: boolean;
  rows?: number;
}

export function Input({ 
  label, 
  className = '', 
  multiline = false,
  rows = 1,
  ...props 
}: InputProps) {
  const baseStyles = 'w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors';
  
  if (multiline) {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          className={`${baseStyles} resize-none ${className}`}
          rows={rows}
          {...props as TextareaHTMLAttributes<HTMLTextAreaElement>}
        />
      </div>
    );
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${className}`}
        {...props}
      />
    </div>
  );
}