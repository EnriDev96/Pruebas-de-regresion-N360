import { validationReporter } from "../../../../support/utils/validationReporter";
import GeneracionRolPage from "../../../../support/page-objects/actions/rol_de_pagoPages/generacionRolPages/generacionRolPage";
import GeneracionAsientoContable from "../../../../support/page-objects/actions/asientoContablePages/asientoContablePage";
describe("Asientos Contables", () => {
  const genRol = new GeneracionRolPage();
  const asiento = new GeneracionAsientoContable();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});
  it("Setup Data", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolMensualJulio);
      cy.wait(15000);
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolQincenalAgosto);
      cy.wait(5000);
    });
  });
  it("Generar y descargar Asiento Contable Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(data.rolMensualJulio);
      cy.wait(1000);
      asiento.buscarAsientoContable(data.rolMensualJulio);
      asiento.descargarAsientoContable();
      cy.wait(2000);
    });
  });
  it("Generar y descargar Asiento Contable Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(data.rolQincenalAgosto);
      cy.wait(5000);
      asiento.buscarAsientoContable(data.rolQincenalAgosto);
      asiento.descargarAsientoContable();
    });
  });

  it("Teardown Asiento Contable Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.buscarAsientoContable(data.rolQincenalAgosto);
      asiento.eliminarAsientoContable();
    });
  });
  it("Teardown Asiento Contable Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.buscarAsientoContable(data.rolMensualJulio);
      asiento.eliminarAsientoContable();
    });
  });
  it("Teardown Data", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQincenalAgosto);
      genRol.eliminarRol();
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.eliminarRol();
    });
  });
});
