// cypress/support/index.js

Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific error message related to @fortawesome/fontawesome-free/css/all.min.css
    if (err.message.includes("Cannot find module '@fortawesome/fontawesome-free/css/all.min.css'")) {
      return false;
    }
    // Let other errors fail the test
    return true;
  });