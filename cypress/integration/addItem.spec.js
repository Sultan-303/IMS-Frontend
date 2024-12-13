describe('Add Item', () => {
  beforeEach(() => {
    // Mock GET items response
    cy.intercept('GET', 'http://localhost:5079/api/Items', {
      statusCode: 200,
      body: []
    }).as('getItems');

    // Mock POST new item response
    cy.intercept('POST', 'http://localhost:5079/api/Items', (req) => {
      const newItem = {
        ...req.body,
        itemID: 1
      };
      return {
        statusCode: 201,
        body: newItem
      };
    }).as('addItem');

    cy.visit('http://localhost:3000/items');
    cy.wait('@getItems');
  });
  
  it('should add a new item', () => {
    // Click the "Add Item" button
    cy.contains('Add Item').click();
  
    // Fill out the form
    cy.contains('label', 'Name:').parent().within(() => {
      cy.get('input').eq(0).type('New Item');
    });
    cy.contains('label', 'Unit:').parent().within(() => {
      cy.get('input').eq(1).type('kg');
    });
    cy.contains('label', 'Price:').parent().within(() => {
      cy.get('input').eq(2).type('5.00');
    });
  
    cy.contains('Save').click();
    cy.wait('@addItem');

    cy.get('.items-list').within(() => {
      cy.contains('New Item').should('be.visible');
      cy.contains('kg').should('be.visible');
      cy.contains('5').should('be.visible');
    });
  });
});