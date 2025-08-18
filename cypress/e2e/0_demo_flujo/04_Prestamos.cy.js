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
        prestamos.solicitarPrestamo(data.Bayas_Israel);
        prestamos.goToPrestamos();
        prestamos.resgistrarPrestamoSolicitado(data.Bayas_Israel);
      }
    );
  });
});
