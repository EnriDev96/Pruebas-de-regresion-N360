import { validationReporter } from "../../support/utils/validationReporter";
import GeneracionRolPage from "../../support/page-objects/actions/rol_de_pagoPages/generacionRolPages/generacionRolPage";
describe("Generacion del Rol", () => {
  const genRol = new GeneracionRolPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Generar Rol de Pagos Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolMensualJulio);
      cy.wait(15000);
    });
  });
  it("Aprobar Rol de Pagos Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.aprobarRol();
    });
  });
  it("Descargar reporte del Rol de Pagos Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });
  });

  it("Generar Rol de Pagos Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolQincenalAgosto);
      cy.wait(5000);
    });
  });
  it("Aprobar reporte del Rol de Pagos Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQincenalAgosto);
      genRol.aprobarRol();
    });
  });
  it("Descargar reporte del Rol de Pagos Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQincenalAgosto);
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });
  });

  it("Teardown Rol de Pagos Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQincenalAgosto);
      genRol.revertirRol();
      genRol.eliminarRol();
    });
  });

  it("Teardown Rol de Pagos Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.revertirRol();
      genRol.eliminarRol();
    });
  });
});
