import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";
import PermisosPage from "../../support/page-objects/permisosPages/permisosPage";
import preparacionRolPage from "../../support/page-objects/rol_de_pagoPages/preparacionRolPages/preparacionRolPage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacaciones = new VacacionesPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();
  const permisos = new PermisosPage();
  const prepRol = new preparacionRolPage();

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
    // //Solicitar y Rechazar
    // vacaciones.goToVacaciones();
    // cy.fixture("empleadosLogos").then((dataEmpleado) => {
    //   vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    //   vacaciones.solicitarVacacionNormal();
    //   vacaciones.rechazoVacacionNormal(dataEmpleado.Araujo_Zambrano);
    // });
    //Solicitar y Registrar
    vacaciones.goToVacaciones();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.solicitarVacacionNormal();
      vacaciones.registroVacacionNormal(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("4. Registrar Préstamos", () => {
    // // Solicitar y Rechazar
    // prestamos.goToPrestamos();
    // cy.fixture("empleadosLogos").then((dataEmpleado) => {
    //   prestamos.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
    //   prestamos.solicitarPrestamo();
    //   prestamos.rechazoPrestamoSolicitado(dataEmpleado.Araujo_Zambrano);
    // });
    //Solicitar y Registrar
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.goToPrestamos();
      prestamos.solicitarPrestamo(dataEmpleado.Araujo_Zambrano);
      prestamos.goToPrestamos();
      prestamos.resgistrarPrestamoSolicitado(dataEmpleado.Araujo_Zambrano);
      prestamos.goToPrestamos();
      prestamos.visualizarPrestamo(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("5. Registrar Anticipos", () => {
    //Solicitar y Registrar Anticipo
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.goToAnticipos();
      anticipo.solicitarAnticipo(dataEmpleado.Araujo_Zambrano);
      anticipo.goToAnticipos();
      anticipo.registrarAnticipo();
    });
    //Visualizar Anticipo Generado
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.goToAnticipos();
      anticipo.visualizarAnticipo(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("6. Registrar Permisos", () => {
    //Permisos de Maternidad
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.solicitarPermisoMaterno(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.registrarPermisoMaterno(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.visualizarPermisos(dataEmpleado.Armijo_Maria);
    });
  });

  it.only("7. Preparar Rol de Pagos", () => {
    //Rol de Pago Mensual
    prepRol.goToPreparacionDelRol();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prepRol.seleccionarEmpleado(dataEmpleado.Armijo_Maria);
    });
    cy.fixture("rol").then((dataRol) => {
      prepRol.modificarValores(dataRol.rolLogos);
    });
    prepRol.descargarBorradorRol();
  });
});
