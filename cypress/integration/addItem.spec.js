describe('Add Item', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/items');
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
  
      // Submit the form
      cy.contains('Save').click();
  
      // Verify the new item is displayed
      cy.contains('New Item');
      cy.contains('kg');
      cy.contains('5');
    });
  });