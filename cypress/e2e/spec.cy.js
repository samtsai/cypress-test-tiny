/// <reference types="cypress" />

import { stubUnload } from "../support/e2e";

describe("page", () => {
  beforeEach(() => {
    stubUnload();
  });

  it("works", () => {
    cy.visit("http://localhost:8080");

    cy.contains("Confirm").click();
    cy.contains("Alert").click();

    cy.reload();
    cy.get("@returnValue")
      .should("have.been.calledOnce")
      .and("be.calledWithExactly", "ask user");
  });
});
