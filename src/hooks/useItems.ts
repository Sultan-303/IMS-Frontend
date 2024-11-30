import { useState, useEffect } from 'react';
import { Item } from '../types';

const useItems = () => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://localhost:7237/api/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      setAllItems(data);
    } catch (error) {
      setError('Error fetching items');
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (newItem: Item) => {
    try {
      const response = await fetch('https://localhost:7237/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();
        setAllItems((prevItems) => [...prevItems, addedItem]);
      } else if (response.status === 409) {
        // Handle duplicate item name error
        const errorMessage = await response.text();
        setError(errorMessage);
        setShowErrorModal(true);
        console.error('Error adding item:', errorMessage);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error adding item');
      setShowErrorModal(true);
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (updatedItem: Item) => {
    try {
      const response = await fetch(`https://localhost:7237/api/items/${updatedItem.itemID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        if (response.status === 204) {
          // Handle No Content response
          setAllItems((prevItems) =>
            prevItems.map((item) => (item.itemID === updatedItem.itemID ? updatedItem : item))
          );
        } else {
          const updatedItemData = await response.json();
          setAllItems((prevItems) =>
            prevItems.map((item) => (item.itemID === updatedItemData.itemID ? updatedItemData : item))
          );
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error updating item');
      setShowErrorModal(true);
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (itemId: number) => {
    try {
      const response = await fetch(`https://localhost:7237/api/items/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setAllItems((prevItems) => prevItems.filter((item) => item.itemID !== itemId));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error deleting item');
      setShowErrorModal(true);
      console.error('Error deleting item:', error);
    }
  };

  return { allItems, addItem, updateItem, deleteItem, fetchItems, loading, error, showErrorModal, setShowErrorModal };
};

export default useItems;