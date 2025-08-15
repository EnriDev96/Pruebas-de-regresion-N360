import { validationReporter } from "../../support/utils/validationReporter";
import GeneracionRolPage from "../../support/page-objects/actions/rol_de_pagoPages/generacionRolPages/generacionRolPage";
describe("Generacion del Rol", () => {
  const genRol = new GeneracionRolPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Generar Rol de Pagos Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolMensualJulio);
      cy.wait(15000);
    });
  });
  it("Descargar reporte del Rol de Pagos Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.aprobarRol();
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });
  });

  it("Generar Rol de Pagos Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolQincenalAgosto);
      cy.wait(15000);
    });
  });
  it("Descargar reporte del Rol de Pagos Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQincenalAgosto);
      genRol.aprobarRol();
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });
  });
});
