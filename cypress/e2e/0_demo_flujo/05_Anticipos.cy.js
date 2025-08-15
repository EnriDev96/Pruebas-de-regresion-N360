import { validationReporter } from "../../support/utils/validationReporter";
import AnticiposPage from "../../support/page-objects/actions/anticiposPages/anticiposPage";
describe("Anticipos", () => {
  const anticipo = new AnticiposPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Solicitar y Registrar Anticipo ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        anticipo.goToAnticipos();
        anticipo.solicitarAnticipo(data.Bayas_Israel);
        anticipo.goToAnticipos();
        anticipo.registrarAnticipo();
      }
    );
  });
});
