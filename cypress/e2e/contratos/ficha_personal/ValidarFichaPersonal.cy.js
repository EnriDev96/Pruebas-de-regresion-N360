import FichaPersonalValidation from "../../../support/page-objects/fichaPersonalPage/FichaPersonalPageValidation";
import { validationReporter } from "../../../support/utils/validationReporter";

describe("Ficha Personal - Crear y Eliminar Ficha Personal del Empleado", () => {
  const fpValidation = new FichaPersonalValidation();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    // Reporta y falla si hay errores
    validationReporter.reportAndAssertAll();
  });

  it("1 Validar Campos Ficha Personal Ivalido", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.crearFichaPersonal(data.empleadoInvalido);
    });
  });
  it("2 Validar Campos Ficha Personal", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.crearFichaPersonal(data.empleadoUno);
    });
  });
  it("3 Otra prueba", () => {
    cy.fixture("fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      cy.log("Paso a la siguiente Prueba");
    });
  });
});
