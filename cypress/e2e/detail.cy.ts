describe('My First Test', () => {
  it('Visits the initial project page and check navigation', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.visit('/character/3');

    cy.wait(1000);

    cy.get('[data-cy="detail-card"]').should('exist');

    cy.get('[data-cy="go-back"]').click();
    cy.wait(1000);
    cy.get('[data-cy="p-number"]').contains('1 of 42');
  });

  it('Visits the initial project page and check navigation', () => {
    cy.visit('/character/asdasd');

    cy.wait(1000);

    cy.get('[data-cy="detail-card"]').should('not.exist');

    cy.wait(1000);
    cy.contains('Oops! Page not found');
    cy.get('[data-cy="go-back"]').click();
    cy.wait(1000);
    cy.get('[data-cy="p-number"]').contains('1 of 42');
    cy.contains('Rick Sanchez');
  });
});
