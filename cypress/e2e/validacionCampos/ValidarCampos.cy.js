import FichaPersonalValidation from "../../support/page-objects/fichaPersonalPage/FichaPersonalPageValidation";
import ContratoPageValidation from "../../support/page-objects/contratosPages/ContratoPageValidation";
import { validationReporter } from "../../support/utils/validationReporter";

describe("Validaciones de Campos de Formularios", () => {
  const fpValidation = new FichaPersonalValidation();
  const conValidation = new ContratoPageValidation();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    // Reporta y falla si hay errores
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("1 Validar Campos Ficha Personal Ivalido", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.crearFichaPersonal(data.empleadoInvalido);
    });
  });
  it("2 Validar Campos Ficha Personal", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.crearFichaPersonal(data.empleadoUno);
    });
  });
  it("3 Validar Campos Contrato Invalido", () => {
    cy.fixture("contratos").then((dataContrato) => {
      conValidation.goToContratos();
      conValidation.crearContrato(dataContrato.contratoDemoInvalido);
    });
  });

  it("4 Validar Campos Contrato", () => {
    cy.fixture("contratos").then((dataContrato) => {
      conValidation.goToContratos();
      conValidation.crearContrato(dataContrato.contratoDemo);
    });
  });
});
