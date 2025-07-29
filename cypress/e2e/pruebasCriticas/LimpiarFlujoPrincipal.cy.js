import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
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

  it("3. ELiminar Prestamo", () => {});
});
