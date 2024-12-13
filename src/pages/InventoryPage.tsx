// src/pages/InventoryPage.tsx
import React, { useState, useEffect } from 'react';
import useStock from '../hooks/useStock';
import { Stock } from '../types';
import AddStockModal from '../components/AddStockModal';
import EditStockModal from '../components/EditStockModal';
import ErrorModal from '../components/ErrorModal';

const InventoryPage: React.FC = () => {
  const { allStock, allItems, addStock, updateStock, deleteStock, fetchStock, loading, error, showErrorModal, setShowErrorModal } = useStock();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentStock, setCurrentStock] = useState<Stock | null>(null);
  const [currentItemName, setCurrentItemName] = useState<string>('');

  useEffect(() => {
    fetchStock();
  }, []);

  const handleAddStock = (stock: Stock) => {
    addStock(stock);
    setShowAddModal(false);
  };

  const handleEditStock = (stock: Stock) => {
    updateStock(stock);
    setShowEditModal(false);
  };

  const handleDeleteStock = (stockId: number) => {
    deleteStock(stockId);
  };

  const getItemName = (itemID: number) => {
    const item = allItems.find((item) => item.itemID === itemID);
    return item ? item.itemName : 'Unknown Item';
  };

  return (
    <div className="inventory-page">
      <h1>Inventory</h1>
      <button className="add-stock-button" onClick={() => setShowAddModal(true)}>Add Stock</button>
      {loading && <p>Loading...</p>}
      {error && showErrorModal && <ErrorModal message={error} onClose={() => setShowErrorModal(false)} />}
      {allStock.length === 0 ? (
        <p>No stock has been added yet.</p>
      ) : (
        <>
          <div className="stock-header">
            <span className="item-header">Item Name</span>
            <span className="quantity-header">Quantity</span>
            <span className="arrival-header">Arrival Date</span>
            <span className="expiry-header">Expiry Date</span>
          </div>
          <ul className="stock-list">
            {allStock.map((stock) => (
              <li key={stock.stockID} className="stock-box">
                <span>{getItemName(stock.itemID)}</span>
                <span>{stock.quantity}</span>
                <span>{new Date(stock.arrivalDate).toLocaleDateString()}</span>
                <span>{stock.expiryDate ? new Date(stock.expiryDate).toLocaleDateString() : 'N/A'}</span>
                <button onClick={() => { setCurrentStock({ ...stock, arrivalDate: new Date(stock.arrivalDate), expiryDate: stock.expiryDate ? new Date(stock.expiryDate) : undefined }); setCurrentItemName(getItemName(stock.itemID)); setShowEditModal(true); }}>Edit</button>
                <button onClick={() => handleDeleteStock(stock.stockID)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {showAddModal && <AddStockModal onClose={() => setShowAddModal(false)} onSave={handleAddStock} />}
      {showEditModal && currentStock && (
        <EditStockModal
          stock={currentStock}
          itemName={currentItemName}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditStock}
        />
      )}
    </div>
  );
};

export default InventoryPage;