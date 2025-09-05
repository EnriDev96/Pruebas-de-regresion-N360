import FichaPersonalValidation from "../../support/page-objects/validaciones/FichaPersonalValidation";
import { validationReporter } from "../../support/utils/validationReporter";

describe("Validaciones de Formulario", () => {
  const fichaPersonal = new FichaPersonalValidation();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Campos Obligatorios", () => {
    cy.fixture(
      "dataFixtures/fichaPersonalFixtures/validationFichaPersonal"
    ).then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.validarCamposFichaPersonal(data.empleadoEmpty);
    });
  });
  it("Formato de Campos", () => {
    cy.fixture(
      "dataFixtures/fichaPersonalFixtures/validationFichaPersonal"
    ).then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.validarCamposFichaPersonal(data.empleadoInvalido);
    });
  });
});
