import FichaPersonalValidation from "../../support/page-objects/validaciones/fichaPersonalValidation/FichaPersonalValidation";
import { validationReporter } from "../../support/utils/validationReporter";

describe("Validaciones de Formulario", () => {
  const fpValidation = new FichaPersonalValidation();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Campos Obligatorios", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.validarCamposFichaPersonal(data.empleadoEmpty);
    });
  });
  it("Formato de Campos", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.validarCamposFichaPersonal(data.empleadoInvalido);
    });
  });
});
