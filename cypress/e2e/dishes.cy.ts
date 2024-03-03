describe("dishes", () => {
  beforeEach(() => {
    cy.contains("Dishes").click();

    cy.cleanup();
  });

  it.skip("should create/update/delete simple dish", () => {
    // create dish
    cy.getCy("newBtn").click();
    cy.fillDishForm({
      name: "cy_hamburger",
      proteins: "10",
      fats: "20",
      carbs: "30",
      calories: "300",
    });
    cy.contains("cy_hamburger").should("be.visible");
    cy.contains("cy_hamburger").shouldHaveNutritionFacts({
      proteins: "10",
      fats: "20",
      carbs: "30",
      calories: "300",
    });

    // Update dish
    cy.contains("cy_hamburger").click();
    cy.fillDishForm({
      name: "cy_hamburger",
      proteins: "11",
      fats: "22",
      carbs: "33",
      calories: "333",
    });
    cy.contains("cy_hamburger").shouldHaveNutritionFacts({
      proteins: "11",
      fats: "22",
      carbs: "33",
      calories: "333",
    });

    // Delete Dish
    cy.deleteDish("cy_hamburger");

    cy.visit("/dishes");
    cy.contains("cy_hamburger").should("not.exist");
  });

  it("should create new dish with ingredients", () => {
    // Create ingredients
    cy.getCy("newBtn").click();
    cy.fillDishForm({
      name: "cy_hamburger",
      proteins: "10",
      fats: "20",
      carbs: "30",
      calories: "300",
    });
    cy.contains("cy_hamburger").should("be.visible");
    cy.getCy("newBtn").click();
    cy.fillDishForm({
      name: "cy_fries",
      proteins: "5",
      fats: "40",
      carbs: "50",
      calories: "500",
    });
    cy.contains("cy_fries").should("be.visible");

    // Create test dish
    cy.getCy("newBtn").click();
    cy.wait(500);
    cy.getCy("nameInput").clear().type("cy_lunch");

    // Select 2 ingredients
    cy.contains("Ingredients").click();
    cy.contains("Add").click();
    cy.getCy("searchBarInput").clear().type("cy_hamburger");
    cy.wait(1000);
    cy.getCy("dishPortionTitle").contains("cy_hamburger").click();
    cy.getCy("portionSizeInput").first().type("200");
    cy.getCy("addDishPortionBtn").first().click({ force: true });
    cy.getCy("searchBarInput").clear().type("cy_fries");
    cy.wait(1000);
    cy.getCy("dishPortionTitle").contains("cy_fries").click();
    cy.getCy("portionSizeInput").eq(1).type("100");
    cy.getCy("addDishPortionBtn").click({ force: true });

    // Check food value
    cy.contains("Dishes").click();
    cy.contains("My Dishes").should("be.visible");
    cy.contains("cy_lunch").shouldHaveNutritionFacts({
      proteins: "8",
      fats: "27",
      carbs: "37",
      calories: "367",
    });

    // Update ingredient weight
    cy.contains("cy_lunch").should("be.visible").click();
    cy.contains("Ingredients").click();
    cy.getCy("dishPortionTitle").contains("cy_hamburger").click();
    cy.getCy("portionSizeInput").eq(1).should("be.visible").clear().type("100");
    cy.getCy("updateDishPortionBtn").eq(1).click({ force: true });

    // Check food value
    cy.contains("Dishes").click();
    cy.contains("My Dishes").should("be.visible");
    cy.contains("cy_lunch").shouldHaveNutritionFacts({
      proteins: "8",
      fats: "30",
      carbs: "40",
      calories: "400",
    });

    // Delete ingredient
    cy.contains("cy_lunch").should("be.visible").click();
    cy.contains("Ingredients").click();
    cy.getCy("dishPortionTitle").contains("cy_hamburger").click();
    cy.getCy("deleteDishPortionBtn").eq(1).click();
    cy.get("button").contains("OK").click();

    // Check food value
    cy.contains("Dishes").click();
    cy.contains("My Dishes").should("be.visible");
    cy.contains("cy_lunch").shouldHaveNutritionFacts({
      proteins: "5",
      fats: "40",
      carbs: "50",
      calories: "500",
    });
  });
});
