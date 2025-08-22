import { validationReporter } from "../../support/utils/validationReporter";
import PreparacionRolPage from "../../support/page-objects/validaciones/PreparacionRolValidation";
describe("Preparacion del Rol", () => {
  const prepRol = new PreparacionRolPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Preparar y descargar borrador del Rol de Pagos Mensual ✅", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(data.rolMensualJulio);
    });
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prepRol.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/rubrosEmpresa").then(
      (dataRubros) => {
        prepRol.verificarRubros(dataRubros.rubrosEcuagesaInvalid);
      }
    );
  });
});
