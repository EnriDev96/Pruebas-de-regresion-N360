import { validationReporter } from "../../support/utils/validationReporter";
import ContratoPage from "../../support/page-objects/actions/contratosPages/ContratoPage";

describe("02. Contrato", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("crear Ficha Personal @setup ✅", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonalBasica(data.empleadoUno);
    });
  });

  it("Crear Contrato a Nuevo Empleado @e2e @contrato✅", () => {
    cy.fixture("contratos").then((dataContrato) => {
      contrato.goToContratos();
      contrato.crearContrato(dataContrato.contratoDemoBasico);
    });
  });
});
