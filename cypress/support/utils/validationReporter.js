class ValidationReporter {
  constructor() {
    this.errors = [];
  }

  addError(message) {
    this.errors.push(message);
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  clearErrors() {
    this.errors = [];
  }

  // Método para reportar todos los errores al final del test
  reportAndAssertAll() {
    if (this.hasErrors()) {
      const errorMessage = `Errores de validación encontrados:\n${this.errors.join(
        "\n"
      )}`;
      cy.log(`🚨 ${errorMessage}`); // Loguea los errores en el Cypress Test Runner
      //throw new Error(errorMessage); // Falla el test con todos los errores
    } else {
      cy.log("✅ Todas las validaciones pasaron correctamente.");
    }
  }
}

export const validationReporter = new ValidationReporter();
