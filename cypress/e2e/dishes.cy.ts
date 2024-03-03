describe("dishes", () => {
  beforeEach(() => {
    cy.contains("Dishes").click();
  });

  it("should create/update/delete simple dish", () => {
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

  it.skip("should create new dish with ingredients", () => {
    // cy.contains("Login").click();
  });
});
