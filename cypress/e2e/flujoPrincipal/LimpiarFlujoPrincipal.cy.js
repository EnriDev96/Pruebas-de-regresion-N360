import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";

describe("Limpieza de Datos", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();

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
  it("4. ELiminar Prestamo", () => {
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.eliminarPrestamoRegistrado(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("5. ELiminar Anticipo", () => {
    anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.eliminarAnticipoRegistrado(dataEmpleado.Araujo_Zambrano);
    });
  });
});
