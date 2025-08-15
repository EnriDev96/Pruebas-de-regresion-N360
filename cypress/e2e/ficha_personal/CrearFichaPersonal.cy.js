import { validationReporter } from "../../support/utils/validationReporter";
import FichaPersonalPage from "../../support/page-objects/actions/fichaPersonalPage/FichaPersonalPage";

describe("Ficha Personal - Crear y Eliminar Ficha Personal del Empleado", () => {
  const fichaPersonal = new FichaPersonalPage();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    // Reporta y falla si hay errores
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it.only("1. Crear Ficha Personal de un Empleado", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonalCompleta(data.empleadoValidoCompleto);
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
