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

  it.only("Solicitar y Registrar Prestamo", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.goToPrestamos();
            prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
            prestamos.solicitarPrestamo(dataPrestamo.prestamoDosCuotas);
            // prestamos.resgistrarPrestamoSolicitado(data.Bonilla_Cynthia);
            // prestamos.verificarPrestamo(
            //   dataPrestamo.prestamoNormal,
            //   data.Bonilla_Cynthia
            // );
          }
        );
      }
    );
  });

  it("Verificar Prestamo generado en Rol de Pagos", () => {
    //Setup Data
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolQuincenalJulio);
      cy.wait(10000);
    });
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
              dataRol.rolQuincenalJulio,
              dataEmpleado.Bonilla_Cynthia,
              dataPrestamo.prestamoNormal
            );
          }
        );
      });
    });
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((dataRol) => {
      cy.fixture(
        "dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa"
      ).then((dataEmpleado) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.verificarPrestamoRolMensual(
              dataRol.rolMensualJulio,
              dataEmpleado.Bonilla_Cynthia,
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
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQuincenalJulio);
      genRol.eliminarRol();
    });
  });

  it("Teardown Prestamo", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
        cy.wait(500);
        prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.eliminarPrestamoRegistrado(dataPrestamo.prestamoNormal);
          }
        );
      }
    );
  });
});
