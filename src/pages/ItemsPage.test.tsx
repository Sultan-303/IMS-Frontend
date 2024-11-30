import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ItemsPage from './ItemsPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { Item } from '../types';

// Mock the useItems hook
jest.mock('../hooks/useItems', () => ({
  __esModule: true,
  default: () => ({
    allItems: [],
    addItem: jest.fn(),
    updateItem: jest.fn(),
    deleteItem: jest.fn(),
    fetchItems: jest.fn(),
    loading: false,
    error: null,
    showErrorModal: false,
    setShowErrorModal: jest.fn(),
  }),
}));

describe('ItemsPage', () => {
  test('renders ItemsPage component', () => {
    render(
      <Router>
        <ItemsPage />
      </Router>
    );
    const heading = screen.getByRole('heading', { name: /items/i });
    expect(heading).toBeInTheDocument();
  });

  test('displays "No items have been created yet" when there are no items', () => {
    render(
      <Router>
        <ItemsPage />
      </Router>
    );
    const noItemsText = screen.getByText(/no items have been created yet/i);
    expect(noItemsText).toBeInTheDocument();
  });

  test('displays "Add Item" button', () => {
    render(
      <Router>
        <ItemsPage />
      </Router>
    );
    const addButton = screen.getByRole('button', { name: /add item/i });
    expect(addButton).toBeInTheDocument();
  });

  test('displays "Items" header when there are items present', () => {
    // Mock the useItems hook to return items
    jest.mock('../hooks/useItems', () => ({
      __esModule: true,
      default: () => ({
        allItems: [
          { itemID: 1, itemName: 'Item 1', unit: 'kg', price: 10 },
          { itemID: 2, itemName: 'Item 2', unit: 'kg', price: 20 },
        ],
        addItem: jest.fn(),
        updateItem: jest.fn(),
        deleteItem: jest.fn(),
        fetchItems: jest.fn(),
        loading: false,
        error: null,
        showErrorModal: false,
        setShowErrorModal: jest.fn(),
      }),
    }));

    render(
      <Router>
        <ItemsPage />
      </Router>
    );
    const heading = screen.getByRole('heading', { name: /items/i });
    expect(heading).toBeInTheDocument();
  });
});