describe('Layer toggling', () => {
  beforeEach(() => {
    if (Cypress.env('use_mocks')) {
      cy.intercept('GET', '/api/layer/air', { fixture: 'air.json' }).as('getData');
      cy.intercept('GET', '/api/layer/cruise', { fixture: 'cruise.json' }).as('getData');
      cy.intercept('GET', '/api/layer/bike', { fixture: 'bike.json' }).as('getData');
      cy.intercept('GET', '/api/weather', { fixture: 'weather.json' }).as('getData');
    }

    cy.visit('http://localhost:3000');
  });

  it('should display air layer by default', () => {
    cy.getBySel('marker-air').should('be.visible');
    cy.getBySel('nav-air').should('have.class', 'selected');
  });

  it('should show air info on click', () => {
    cy.getBySel('marker-air').filter(':visible').first().click();
    cy.getBySel('popup-air').should('be.visible');
  });

  it('should toggle layers on and off', () => {
    // Disable air layer
    cy.toggleLayer('air', false);

    // Enable cruise layer
    cy.toggleLayer('cruise', true);

    // Enable bike layer
    cy.toggleLayer('bike', true);

    // Confirm selected layers count
    cy.get('.selected').should('have.length', 2);

    // Verify air layer is still off, others are on
    cy.getBySel('marker-air').should('not.exist');
    cy.getBySel('marker-cruise').should('exist');
    cy.getBySel('marker-bike').should('exist');
  });
});
