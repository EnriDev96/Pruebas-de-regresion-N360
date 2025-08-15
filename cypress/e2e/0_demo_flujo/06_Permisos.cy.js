import { validationReporter } from "../../support/utils/validationReporter";
import PermisosPage from "../../support/page-objects/actions/permisosPages/permisosPage";
describe("Permisos", () => {
  const permisos = new PermisosPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Solicitar y Registrar Permiso Medico ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.goToPermisos();
        permisos.solicitarPermisoMedico(data.Bayas_Israel);
        permisos.goToPermisos();
        permisos.registrarPermiso(data.Bayas_Israel);
      }
    );
  });

  it("Solicitar y Registrar Permiso de Maternidad ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.goToPermisos();
        permisos.solicitarPermisoMaterno(data.Cevallos_Monica);
        permisos.goToPermisos();
        permisos.registrarPermiso(data.Cevallos_Monica);
      }
    );
  });
});
