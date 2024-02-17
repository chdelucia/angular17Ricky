// Define los selectores que se repiten frecuentemente

export const getLoader = () => cy.get('[data-cy="loader"]');

export const getSearchInput = () => cy.get('[data-cy="searchName"]');

export const getPaginationNextButton = () => cy.get('[data-cy="p-next"]');

export const getPaginationLastButton = () => cy.get('[data-cy="p-last"]');

export const getPaginationFirstButton = () => cy.get('[data-cy="p-first"]');

export const getPaginationNumber = () => cy.get('[data-cy="p-number"]');

export const getCharacterCard = () => cy.get('[data-cy="char-card"]');

export const getGoBackButton = () => cy.get('[data-cy="go-back"]');

export const getNoResultsMessage = () => cy.get('[data-cy="no-results"]');
