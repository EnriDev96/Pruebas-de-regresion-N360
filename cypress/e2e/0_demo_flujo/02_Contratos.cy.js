import FichaPersonalPage from "../../support/page-objects/actions/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/actions/contratosPages/ContratoPage";

describe("Contrato", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {});

  it("Setup Data @setup", () => {
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.crearFichaPersonalBasica(data.empleadoUno);
      }
    );
  });

  it("Crear Contrato a Nuevo Empleado @e2e @contrato✅", () => {
    contrato.goToContratos();
    cy.xpath("(//div[contains(.,'addcontrato')])[13]").click();
    cy.wait(3000);

    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        contrato.seleccionarEmpleado(data.empleadoUno);
      }
    );
    cy.fixture("dataFixtures/contratosFixtures/contratos").then(
      (dataContrato) => {
        contrato.crearContrato(dataContrato.contratoDemoBasico);
      }
    );
  });

  it("Teardown Contrato", () => {
    contrato.goToContratos();
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        contrato.buscarFichaPorCedula(data.empleadoUno);
        contrato.eliminarContrato();
      }
    );
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.buscarFichaPorCedula(data.empleadoUno);
        fichaPersonal.eliminarFichaPersonal();
      }
    );
  });
});
