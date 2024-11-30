// src/components/EditItemModal.tsx
import React, { useState } from 'react';
import { Item } from '../types';

interface EditItemModalProps {
  item: Item;
  onClose: () => void;
  onSave: (item: Item) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose, onSave }) => {
  const [itemName, setItemName] = useState(item.itemName);
  const [unit, setUnit] = useState(item.unit);
  const [price, setPrice] = useState<number | ''>(item.price);

  const handleSave = () => {
    if (itemName && unit && price) {
      const updatedItem: Item = {
        ...item,
        itemName,
        unit,
        price: Number(price),
      };
      onSave(updatedItem);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Item</h2>
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

export default EditItemModal;