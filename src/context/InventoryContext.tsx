import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Item, Stock } from '../types';

interface InventoryContextProps {
  allItems: Item[];
  allStock: Stock[];
  setAllItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setAllStock: React.Dispatch<React.SetStateAction<Stock[]>>;
}

interface InventoryProviderProps {
  children: ReactNode;
}

const InventoryContext = createContext<InventoryContextProps | undefined>(undefined);

export const InventoryProvider: React.FC<InventoryProviderProps> = ({ children }) => {
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [allStock, setAllStock] = useState<Stock[]>([]);

  return (
    <InventoryContext.Provider value={{ allItems, allStock, setAllItems, setAllStock }}>
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};