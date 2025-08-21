import FichaPersonalValidation from "../../support/page-objects/validaciones/FichaPersonalValidation";
import FichaPersonalPage from "../../support/page-objects/actions/fichaPersonalPage/FichaPersonalPage";
import { validationReporter } from "../../support/utils/validationReporter";

describe("Validaciones de Formulario", () => {
  const contrato = new FichaPersonalValidation();
  const fichaPersonal = new FichaPersonalPage();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Setup Data @setup", () => {
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.crearFichaPersonalBasica(data.empleadoUno);
      }
    );
  });
  it("Campos Obligatorios", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.validarCamposFichaPersonal(data.empleadoEmpty);
    });
  });
  it("Formato de Campos", () => {
    cy.fixture("validationFixtures/fichaPersonal").then((data) => {
      fpValidation.goToFichaPersonal();
      fpValidation.validarCamposFichaPersonal(data.empleadoInvalido);
    });
  });
  it("Teardown Data", () => {
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.buscarFichaPorCedula(data.empleadoUno);
        fichaPersonal.eliminarFichaPersonal();
      }
    );
  });
});
