import "./commands";
import "@shelex/cypress-allure-plugin";
import { validationReporter } from "../support/utils/validationReporter";

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

// Listener to catch Cypress assertion failures
Cypress.on('fail', (err, runnable) => {
  // If the reporter is currently asserting its errors, we should not suppress the failure.
  // Instead, we let the test fail as intended to report the collected errors.
  if (validationReporter.isReporting) {
    // Returning true or not returning anything will cause the test to fail.
    return;
  }

  // If it's a regular assertion failure, add it to our reporter
  validationReporter.addErrorFromCypress(err);

  // Return false to prevent Cypress from failing the test immediately.
  // This allows the test to continue and collect more errors.
  return false;
});

// Hook that runs after each test
afterEach(() => {
  // Report all validation errors and fail the test if any exist
  validationReporter.reportAndAssertAll();
  // Clear errors for the next test
  validationReporter.clearErrors();
});
