import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const prestamos = new PrestamosPage();

  beforeEach(() => {
    cy.loginNomina360("adminLogos");
  });

  it("1. Crear Contrato Basico de un Empleado", () => {
    contrato.goToContratos();
    contrato.eliminarContrato();
  });

  it("2. Eliminar Ficha Personal de un Empleado Sin Contrato", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.buscarFichaPorCedula(data.empleadoUno);
      fichaPersonal.eliminarFichaPersonal();
    });
  });

  it.only("4. ELiminar Prestamo", () => {
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.eliminarPrestamoRegistrado(dataEmpleado.Araujo_Zambrano);
    });
  });
});
