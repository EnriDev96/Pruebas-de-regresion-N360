import { validationReporter } from "../../support/utils/validationReporter";
import PrestamosPage from "../../support/page-objects/actions/prestamosPages/PrestamosPage";
describe("Prestamos", () => {
  const prestamos = new PrestamosPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Solicitar y Registrar Prestamo ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        prestamos.seleccionarEmpleado(data.Bayas_Israel);
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.solicitarPrestamo(dataPrestamo.prestamoNormal);
          }
        );
        prestamos.goToPrestamos();
        prestamos.resgistrarPrestamoSolicitado(data.Bayas_Israel);
      }
    );
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
