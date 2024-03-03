/// <reference types="cypress" />
export {};

type NutritionFacts = {
  proteins?: string;
  fats?: string;
  carbs?: string;
  calories?: string;
};

type CreateDishArgs = NutritionFacts & {
  name: string;
  portionSize?: string;
};

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsTestUser(): Chainable<void>;

      getCy(testId: string): Chainable<JQuery<HTMLElement>>;

      fillDishForm(args: CreateDishArgs): Chainable<void>;

      deleteDish(name: string): Chainable<void>;

      shouldHaveNutritionFacts(nutritionFacts: NutritionFacts): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginAsTestUser", () => {
  cy.visit("/");

  cy.contains("Fatbook").should("exist");

  cy.url().then((url) => {
    console.log("URL", url);
    if (url.includes("/login")) {
      cy.visit("/login-with-password");
      cy.get('input[type="email"]').type(Cypress.env("testUserEmail"));
      cy.get('input[type="password"]').type(Cypress.env("testUserPassword"));
      cy.get("button").click();
    }
    cy.contains("Summary").should("exist");
    cy.contains("Breakfast").should("exist");
  });
});

Cypress.Commands.add("getCy", (testId: string, ...args) => {
  return cy.get(`[data-testid=${testId}]`, ...args);
});

Cypress.Commands.add(
  "fillDishForm",
  ({ name, proteins, fats, carbs, calories }) => {
    cy.getCy("nameInput").should("be.visible").should("be.enabled");
    cy.wait(500);
    cy.getCy("nameInput").clear().type(name);
    cy.getCy("proteinsInput").clear().type(proteins);
    cy.getCy("fatsInput").clear().type(fats);
    cy.getCy("carbsInput").clear().type(carbs);
    cy.getCy("caloriesInput").clear().type(calories);
    cy.getCy("saveBtn").click();
  },
);

Cypress.Commands.add(
  "shouldHaveNutritionFacts",
  { prevSubject: true },
  (subject, { proteins, fats, carbs, calories }) => {
    cy.wrap(subject)
      .parent()
      .parent()
      .within(() => {
        cy.getCy("nutritionFacts").should(
          "have.text",
          `⚡ ${calories} kcal🥩 ${proteins} g🧈 ${fats} g🍚 ${carbs} g`,
        );
      });
  },
);
