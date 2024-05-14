// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

const stubUnload = () => {
  const returnValueStub = cy.stub().as("returnValue");

  cy.on("window:before:load", (win) => {
    let userCallback, ourCallback;
    Object.defineProperty(win, "onbeforeunload", {
      get() {
        return ourCallback;
      },
      set(cb) {
        userCallback = cb;
        console.log("user callback", cb);

        ourCallback = (e) => {
          console.log("proxy beforeunload event", e);

          // prevent the application code from assigning value
          Object.defineProperty(e, "returnValue", {
            get() {
              return "";
            },
            set: returnValueStub,
          });

          const result = userCallback(e);
          return result;
        };

        // https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
        win.addEventListener("beforeunload", ourCallback);
      },
    });
  });
};

const stubAlert = (contentWindow) => {
  cy.stub(contentWindow, "alert").as("windowAlert");
  return contentWindow;
};

export { stubAlert, stubUnload };
