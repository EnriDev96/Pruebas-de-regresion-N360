import { validationReporter } from "../../support/utils/validationReporter";
import permisosValidation from "../../support/page-objects/validaciones/PermisosValidation";
describe("Validaciones de Formulario", () => {
  const permisos = new permisosValidation();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Formato de Campos", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        permisos.goToPermisos();
        permisos.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/permisosFixtures/validationPermisosFixture").then(
      (dataPermiso) => {
        permisos.validarPermisoOtros(dataPermiso.permisoOtrosInvalid);
      }
    );
  });
});
