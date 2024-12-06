import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import InventoryPage from './InventoryPage';
import useStock from '../hooks/useStock';

jest.mock('../hooks/useStock');

const mockUseStock = useStock as jest.MockedFunction<typeof useStock>;

describe('InventoryPage', () => {
  beforeEach(() => {
    mockUseStock.mockReturnValue({
      allStock: [],
      allItems: [],
      filteredStock: [],
      filterStock: jest.fn(),
      addStock: jest.fn(),
      updateStock: jest.fn(),
      deleteStock: jest.fn(),
      fetchStock: jest.fn(),
      loading: false,
      error: null,
      showErrorModal: false,
      setShowErrorModal: jest.fn(),
    });
  });

  test('renders InventoryPage component', () => {
    render(
      <Router>
        <InventoryPage />
      </Router>
    );
    const heading = screen.getByRole('heading', { name: /inventory/i });
    expect(heading).toBeInTheDocument();
  });

  test('displays "Add Stock" button', () => {
    render(
      <Router>
        <InventoryPage />
      </Router>
    );
    const addButton = screen.getByRole('button', { name: /add stock/i });
    expect(addButton).toBeInTheDocument();
  });

  test('displays "No stock has been added yet" message when there is no stock', () => {
    render(
      <Router>
        <InventoryPage />
      </Router>
    );
    const noStockMessage = screen.getByText(/no stock has been added yet/i);
    expect(noStockMessage).toBeInTheDocument();
  });

  test('displays stock list when there is stock', () => {
    mockUseStock.mockReturnValue({
      allStock: [
        { stockID: 1, itemID: 1, quantityInStock: 10, arrivalDate: new Date('2023-01-01'), expiryDate: new Date('2023-12-31') },
      ],
      allItems: [
        { itemID: 1, itemName: 'Item 1', unit: 'pcs', price: 10.0 },
      ],
      filteredStock: [],
      filterStock: jest.fn(),
      addStock: jest.fn(),
      updateStock: jest.fn(),
      deleteStock: jest.fn(),
      fetchStock: jest.fn(),
      loading: false,
      error: null,
      showErrorModal: false,
      setShowErrorModal: jest.fn(),
    });

    render(
      <Router>
        <InventoryPage />
      </Router>
    );
    const listItem = screen.getByText(/item 1/i);
    expect(listItem).toBeInTheDocument();
  });

  test('calls deleteStock when "Delete" button is clicked', () => {
    const deleteStockMock = jest.fn();
    mockUseStock.mockReturnValue({
      allStock: [
        { stockID: 1, itemID: 1, quantityInStock: 10, arrivalDate: new Date('2023-01-01'), expiryDate: new Date('2023-12-31') },
      ],
      allItems: [
        { itemID: 1, itemName: 'Item 1', unit: 'pcs', price: 10.0 },
      ],
      filteredStock: [],
      filterStock: jest.fn(),
      addStock: jest.fn(),
      updateStock: jest.fn(),
      deleteStock: deleteStockMock,
      fetchStock: jest.fn(),
      loading: false,
      error: null,
      showErrorModal: false,
      setShowErrorModal: jest.fn(),
    });

    render(
      <Router>
        <InventoryPage />
      </Router>
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(deleteStockMock).toHaveBeenCalledWith(1);
  });
});