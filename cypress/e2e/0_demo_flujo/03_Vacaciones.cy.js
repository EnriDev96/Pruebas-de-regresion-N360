import { validationReporter } from "../../support/utils/validationReporter";
import VacacionesPage from "../../support/page-objects/actions/vacacionesPages/vacacionesPage";
describe("Vacaciones", () => {
  const vacaciones = new VacacionesPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Solicitar y Registrar Vacaciones Normales✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.goToVacaciones();
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture(
          "dataFixtures/vacacionesFixtures/vacacionNormalFixture"
        ).then((dataSolicitud) => {
          vacaciones.solicitarVacacionNormal(dataSolicitud.vacacionesNormales);
        });
        vacaciones.registroVacacionNormal(data.Bayas_Israel);
      }
    );
  });

  it("Teardown Vacacion Registrada", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.goToVacaciones();
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture("dataFixtures/vacacionesFixtures/vacacionFixture").then(
          (dataSolicitud) => {
            vacaciones.eliminarVacacionRegistrada(
              dataSolicitud.vacacionesNormales
            );
          }
        );
      }
    );
  });
});
