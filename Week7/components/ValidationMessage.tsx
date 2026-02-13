
import React from 'react';

interface ValidationMessageProps {
  message?: string;
  isValid?: boolean;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ message, isValid }) => {
  if (!message) return null;

  return (
    <p className={`mt-1 text-xs font-medium ${isValid ? 'text-emerald-600' : 'text-rose-500'}`}>
      {message}
    </p>
  );
};
