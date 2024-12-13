// src/pages/ItemsPage.tsx
import React, { useState, useEffect } from 'react';
import useItems from '../hooks/useItems';
import { Item } from '../types';
import AddItemModal from '../components/AddItemModal';
import EditItemModal from '../components/EditItemModal';
import ErrorModal from '../components/ErrorModal';
import ConfirmationModal from '../components/ConfirmationModal'; // Import the new ConfirmationModal component

const ItemsPage: React.FC = () => {
  const { allItems, addItem, updateItem, deleteItem, fetchItems, loading, error, showErrorModal, setShowErrorModal } = useItems();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false); // State for the confirmation modal
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [forceDeleteItemId, setForceDeleteItemId] = useState<number | null>(null); // State for the item to force delete

  useEffect(() => {
    fetchItems();
  }, [fetchItems]); // Add fetchItems as dependency

  const handleAddItem = async (item: Item) => {
    await addItem(item);  // Wait for the item to be added
    await fetchItems();   // Refresh the items list to get the updated IDs
    setShowAddModal(false);
  };

  const handleEditItem = (item: Item) => {
    updateItem(item);
    setShowEditModal(false);
  };

  const handleDeleteItem = async (itemId: number) => {
    const conflictResponse = await deleteItem(itemId);
    if (conflictResponse && conflictResponse.canForceDelete) {
      setForceDeleteItemId(itemId);
      setShowConfirmationModal(true);
    }
  };

  const handleForceDeleteItem = async () => {
    if (forceDeleteItemId !== null) {
      await fetch(`https://localhost:5079/api/items/${forceDeleteItemId}/force`, {
        method: 'DELETE',
      });
      fetchItems();
      setShowConfirmationModal(false);
      setForceDeleteItemId(null);
    }
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
      {showConfirmationModal && (
        <ConfirmationModal
          message="Could not delete item because stock of this item exists. Do you want to proceed deleting this item? Note: Deleting this item will remove any existing stock with this item."
          onCancel={() => setShowConfirmationModal(false)}
          onConfirm={handleForceDeleteItem}
        />
      )}
    </div>
  );
};

export default ItemsPage; 