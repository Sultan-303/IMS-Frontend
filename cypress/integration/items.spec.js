/* describe('Items Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/items');
  });

  it('should load the items page', () => {
    cy.contains('Items');
  });

  it('should add a new item', () => {
    cy.contains('Add Item').click();
    cy.get('input[name="itemName"]', { timeout: 10000 }).should('be.visible').type('New Item');
    cy.get('input[name="unit"]', { timeout: 10000 }).should('be.visible').type('pcs');
    cy.get('input[name="price"]', { timeout: 10000 }).should('be.visible').type('5.00');
    cy.contains('Add Item').click();
    cy.contains('New Item');
  });

  it('should edit an item', () => {
    cy.contains('Edit', { timeout: 10000 }).should('be.visible').click();
    cy.get('input[name="itemName"]', { timeout: 10000 }).clear().type('Updated Item');
    cy.contains('Save').click();
    cy.contains('Updated Item');
  });

  it('should delete an item', () => {
    cy.contains('Delete', { timeout: 10000 }).should('be.visible').click();
    cy.contains('There are no items to be viewed.');
  });
}); */