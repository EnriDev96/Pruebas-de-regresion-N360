import { validationReporter } from "../../support/utils/validationReporter";
import PreparacionRolPage from "../../support/page-objects/actions/rol_de_pagoPages/preparacionRolPages/preparacionRolPage";
describe("Preparacion del Rol", () => {
  const prepRol = new PreparacionRolPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Preparar y descargar borrador del Rol de Pagos Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(data.rolMensualJulio);
      prepRol.descargarBorradorRol();
      cy.wait(25000);
    });
  });

  it("Preparar y descargar borrador del Rol de Pagos Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(data.rolQincenalAgosto);
      prepRol.descargarBorradorRol();
      cy.wait(5000);
    });
  });
});
