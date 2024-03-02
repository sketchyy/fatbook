describe("dishes", () => {
  beforeEach(() => {
    cy.loginAsTestUser();

    cy.visit("/dishes");
  });

  it("should create new dish", () => {
    cy.contains("New").click();
  });

  it.skip("should create new dish with ingredients", () => {
    // cy.contains("Login").click();
  });
});
