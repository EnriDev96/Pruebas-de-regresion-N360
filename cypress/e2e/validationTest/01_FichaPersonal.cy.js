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
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.validarCamposFichaPersonal(data.empleadoEmpty);
    });
  });
  it.only("Formato de Campos", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.validarCamposFichaPersonal(data.empleadoInvalido);
    });
  });
});
