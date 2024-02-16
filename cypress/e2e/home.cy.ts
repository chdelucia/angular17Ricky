describe('My First Test', () => {
  it('Visits the initial project page and check navigation', () => {
    cy.visit('/');
    cy.get('[data-cy="loader"]').contains('Loading results...');

    cy.get('[data-cy="searchName"]')
      .invoke('attr', 'placeholder')
      .should('eq', 'Search by name');

    cy.contains('Rick Sanchez');

    cy.get('[data-cy="p-next"]').click();
    cy.get('[data-cy="p-number"]').contains('2 of 42');

    cy.get('[data-cy="p-last"]').click();
    cy.get('[data-cy="p-number"]').contains('42 of 42');
    cy.contains('Gotron');

    cy.get('[data-cy="p-first"]').click();
    cy.get('[data-cy="p-number"]').contains('1 of 42');
  });

  it('Visits detail page on back should have same pagination', () => {
    cy.visit('/');
    cy.get('[data-cy="loader"]').contains('Loading results...');

    cy.get('[data-cy="p-next"]').click();
    cy.get('[data-cy="p-number"]').contains('2 of 42');

    cy.get('[data-cy="char-card"]').first().click();
    cy.get('[data-cy="go-back"]').click();
    cy.get('[data-cy="p-number"]').contains('2 of 42');
    cy.contains('Aqua Morty');
  });

  it('Visits detail should remember searchName', () => {
    cy.visit('/');
    cy.get('[data-cy="loader"]').contains('Loading results...');

    cy.get('[data-cy="p-next"]').click();
    cy.get('[data-cy="p-next"]').click();
    cy.get('[data-cy="p-number"]').contains('3 of 42');

    cy.get('[data-cy="searchName"]').type('rick');
    cy.get('[data-cy="p-number"]').contains('1 of 6');

    cy.get('[data-cy="char-card"]').first().click();
    cy.get('[data-cy="go-back"]').click();
    cy.get('[data-cy="searchName"]').invoke('val').should('eq', 'rick');
    cy.get('[data-cy="p-number"]').contains('1 of 6');
  });

  it('should display no results on search weird name', () => {
    cy.visit('/');
    cy.get('[data-cy="loader"]').contains('Loading results...');
    cy.get('[data-cy="searchName"]').type('patatitas');
    cy.get('[data-cy="no-results"]').contains('No results, try other names!');
  });
});
