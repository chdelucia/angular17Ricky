import {
  getSearchInput,
  getPaginationNextButton,
  getPaginationLastButton,
  getPaginationFirstButton,
  getPaginationNumber,
  getCharacterCard,
  getGoBackButton,
  getNoResultsMessage,
} from '../support/home.po';

describe('Character list', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Visits the initial project page and check navigation', () => {
    getSearchInput().should('have.attr', 'placeholder', 'Search by name');
    cy.contains('Rick Sanchez');

    getPaginationNextButton().click();
    getPaginationNumber().contains('2 of 42');

    getPaginationLastButton().click();
    getPaginationNumber().contains('42 of 42');
    cy.contains('Gotron');

    getPaginationFirstButton().click();
    getPaginationNumber().contains('1 of 42');
  });

  it('Visits detail page on back should have same pagination', () => {
    getPaginationNextButton().click();
    getPaginationNumber().contains('2 of 42');

    getCharacterCard().first().click();
    getGoBackButton().click();
    getPaginationNumber().contains('2 of 42');
    cy.contains('Aqua Morty');
  });

  it('Visits detail should remember searchName', () => {
    getPaginationNextButton().click().click();
    getPaginationNumber().contains('3 of 42');

    getSearchInput().type('rick');
    getPaginationNumber().contains('1 of 6');

    getCharacterCard().first().click();
    getGoBackButton().click();
    getSearchInput().invoke('val').should('eq', 'rick');
    getPaginationNumber().contains('1 of 6');
  });

  it('should display no results on search weird name', () => {
    getSearchInput().type('patatitas');
    getNoResultsMessage().contains('No results, try other names!');
  });
});
