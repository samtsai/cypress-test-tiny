/// <reference types="cypress" />
describe("page", () => {
  it("works", () => {
    cy.visit("http://localhost:8080");

    cy.contains("Confirm").click();
    cy.contains("Alert").click();
  });
});
