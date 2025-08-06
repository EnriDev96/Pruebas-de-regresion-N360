class ValidationReporter {
  constructor() {
    this.errors = [];
    this.isReporting = false; // Flag to indicate if we are in the process of reporting errors
  }

  addError(message) {
    this.errors.push(message);
  }

  addErrorFromCypress(err) {
    this.errors.push(err.message);
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  clearErrors() {
    this.errors = [];
    this.isReporting = false; // Reset the flag
  }

  // Method to report all errors at the end of the test
  reportAndAssertAll() {
    if (this.hasErrors()) {
      const errorMessage = `Validation errors found:\n${this.errors.join(
        "\n"
      )}`;
      cy.log(`🚨 ${errorMessage}`); // Log errors to Cypress Test Runner

      // Set the flag to true before making an assertion that is expected to fail
      this.isReporting = true;
      // This assertion will fail, and the 'fail' event will be triggered
      cy.wrap(this.getErrors(), { log: false }).should("be.empty");
    } else {
      cy.log("✅ All validations passed successfully.");
    }
  }
}

export const validationReporter = new ValidationReporter();
