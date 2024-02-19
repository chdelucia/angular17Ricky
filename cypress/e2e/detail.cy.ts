import { getLoader } from '../support/home.po';

describe('Details character', () => {
  it('Visits the initial project page and check navigation', () => {
    cy.visit('/#/character/3');

    cy.get('[data-cy="detail-card"]').should('exist');
    cy.get('[data-cy="go-back"]').click();
  });

  it('Visits the initial project page and check navigation', () => {
    cy.visit('/#/character/asdasd');

    cy.get('[data-cy="loader"]').contains('Loading results...');
    getLoader().should('not.exist');
    cy.get('[data-cy="detail-card"]').should('not.exist');

    cy.contains('Oops! Page not found');
    cy.get('[data-cy="go-back"]').click();

    cy.get('[data-cy="p-number"]').contains('1 of 42');
    cy.contains('Rick Sanchez');
  });
});
