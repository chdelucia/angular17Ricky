import { getLoader } from '../support/home.po';

describe('My First Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="loader"]').contains('Loading results...');
    getLoader().should('not.exist');
  });

  it('Visits the initial project page and check navigation', () => {
    cy.visit('/');

    cy.visit('/character/3');

    cy.get('[data-cy="detail-card"]').should('exist');

    cy.get('[data-cy="go-back"]').click();

    cy.get('[data-cy="p-number"]').contains('1 of 42');
  });

  it('Visits the initial project page and check navigation', () => {
    cy.visit('/character/asdasd');

    cy.get('[data-cy="detail-card"]').should('not.exist');

    cy.contains('Oops! Page not found');
    cy.get('[data-cy="go-back"]').click();

    cy.get('[data-cy="p-number"]').contains('1 of 42');
    cy.contains('Rick Sanchez');
  });
});
