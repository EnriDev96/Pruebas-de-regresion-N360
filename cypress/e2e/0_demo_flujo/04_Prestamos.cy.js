import { validationReporter } from "../../support/utils/validationReporter";
import PrestamosPage from "../../support/page-objects/actions/prestamosPages/PrestamosPage";
import GeneracionRolPage from "../../support/page-objects/actions/rol_de_pagoPages/generacionRolPages/generacionRolPage";
describe("Prestamos", () => {
  const prestamos = new PrestamosPage();
  const genRol = new GeneracionRolPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Solicitar y Registrar Prestamo ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.goToPrestamos();
            prestamos.seleccionarEmpleado(data.Bayas_Israel);
            prestamos.solicitarPrestamo(dataPrestamo.prestamoNormal);
            prestamos.resgistrarPrestamoSolicitado(data.Bayas_Israel);
            prestamos.verificarPrestamo(
              dataPrestamo.prestamoNormal,
              data.Bayas_Israel
            );
          }
        );
      }
    );
  });

  it("Verificar Prestamo generado en Rol Mensual", () => {
    //Setup Data
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolMensualJulio);
      cy.wait(15000);
    });
    //Flujo
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((dataRol) => {
      cy.fixture(
        "dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa"
      ).then((dataEmpleado) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.verificarPrestamoRolMensual(
              dataRol.rolMensualJulio,
              dataEmpleado.Bayas_Israel,
              dataPrestamo.prestamoNormal
            );
          }
        );
      });
    });

    //Teardown Data
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.eliminarRol();
    });
  });

  it("Teardown Prestamo", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
        cy.wait(500);
        prestamos.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.eliminarPrestamoRegistrado(dataPrestamo.prestamoNormal);
          }
        );
      }
    );
  });
});
