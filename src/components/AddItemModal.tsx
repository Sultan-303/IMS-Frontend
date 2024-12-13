// src/components/AddItemModal.tsx
import React, { useState } from 'react';
import { Item } from '../types';

interface AddItemModalProps {
  onClose: () => void;
  onSave: (item: Item) => Promise<void>;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose, onSave }) => {
  const [itemName, setItemName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleSave = () => {
    if (itemName && unit && price) {
      const newItem: Item = {
        itemID: 0, // This will be set by the backend
        itemName,
        unit,
        price: Number(price),
      };
      onSave(newItem);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Item</h2>
        <label>
          Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </label>
        <label>
          Unit:
          <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddItemModal;