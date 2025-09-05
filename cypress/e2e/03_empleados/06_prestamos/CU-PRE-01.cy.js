import { validationReporter } from "../../../support/utils/validationReporter";
import PrestamosPage from "../../../support/page-objects/actions/prestamosPages/PrestamosPage";
describe("CP-PRE-0101 - Guardar configuración básica con valores válidos", () => {
  const prestamos = new PrestamosPage();
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });
  it("Ingresar a configuracion y modificar los valores pretederminados", () => {
    cy.fixture("dataFixtures/configuracionEmpresasFixtures/prestamos").then(
      (dataConfigPrestamo) => {
        prestamos.configurarPrestamo(
          dataConfigPrestamo.configPrestamosModificado
        );
      }
    );
  });
  it("Verificar los valores modificados en la solicitud", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (dataEmpleado) => {
        prestamos.goToPrestamos();
        prestamos.seleccionarEmpleado(dataEmpleado.Bayas_Israel);
        cy.fixture("dataFixtures/configuracionEmpresasFixtures/prestamos").then(
          (dataConfigPrestamo) => {
            prestamos.verificarConfiguracion(
              dataEmpleado.Bayas_Israel,
              dataConfigPrestamo.configPrestamosModificado
            );
          }
        );
      }
    );
  });
  it("Teardow Data - Regresar la configuracion original", () => {
    cy.fixture("dataFixtures/configuracionEmpresasFixtures/prestamos").then(
      (dataConfigPrestamo) => {
        prestamos.configurarPrestamo(
          dataConfigPrestamo.configPrestamosOriginal
        );
      }
    );
  });
});

describe("CP-PRE-0103 - configuracion con valores invalidos", () => {
  const prestamos = new PrestamosPage();
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });
  it("Ingresar Valores con formatos invalidos a la configuracion de Prestamos", () => {
    cy.fixture("dataFixtures/configuracionEmpresasFixtures/prestamos").then(
      (dataConfigPrestamo) => {
        prestamos.configurarPrestamo(
          dataConfigPrestamo.configPrestamosInvalido
        );
      }
    );
  });
  it("Teardow Data - Regresar la configuracion original", () => {
    cy.fixture("dataFixtures/configuracionEmpresasFixtures/prestamos").then(
      (dataConfigPrestamo) => {
        prestamos.configurarPrestamo(
          dataConfigPrestamo.configPrestamosOriginal
        );
      }
    );
  });
});
