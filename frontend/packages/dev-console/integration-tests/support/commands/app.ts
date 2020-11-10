import { checkErrors } from '../../../../integration-tests-cypress/support';

before(() => {
  cy.login();
  cy.visit('');
});

after(() => {
  cy.logout();
});

afterEach(() => {
  checkErrors();
});

Cypress.Commands.add(
  'selectValueFromAutoCompleteDropDown',
  (selector: string, dropdownText: string) => {
    cy.get(selector).click();
    cy.byLegacyTestID('dropdown-text-filter').type(dropdownText);
    cy.get('ul[role="listbox"]')
      .find('li')
      .contains(dropdownText)
      .click();
  },
);
