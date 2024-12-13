// src/components/AddStockModal.tsx
import React, { useState, useEffect } from 'react';
import { Stock, Item } from '../types';

interface AddStockModalProps {
  onClose: () => void;
  onSave: (stock: Stock) => void;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ onClose, onSave }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [itemID, setItemID] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<string>('');
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5079/api/Items');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Item[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleSave = () => {
    if (itemID && quantity && arrivalDate) {
      const newStock: Stock = {
        stockID: 0,
        itemID: Number(itemID),
        quantity: Number(quantity), 
        arrivalDate: new Date(arrivalDate),
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      };
      onSave(newStock);
    } else {
      console.error('Missing required fields');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Stock</h2>
        <label>
          Item:
          <select value={itemID} onChange={(e) => setItemID(Number(e.target.value))}>
            <option value="">Select an item</option>
            {items.map((item) => (
              <option key={item.itemID} value={item.itemID}>
                {item.itemName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Quantity:
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="0"
          />
        </label>
        <label>
          Arrival Date:
          <input 
            type="date" 
            value={arrivalDate} 
            onChange={(e) => setArrivalDate(e.target.value)} 
          />
        </label>
        <label>
          Expiry Date:
          <input 
            type="date" 
            value={expiryDate} 
            onChange={(e) => setExpiryDate(e.target.value)} 
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AddStockModal;