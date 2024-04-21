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

      dishesCleanup(): Chainable<void>;

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

Cypress.Commands.add("dishesCleanup", () => {
  cy.visit("/dishes");

  cy.getCy("dishListName").then((elements) => {
    elements.toArray().forEach((element) => {
      if (element.textContent === "<No Name>") {
        cy.deleteDish("<No Name>");
      } else if (element.textContent.startsWith("cy_")) {
        cy.deleteDish(element.textContent);
      }
    });
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
    if (proteins) {
      cy.getCy("proteinsInput").clear().type(proteins);
    }
    if (fats) {
      cy.getCy("fatsInput").clear().type(fats);
    }
    if (carbs) {
      cy.getCy("carbsInput").clear().type(carbs);
    }
    if (calories) {
      cy.getCy("caloriesInput").clear().type(calories);
    }
    cy.getCy("saveBtn").click();
  },
);

Cypress.Commands.add("deleteDish", (name: string) => {
  cy.on("window:confirm", (str) => true);
  cy.contains(name).should("be.visible").click();
  cy.getCy("deleteDishBtn").click();
});

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
