describe("dishes", () => {
  beforeEach(() => {
    cy.loginAsTestUser();

    cy.contains("Dishes").click();
  });

  it("should create new dish", () => {
    // create 3 test dishes
    cy.contains("New").click();
    cy.get('input[name="name"]').should("be.visible").should("be.enabled");
    cy.get('input[name="name"]').type("test_hamburger");
    cy.get('input[name="foodValue.proteins"]').type("20");
    cy.get('input[name="foodValue.fats"]').type("30");
    cy.get('input[name="foodValue.carbs"]').type("40");
    cy.get('input[name="foodValue.calories"]').type("300");
    cy.contains("Save").click();
  });

  it.skip("should create new dish with ingredients", () => {
    // cy.contains("Login").click();
  });
});
