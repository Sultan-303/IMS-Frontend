// src/types.ts

export interface Category {
  categoryID: number;
  categoryName: string;
  itemCategories: ItemCategory[]; // Add itemCategories property
}

// src/types.ts
export interface ItemCategory {
  itemID: number;
  categoryID: number;
  item: Item;
  category: Category;
}

export interface Item {
  itemID: number;
  itemName: string;
  unit: string;
  price: number;
  itemCategories?: ItemCategory[]; // Add itemCategories property
}

export interface Stock {
  stockID: number;
  itemID: number;
  quantityInStock: number;
  arrivalDate: Date;
  expiryDate?: Date;
}