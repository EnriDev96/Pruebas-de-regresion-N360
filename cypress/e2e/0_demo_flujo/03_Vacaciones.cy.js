import VacacionesPage from "../../support/page-objects/actions/vacacionesPages/vacacionesPage";
describe("Vacaciones", () => {
  const vacaciones = new VacacionesPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it.only("Solicitar y Registrar Vacaciones Normales", () => {
    //Set-up Data
    //Flujo
    vacaciones.goToVacaciones();
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/vacacionesFixtures/vacacionFixture").then(
      (dataSolicitud) => {
        vacaciones.solicitarVacacionNormal(dataSolicitud.vacacionesNormales);
      }
    );
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        cy.fixture("dataFixtures/vacacionesFixtures/vacacionFixture").then(
          (dataSolicitud) => {
            vacaciones.registroVacacionNormal(
              data.Bayas_Israel,
              dataSolicitud.vacacionesNormales
            );
          }
        );
      }
    );

    //Comprobacion al Rol

    //Teardown Data
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        vacaciones.goToVacaciones();
        vacaciones.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/vacacionesFixtures/vacacionFixture").then(
      (dataSolicitud) => {
        vacaciones.eliminarVacacionRegistrada(dataSolicitud.vacacionesNormales);
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
