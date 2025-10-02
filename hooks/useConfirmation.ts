import { useState, useCallback } from 'react';

interface ConfirmationState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  type?: string;
}

export function useConfirmation() {
  const [confirmationState, setConfirmationState] = useState<ConfirmationState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const showConfirmation = useCallback((
    title: string, 
    message: string, 
    onConfirm: () => void,
    type?: string
  ) => {
    setConfirmationState({
      isOpen: true,
      title,
      message,
      onConfirm,
      type,
    });
  }, []);

  const hideConfirmation = useCallback(() => {
    setConfirmationState(prev => ({ ...prev, isOpen: false, onConfirm: null }));
  }, []);

  const handleConfirm = useCallback(() => {
    confirmationState.onConfirm?.();
    hideConfirmation();
  }, [confirmationState.onConfirm, hideConfirmation]);

  return {
    confirmationState,
    showConfirmation,
    hideConfirmation,
    handleConfirm,
  };
}