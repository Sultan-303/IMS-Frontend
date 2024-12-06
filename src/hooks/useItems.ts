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

  const addItem = async (item: Item) => {
    try {
      const payload = {
        ...item,
        itemCategories: [], // Ensure itemCategories is included as an empty array
      };
      console.log('Adding item:', payload); // Log the payload
      const response = await fetch('https://localhost:7237/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newItem = await response.json();
      setAllItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      setError('Error adding item');
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (updatedItem: Item) => {
    try {
      const payload = {
        ...updatedItem,
        itemCategories: updatedItem.itemCategories || [], // Ensure itemCategories is included
      };
      console.log('Updating item:', payload); // Log the payload
      const response = await fetch(`https://localhost:7237/api/items/${updatedItem.itemID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
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
      } else if (response.status === 409) {
        const data = await response.json();
        // Do not set the error state here, just return the conflict response data
        return data;
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