import { useState, useEffect } from 'react';
import { Stock, Item } from '../types';

const useStock = () => {
  const [allStock, setAllStock] = useState<Stock[]>([]);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [filteredStock, setFilteredStock] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

  const fetchStock = async () => {
    setLoading(true);
    try {
      console.log('Fetching all stock from API');
      const response = await fetch('https://localhost:7237/api/stock');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Stock[] = await response.json();
      console.log(`Fetched ${data.length} stock items from API`);
      setAllStock(data);
      setFilteredStock(data);
    } catch (error) {
      setError('Error fetching stock');
      console.error('Error fetching stock:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItems = async () => {
    try {
      console.log('Fetching all items from API');
      const response = await fetch('https://localhost:7237/api/items');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Item[] = await response.json();
      console.log(`Fetched ${data.length} items from API`);
      setAllItems(data);
    } catch (error) {
      setError('Error fetching items');
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchStock();
    fetchItems();
  }, []);

  const addStock = async (newStock: Stock) => {
    try {
      console.log('Adding new stock to API:', newStock);
      const response = await fetch('https://localhost:7237/api/stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockID: 0,
          itemID: newStock.itemID,
          quantityInStock: newStock.quantityInStock,
          arrivalDate: newStock.arrivalDate.toISOString(),
          expiryDate: newStock.expiryDate ? newStock.expiryDate.toISOString() : null,
        }),
      });

      if (response.ok) {
        const addedStock = await response.json();
        console.log('Added stock to API:', addedStock);
        setAllStock((prevStock) => [...prevStock, addedStock]);
        setFilteredStock((prevStock) => [...prevStock, addedStock]);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error adding stock');
      setShowErrorModal(true);
      console.error('Error adding stock:', error);
    }
  };

  const updateStock = async (updatedStock: Stock) => {
    try {
      console.log('Updating stock in API:', updatedStock);
      const response = await fetch(`https://localhost:7237/api/stock/${updatedStock.stockID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stockID: updatedStock.stockID,
          itemID: updatedStock.itemID,
          quantityInStock: updatedStock.quantityInStock,
          arrivalDate: updatedStock.arrivalDate.toISOString(),
          expiryDate: updatedStock.expiryDate ? updatedStock.expiryDate.toISOString() : null,
        }),
      });

      if (response.ok) {
        if (response.status === 204) {
          console.log('Updated stock in API with no content response:', updatedStock);
          setAllStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStock.stockID ? updatedStock : stock))
          );
          setFilteredStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStock.stockID ? updatedStock : stock))
          );
        } else {
          const updatedStockData = await response.json();
          console.log('Updated stock in API:', updatedStockData);
          setAllStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStockData.stockID ? updatedStockData : stock))
          );
          setFilteredStock((prevStock) =>
            prevStock.map((stock) => (stock.stockID === updatedStockData.stockID ? updatedStockData : stock))
          );
        }
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error updating stock');
      setShowErrorModal(true);
      console.error('Error updating stock:', error);
    }
  };

  const deleteStock = async (stockId: number) => {
    try {
      console.log(`Deleting stock with ID: ${stockId} from API`);
      const response = await fetch(`https://localhost:7237/api/stock/${stockId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Deleted stock with ID: ${stockId} from API`);
        setAllStock((prevStock) => prevStock.filter((stock) => stock.stockID !== stockId));
        setFilteredStock((prevStock) => prevStock.filter((stock) => stock.stockID !== stockId));
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      setError('Error deleting stock');
      setShowErrorModal(true);
      console.error('Error deleting stock:', error);
    }
  };

  const filterStock = (criteria: (stock: Stock) => boolean) => {
    setFilteredStock(allStock.filter(criteria));
  };

  return { allStock, allItems, filteredStock, addStock, updateStock, deleteStock, filterStock, fetchStock, loading, error, showErrorModal, setShowErrorModal };
};

export default useStock;