// src/components/ConfirmationModal.tsx
import React from 'react';

interface ConfirmationModalProps {
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm}>Delete Item</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;