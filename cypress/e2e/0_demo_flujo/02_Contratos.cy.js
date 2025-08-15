import { validationReporter } from "../../support/utils/validationReporter";
import FichaPersonalPage from "../../support/page-objects/actions/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/actions/contratosPages/ContratoPage";

describe("Contrato", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Data Ficha Personal @setup ✅", () => {
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.crearFichaPersonalBasica(data.empleadoUno);
      }
    );
  });

  it("Crear Contrato a Nuevo Empleado @e2e @contrato✅", () => {
    cy.fixture("dataFixtures/contratosFixtures/contratos").then(
      (dataContrato) => {
        contrato.goToContratos();
        contrato.crearContrato(dataContrato.contratoDemoBasico);
      }
    );
  });
});
