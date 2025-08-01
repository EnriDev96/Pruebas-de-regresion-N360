import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";
import PermisosPage from "../../support/page-objects/permisosPages/permisosPage";
import PreparacionRolPage from "../../support/page-objects/rol_de_pagoPages/preparacionRolPages/preparacionRolPage";
import GeneracionRolPage from "../../support/page-objects/rol_de_pagoPages/generacionRolPages/generacionRolPage";
import generacionAsientoContable from "../../support/page-objects/asientoContablePages/asientoContablePage";

describe("Configuracion Inicial", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacaciones = new VacacionesPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();
  const permisos = new PermisosPage();
  const prepRol = new PreparacionRolPage();
  const genRol = new GeneracionRolPage();
  const asiento = new generacionAsientoContable();

  beforeEach(() => {
    cy.loginNomina360("adminLogos");
  });

  it.only("Flujo Completo", () => {
    cy.log("✅✅ 1. Crear Ficha Personal ✅✅");
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonal(data.empleadoUno);
    });

    cy.log("✅✅ 2. Crear Contrato ✅✅");
    cy.wait(5000);
    cy.fixture("contratos").then((dataContrato) => {
      contrato.goToContratos();
      contrato.contratoUnoLogos(dataContrato.contratoUnoLogos);
      contrato.verContratoUno();
    });

    cy.log("✅✅ 3. Registrar Vacaciones ✅✅");
    cy.wait(5000);
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacaciones.goToVacaciones();
      vacaciones.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacaciones.solicitarVacacionNormal();
      vacaciones.registroVacacionNormal(dataEmpleado.Araujo_Zambrano);
    });

    cy.log("✅✅ 4. Registrar Prestamos ✅✅");
    cy.wait(5000);
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.goToPrestamos();
      prestamos.solicitarPrestamo(dataEmpleado.Araujo_Zambrano);
      prestamos.goToPrestamos();
      prestamos.resgistrarPrestamoSolicitado(dataEmpleado.Araujo_Zambrano);
      prestamos.goToPrestamos();
      prestamos.visualizarPrestamo(dataEmpleado.Araujo_Zambrano);
    });

    cy.log("✅✅ 5. Registrar Anticipos ✅✅");
    cy.wait(5000);
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.goToAnticipos();
      anticipo.solicitarAnticipo(dataEmpleado.Araujo_Zambrano);
      anticipo.goToAnticipos();
      anticipo.registrarAnticipo();
      anticipo.goToAnticipos();
      anticipo.visualizarAnticipo(dataEmpleado.Araujo_Zambrano);
    });

    cy.log("✅✅ 6.1 Registrar Permiso Médico ✅✅");
    cy.wait(5000);
    //Permisos con Licencia Medica
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.solicitarPermisoMedico(dataEmpleado.Araujo_Zambrano);
      permisos.goToPermisos();
      permisos.registrarPermiso(dataEmpleado.Araujo_Zambrano);
      permisos.goToPermisos();
      permisos.visualizarPermisos(dataEmpleado.Araujo_Zambrano, "Médico");
    });
    cy.log("✅✅ 6.2 Registrar Permiso de Maternidad ✅✅");
    cy.wait(5000);
    //Permisos de Maternidad
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.solicitarPermisoMaterno(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.registrarPermiso(dataEmpleado.Armijo_Maria);
      permisos.goToPermisos();
      permisos.visualizarPermisos(dataEmpleado.Armijo_Maria, "Maternidad");
    });

    cy.log("✅✅ 7.Preparar Rol de Pagos ✅✅");
    cy.wait(5000);
    //Rol de Pago Quincenal
    cy.fixture("genRol").then((dataGenRol) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(dataGenRol.rolQincenalAgosto);
      prepRol.descargarBorradorRol();
    });

    //Rol de Pago Mensual
    cy.fixture("genRol").then((dataGenRol) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(dataGenRol.rolMensualJulio);
      prepRol.descargarBorradorRol();
    });

    cy.log("✅✅ 8.Generar Rol de Pagos ✅✅");
    cy.wait(5000);
    //Rol de Pago Mensual
    cy.fixture("genRol").then((dataGenRol) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(dataGenRol.rolMensualJulio);
      genRol.buscarRol(dataGenRol.rolMensualJulio);
      genRol.aprobarRol();
      cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
      cy.wait(1000);
      genRol.descargarRolGeneral();
    });

    //Rol de Pago Quincenal
    cy.fixture("genRol").then((dataGenRol) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(dataGenRol.rolQincenalAgosto);
      genRol.buscarRol(dataGenRol.rolQincenalAgosto);
      genRol.aprobarRol();
      genRol.descargarRolGeneral();
    });

    cy.log("✅✅ 9.Generar Asiento Contable ✅✅");
    cy.wait(5000);
    cy.fixture("genRol").then((dataGenRol) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(dataGenRol.rolMensualJulio);
      asiento.descargarAsientoContable(dataGenRol.rolMensualJulio);
    });
  });
});
