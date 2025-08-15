import { validationReporter } from "../../support/utils/validationReporter";
import VacacionesPage from "../../support/page-objects/actions/vacacionesPages/vacacionesPage";
describe("Vacaciones", () => {
  const vacaciones = new VacacionesPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Solicitar y Registrar Vacaciones Normales✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.goToVacaciones();
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
        vacaciones.solicitarVacacionNormal();
        vacaciones.registroVacacionNormal(data.Bayas_Israel);
      }
    );
  });
});
