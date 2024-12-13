describe('Add Item', () => {
  const expectedItem = {
    itemID: 1,
    itemName: 'New Item',
    unit: 'kg',
    price: 5.00
  };

  beforeEach(() => {
    // Initial GET returns our expected item
    cy.intercept('GET', 'http://localhost:5079/api/Items', {
      statusCode: 200,
      body: [expectedItem]
    }).as('getItems');

    // POST just returns success
    cy.intercept('POST', 'http://localhost:5079/api/Items', {
      statusCode: 201,
      body: expectedItem
    }).as('addItem');

    cy.visit('http://localhost:3000/items');
    cy.wait('@getItems');
  });
  
  it('should add a new item', () => {
    cy.contains('Add Item').click();
  
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