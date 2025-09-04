import { validationReporter } from "../../../support/utils/validationReporter";
import PrestamosPage from "../../../support/page-objects/actions/prestamosPages/PrestamosPage";
import GeneracionRolPage from "../../../support/page-objects/actions/rol_de_pagoPages/generacionRolPages/generacionRolPage";

describe("CP-PRE-0201 - Creación exitosa de un Prestamo Normal con datos Minimos.", () => {
  const prestamos = new PrestamosPage();
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });
  it("Registro de un prestamo normal", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.goToPrestamos();
            prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
            prestamos.solicitarPrestamo(dataPrestamo.prestamoNormal);
            prestamos.resgistrarPrestamoSolicitado(data.Bonilla_Cynthia);
            prestamos.verificarPrestamo(
              dataPrestamo.prestamoNormal,
              data.Bonilla_Cynthia
            );
          }
        );
      }
    );
  });
  it("Teardow Data - Eliminar prestamo registrado", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
        cy.wait(500);
        prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.eliminarPrestamoRegistrado(dataPrestamo.prestamoNormal);
          }
        );
      }
    );
  });
});

describe.only("CP-PRE-0204 - Verificar Prestamo generado en Rol de Pagos", () => {
  const prestamos = new PrestamosPage();
  const genRol = new GeneracionRolPage();
  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });
  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });
  it("Set-up Data - Resgistrar un prestam", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.goToPrestamos();
            prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
            prestamos.solicitarPrestamo(dataPrestamo.prestamoDosCuotas);
            prestamos.resgistrarPrestamoSolicitado(data.Bonilla_Cynthia);
            prestamos.verificarPrestamo(
              dataPrestamo.prestamoDosCuotas,
              data.Bonilla_Cynthia
            );
          }
        );
      }
    );
  });
  it("Set-up Data - Crear Rol de Quincena", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolQuincenalJulio);
      cy.wait(10000);
    });
  });
  it("Set-up Data - Crear Rol de Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.generarTipoRol(data.rolMensualJulio);
      cy.wait(15000);
    });
  });
  it("Verificar Prestamo Registrado en el Rol Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((dataRol) => {
      cy.fixture(
        "dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa"
      ).then((dataEmpleado) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.verificarPrestamoRol(
              dataRol.rolQuincenalJulio,
              dataEmpleado.Bonilla_Cynthia,
              dataPrestamo.prestamoDosCuotas
            );
          }
        );
      });
    });
  });
  it("Verificar Prestamo Registrado en el Rol Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((dataRol) => {
      cy.fixture(
        "dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa"
      ).then((dataEmpleado) => {
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.verificarPrestamoRolMensual(
              dataRol.rolMensualJulio,
              dataEmpleado.Bonilla_Cynthia,
              dataPrestamo.prestamoDosCuotas
            );
          }
        );
      });
    });
  });
  it("Teardow Data - Eliminar Rol Mensual", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolMensualJulio);
      genRol.eliminarRol();
    });
  });
  it("Teardow Data - Eliminar Rol Quincenal", () => {
    cy.fixture("dataFixtures/rolesFixtures/genRol").then((data) => {
      genRol.goToGeneracionDelRol();
      genRol.buscarRol(data.rolQuincenalJulio);
      genRol.eliminarRol();
    });
  });
  it("Teardow Data - Eliminar prestamo Registrado", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        prestamos.goToPrestamos();
        cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
        cy.wait(500);
        prestamos.seleccionarEmpleado(data.Bonilla_Cynthia);
        cy.fixture("dataFixtures/prestamosFixtures/prestamoFixture").then(
          (dataPrestamo) => {
            prestamos.eliminarPrestamoRegistrado(
              dataPrestamo.prestamoDosCuotas
            );
          }
        );
      }
    );
  });
});
