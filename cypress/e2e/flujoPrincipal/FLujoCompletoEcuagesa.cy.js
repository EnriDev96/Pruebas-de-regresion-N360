import { validationReporter } from "../../support/utils/validationReporter";
import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacionesPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/prestamosPages/PrestamosPage";
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
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    // Reporta y falla si hay errores
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Flujo Completo en Ecuagesa", () => {
    cy.log("✅✅ 1. Crear Ficha Personal ✅✅");
    cy.wait(3000);
    cy.fixture("fichaPersonal").then((data) => {
      fichaPersonal.goToFichaPersonal();
      fichaPersonal.crearFichaPersonal(data.empleadoUno);
    });

    cy.log("✅✅ 2. Crear Contrato ✅✅");
    cy.wait(3000);
    cy.fixture("contratos").then((dataContrato) => {
      contrato.goToContratos();
      contrato.crearContrato(dataContrato.contratoUnoEcuagesa);
    });

    cy.log("✅✅ 3. Registrar Vacaciones ✅✅");
    cy.wait(3000);
    cy.fixture("empleadosEcuagesa").then((dataEmpleado) => {
      vacaciones.goToVacaciones();
      vacaciones.seleccionarEmpleado(dataEmpleado.Bayas_Israel);
      vacaciones.solicitarVacacionNormal();
      vacaciones.registroVacacionNormal(dataEmpleado.Bayas_Israel);
    });

    cy.log("✅✅ 4. Registrar Prestamos ✅✅");
    cy.wait(3000);
    cy.fixture("empleadosEcuagesa").then((dataEmpleado) => {
      prestamos.goToPrestamos();
      prestamos.solicitarPrestamo(dataEmpleado.Bayas_Israel);
      prestamos.goToPrestamos();
      prestamos.resgistrarPrestamoSolicitado(dataEmpleado.Bayas_Israel);
    });

    cy.log("✅✅ 5. Registrar Anticipos ✅✅");
    cy.wait(3000);
    cy.fixture("empleadosEcuagesa").then((dataEmpleado) => {
      anticipo.goToAnticipos();
      anticipo.solicitarAnticipo(dataEmpleado.Bayas_Israel);
      anticipo.goToAnticipos();
      anticipo.registrarAnticipo();
    });

    cy.log("✅✅ 6.1 Registrar Permiso Médico ✅✅");
    cy.wait(3000);
    cy.fixture("empleadosEcuagesa").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.solicitarPermisoMedico(dataEmpleado.Bayas_Israel);
      permisos.goToPermisos();
      permisos.registrarPermiso(dataEmpleado.Bayas_Israel);
    });

    cy.log("✅✅ 6.2 Registrar Permiso de Maternidad ✅✅");
    cy.wait(3000);
    cy.fixture("empleadosEcuagesa").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.solicitarPermisoMaterno(dataEmpleado.Cevallos_Monica);
      permisos.goToPermisos();
      permisos.registrarPermiso(dataEmpleado.Cevallos_Monica);
    });

    cy.log("✅✅ 7.1 Preparar Rol de Pagos Mensual ✅✅");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(dataGenRol.rolMensualJulio);
      prepRol.descargarBorradorRol();
      cy.wait(25000);
    });

    cy.log("✅✅ 7.2 Preparar Rol de Pagos Quincenal ✅✅");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      prepRol.goToPreparacionDelRol();
      prepRol.seleccionarTipoRol(dataGenRol.rolQincenalAgosto);
      prepRol.descargarBorradorRol();
      cy.wait(5000);
    });

    cy.log("✅✅ 8.1 Generar Rol de Pagos Mensual ✅✅");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(dataGenRol.rolMensualJulio);
      cy.wait(25000);
      genRol.buscarRol(dataGenRol.rolMensualJulio);
      genRol.aprobarRol();
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });

    cy.log("✅✅ 8.2 Generar Rol de Pagos Quincenal ✅✅");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(dataGenRol.rolQincenalAgosto);
      cy.wait(15000);
      genRol.buscarRol(dataGenRol.rolQincenalAgosto);
      genRol.aprobarRol();
      genRol.descargarRolGeneral();
      cy.wait(5000);
    });

    cy.log("✅✅ 9.1 Generar Asiento Contable Mensual✅✅");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(dataGenRol.rolMensualJulio);
      cy.wait(1000);
      asiento.descargarAsientoContable(dataGenRol.rolMensualJulio);
      cy.wait(2000);
    });

    cy.log("✅✅ 9.2 Generar Asiento Contable Quincenal");
    cy.wait(3000);
    cy.fixture("genRol").then((dataGenRol) => {
      asiento.goToAsientoContable();
      asiento.generarAsientoContable(dataGenRol.rolQincenalAgosto);
      cy.wait(7000);
      asiento.descargarAsientoContable(dataGenRol.rolQincenalAgosto);
    });
  });
});
