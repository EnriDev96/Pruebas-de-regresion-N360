import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacaciones = new VacacionesPage();

  beforeEach(() => {
    cy.loginNomina360("adminLogos");
  });

  it("1. Crear Ficha Personal Basica de un Empleado", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonal(data.empleadoUno);
    });
  });

  it("2. Crear Contrato Basico de un Empleado", () => {
    cy.fixture("contratos").then((dataContrato) => {
      contrato.goToContratos();
      contrato.contratoUnoLogos(dataContrato.contratoUnoLogos);
      contrato.verContratoUno();
    });
  });

  it.only("3. Regsitrar Vacaciones - Normales", () => {
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.vacacionNormalAraujo();
      cy.wait(2000);
      vacaciones.rechazoVacacionNormal(dataEmpleado.Araujo_Zambrano);
    });
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("4. Registrar Préstamos", () => {});
});
