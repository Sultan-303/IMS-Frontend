// src/pages/ItemsPage.tsx
import React, { useState, useEffect } from 'react';
import useItems from '../hooks/useItems';
import { Item } from '../types';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import ErrorModal from '../components/ErrorModal';

const ItemsPage: React.FC = () => {
  const { allItems, addItem, updateItem, deleteItem, fetchItems, loading, error, showErrorModal, setShowErrorModal } = useItems();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = (item: Item) => {
    addItem(item);
    setShowAddModal(false);
  };

  const handleEditItem = (item: Item) => {
    updateItem(item);
    setShowEditModal(false);
  };

  const handleDeleteItem = (itemId: number) => {
    deleteItem(itemId);
  };

  return (
    <div className="items-page">
      <h1>Items</h1>
      <button className="add-item-button" onClick={() => setShowAddModal(true)}>Add Item</button>
      {loading && <p>Loading...</p>}
      {error && showErrorModal && <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />}
      {allItems.length === 0 ? (
        <p>No items have been created yet.</p>
      ) : (
        <>
          <div className="items-header">
            <span className="name-header">Name</span>
            <span className="unit-header">Unit</span>
            <span className="price-header">Price</span>
          </div>
          <ul className="items-list">
            {allItems.map((item) => (
              <li key={item.itemID} className="item-box">
                <span>{item.itemName}</span>
                <span>{item.unit}</span>
                <span>{item.price}</span>
                <button onClick={() => { setCurrentItem(item); setShowEditModal(true); }}>Edit</button>
                <button onClick={() => handleDeleteItem(item.itemID)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} onSave={handleAddItem} />}
      {showEditModal && currentItem && (
        <EditItemModal
          item={currentItem}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditItem}
        />
      )}
    </div>
  );
};

export default ItemsPage;