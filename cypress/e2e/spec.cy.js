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

  it("works in iFrame", () => {
    cy.visit("http://localhost:8080", {
      onBeforeLoad: (contentWindow) => {
        // contentWindow is the remote page's window object
        cy.stub(contentWindow, "alert").as("textareaWindowAlert");
        cy.stub(contentWindow, "confirm").as("windowConfirm");
      },
    });

    cy.get("iframe").then(($iframe) => {
      const $body = $iframe.contents().find("body");
      const $win = $iframe[0].contentWindow;
      cy.stub($win, "confirm")
        .callsFake(() => true)
        .as("windowConfirm");

      cy.wrap($body)
        .contains("Confirm in iFrame")
        .click()
        .should(function () {
          expect(this.windowConfirm).to.be.calledWith(
            "Cypress should auto confirm from iFrame"
          );
        });
    });
  });
});
