import { validationReporter } from "../../support/utils/validationReporter";
import PermisosPage from "../../support/page-objects/actions/permisosPages/permisosPage";
describe("Permisos", () => {
  const permisos = new PermisosPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Solicitar y Registrar Permiso Medico ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.goToPermisos();
        permisos.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture("dataFixtures/permisosFixtures/permisoFixture").then(
          (dataPermiso) => {
            permisos.solicitarPermisoMedico(dataPermiso.permisoLicenciaMedica);
          }
        );
        permisos.registrarPermiso(data.Bayas_Israel);
      }
    );
  });
  it("Teardown Permiso Medico", () => {
    permisos.goToPermisos();
    cy.xpath(
      "//div[@class='col-xs-4 col-md-3'][contains(.,'visibilityPermiso')]"
    ).click();
    cy.wait(500);
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/permisosFixtures/permisoFixture").then(
      (dataPermiso) => {
        permisos.eliminarPermisos(dataPermiso.permisoLicenciaMedica);
      }
    );
  });

  it("Solicitar y Registrar Permiso de Maternidad ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.goToPermisos();
        permisos.seleccionarEmpleado(data.Cevallos_Monica);
        cy.fixture("dataFixtures/permisosFixtures/permisoFixture").then(
          (dataPermiso) => {
            permisos.solicitarPermisoMaterno(dataPermiso.permisoMaternidad);
          }
        );
        permisos.registrarPermiso(data.Cevallos_Monica);
      }
    );
  });

  it("Teardown Permiso de Maternidad", () => {
    permisos.goToPermisos();
    cy.xpath(
      "//div[@class='col-xs-4 col-md-3'][contains(.,'visibilityPermiso')]"
    ).click();
    cy.wait(500);
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.seleccionarEmpleado(data.Cevallos_Monica);
      }
    );
    cy.fixture("dataFixtures/permisosFixtures/permisoFixture").then(
      (dataPermiso) => {
        permisos.eliminarPermisos(dataPermiso.permisoMaternidad);
      }
    );
  });
});
