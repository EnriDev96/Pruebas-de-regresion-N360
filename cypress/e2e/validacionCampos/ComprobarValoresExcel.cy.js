import ReportesFichaPersonalPage from "../../support/page-objects/fichaPersonalPage/ReportesFichaPersonalPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new ReportesFichaPersonalPage();

  beforeEach(() => {
    cy.loginNomina360("adminDemo");
  });

  it("1. Validacion de datos Excel", () => {
    fichaPersonal.goToFichaPersonal();
    fichaPersonal.reporteEmpleadosAFecha();
  });
});
