/// <reference types="cypress" />
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsTestUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginAsTestUser", () => {
  cy.visit("/login-with-password");

  cy.get('input[type="email"]').type(Cypress.env("testUserEmail"));
  cy.get('input[type="password"]').type(Cypress.env("testUserPassword"));
  cy.get("button").click();

  cy.contains("Fatbook").should("exist");
  cy.contains("Summary").should("exist");
  cy.contains("Breakfast").should("exist");
});
