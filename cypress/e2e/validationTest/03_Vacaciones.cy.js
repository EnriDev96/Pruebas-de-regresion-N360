import { validationReporter } from "../../support/utils/validationReporter";
import VacacionesPage from "../../support/page-objects/validaciones/VacacionesValidation";
describe("Validaciones de Formulario", () => {
  const vacaciones = new VacacionesPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Campos Obligatorios", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.goToVacaciones();
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture("dataFixtures/vacacionesFixtures/validationVacaciones").then(
          (dataSolicitud) => {
            vacaciones.validarVacacionNormal(
              dataSolicitud.vacacionesNormalesEmpty
            );
          }
        );
      }
    );
  });
});
