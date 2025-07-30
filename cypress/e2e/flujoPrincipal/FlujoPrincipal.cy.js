import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";
import PermisosPage from "../../support/page-objects/permisosPages/permisosPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacaciones = new VacacionesPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();
  const permisos = new PermisosPage();

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
    // //Solicitar y Rechazar
    // vacaciones.goToVacaciones();
    // cy.fixture("empleadosLogos").then((dataEmpleado) => {
    //   vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    //   vacaciones.vacacionNormalAraujo();
    //   vacaciones.rechazoVacacionNormal(dataEmpleado.Araujo_Zambrano);
    // });
    //Generar y Registrar
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.vacacionNormalAraujo();
      vacaciones.registroVacacionNormal();
    });
  });

  it.only("4. Registrar Préstamos", () => {
    // // Solicitar y Rechazar
    // prestamos.goToPrestamos();
    // cy.fixture("empleadosLogos").then((dataEmpleado) => {
    //   prestamos.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    //   prestamos.solicitarPrestamo();
    //   prestamos.rechazoPrestamoSolicitado(dataEmpleado.Araujo_Zambrano);
    // });
    //Solicitar y Registrar
    prestamos.goToPrestamos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      prestamos.solicitarPrestamo();
      prestamos.resgistrarPrestamoSolicitado();
      prestamos.visualizarPrestamo(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("5. Registrar Anticipos", () => {
    //Solicitar y Registrar Anticipo
    anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.solicitarAnticipo(dataEmpleado.Araujo_Zambrano);
      anticipo.registrarAnticipo();
    });
    //Visualizar Anticipo Generado
    anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.visualizarAnticipo(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("6. Registrar Permisos", () => {
    //Permisos de Maternidad
    permisos.goToPermisos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      permisos.solicitarPermisoMaterno(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.registrarPermisoMaterno(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.visualizarPermisos(dataEmpleado.Armijo_Maria);
    });
  });
});
