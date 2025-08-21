import { validationReporter } from "../../support/utils/validationReporter";
import prestamosValidation from "../../support/page-objects/validaciones/PrestamosValidation";
describe("Validaciones de Formulario", () => {
  const prestamos = new prestamosValidation();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Campos Obligatorios", () => {});

  it.only("Formato de Campos", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        prestamos.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/prestamosFixtures/validationPerstamoFixture").then(
      (dataPrestamo) => {
        prestamos.validarPrestamo(dataPrestamo.prestamoNormalInvalid);
      }
    );
  });
});
