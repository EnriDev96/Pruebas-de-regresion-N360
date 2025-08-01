import FichaPersonalPage from "../../support/page-objects/fichaPersonalPage/FichaPersonalPage";
import ContratoPage from "../../support/page-objects/contratosPages/ContratoPage";
import VacacioPage from "../../support/page-objects/vacacionesPages/vacacionesPage";
import PrestamosPage from "../../support/page-objects/PrestamosPages/PrestamosPage";
import AnticiposPage from "../../support/page-objects/anticiposPages/anticiposPage";
import PermisoPage from "../../support/page-objects/permisosPages/permisosPage";

describe("Limpieza de Datos", () => {
  const fichaPersonal = new FichaPersonalPage();
  const contrato = new ContratoPage();
  const vacacion = new VacacioPage();
  const prestamos = new PrestamosPage();
  const anticipo = new AnticiposPage();
  const permisos = new PermisoPage();

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

  it.only("3. ELiminar Vacacion", () => {
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      vacacion.goToVacaciones();
      vacacion.seleccionarEmpleado(dataEmpleado.Araujo_Zambrano);
      vacacion.eliminarVacacionRegistrada(dataEmpleado.Araujo_Zambrano);
    });
  });
  it.only("4. ELiminar Prestamo", () => {
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      prestamos.goToPrestamos();
      prestamos.eliminarPrestamoRegistrado(dataEmpleado.Araujo_Zambrano);
    });
  });

  it.only("5. ELiminar Anticipo", () => {
    anticipo.goToAnticipos();
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      anticipo.eliminarAnticipoRegistrado(dataEmpleado.Araujo_Zambrano);
    });
  });

  it("6. ELiminar Registros", () => {
    //Eliminar Permiso Materno
    cy.fixture("empleadosLogos").then((dataEmpleado) => {
      permisos.goToPermisos();
      permisos.eliminarPermisos(dataEmpleado.Armijo_Maria);
    });
  });
});
