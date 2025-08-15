import FichaPersonalValidation from "../../support/page-objects/validaciones/fichaPersonalValidation/FichaPersonalValidation";
import { validationReporter } from "../../support/utils/validationReporter";

describe("Validaciones de Campos de Formularios", () => {
  const fpValidation = new FichaPersonalValidation();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it.only("1 Validar Campos Obligatorios Ficha Personal", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.validarCamposFichaPersonal(data.empleadoEmpty);
    });
  });
  it("2 Validar Formato de Campos Ficha Personal", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.crearFichaPersonal(data.empleadoInvalido);
    });
  });
});
