Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('toggleLayer', (layer, shouldBeVisible) => {
  cy.getBySel(`nav-${layer}`).click();
  cy.getBySel(`nav-${layer}`).should(shouldBeVisible ? 'have.class' : 'not.have.class', 'selected');
  cy.getBySel(`marker-${layer}`).should(shouldBeVisible ? 'exist' : 'not.exist');
});
