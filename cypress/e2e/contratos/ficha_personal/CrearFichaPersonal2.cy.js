import FichaPersonalPage from "../../../support/page-objects/FichaPersonalPage";

describe("Ficha Personal - Crear y Eliminar Ficha Personal del Empleado", () => {
  const fichaPersonal = new FichaPersonalPage();

  beforeEach(() => {
    cy.loginNomina360("adminDemo");
  });

  it("1. Crear Ficha Personal de un Empleado", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonal(data.empleadoUno);
    });
  });

  it("2. Eliminar Ficha Personal de un Empleado", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.buscarFichaPorCedula(data.empleadoUno.cedula);
      fichaPersonal.eliminarFichaPersonal();
    });
  });
});
