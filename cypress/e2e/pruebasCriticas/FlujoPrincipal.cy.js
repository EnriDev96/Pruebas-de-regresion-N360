import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacaciones = new VacacionesPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();

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

  it("3. Regsitrar Vacaciones - Normales", () => {
    //Solicitar y Rechazar
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.vacacionNormalAraujo();
      vacaciones.rechazoVacacionNormal(dataEmpleado.Araujo_Zambrano);
    });
    //Generar y Registrar
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.vacacionNormalAraujo();
      vacaciones.registroVacacionNormal();
    });
  });

  it("4. Registrar Préstamos", () => {
    //Solicitar y Rechazar
    prestamos.goToPrestamos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    });
    prestamos.solicitarPrestamo();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.rechazoPrestamoSolicitado(dataEmpleado.Araujo_Zambrano);
    });
    //Solicitar y Registrar
    prestamos.goToPrestamos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    });
    prestamos.solicitarPrestamo();
    prestamos.resgistrarPrestamoSolicitado();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.visualizarPrestamo(dataEmpleado.Araujo_Zambrano);
    });
  });

  it.only("5. Registrar Anticipos", () => {
    //Solicitar y Registrar Anticipo
    anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      // anticipo.solicitarAnticipo(dataEmpleado.Araujo_Zambrano);
      // anticipo.registrarAnticipo();
    });
    //Visualizar Anticipo Generado
    //anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.visualizarAnticipo(dataEmpleado.Araujo_Zambrano);
    });
  });
});
