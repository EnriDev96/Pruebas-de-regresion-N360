import { validationReporter } from "../../support/utils/validationReporter";
import GeneracionAsientoContable from "../../support/page-objects/actions/asientoContablePages/AsientoContablePage";
describe("Asientos Contables", () => {
  const asiento = new GeneracionAsientoContable();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Generar y descargar Asiento Contable Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(data.rolMensualJulio);
      cy.wait(1000);
      asiento.descargarAsientoContable(data.rolMensualJulio);
      cy.wait(2000);
    });
  });

  it("Generar y descargar Asiento Contable Quincenal ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(data.rolQincenalAgosto);
      cy.wait(7000);
      asiento.descargarAsientoContable(data.rolQincenalAgosto);
    });
  });
});
