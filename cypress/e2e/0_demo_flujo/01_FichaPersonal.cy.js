import { validationReporter } from "../../support/utils/validationReporter";
import FichaPersonalPage from "../../support/page-objects/actions/fichaPersonalPage/FichaPersonalPage";
describe("Ficha Personal", () => {
  const fichaPersonal = new FichaPersonalPage();

  beforeEach(() => {
    cy.loginNomina360();
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Crear Ficha Personal Basica ✅", () => {
    cy.fixture("dataFixtures/fichaPersonalFixtures/fichapersonal").then(
      (data) => {
        fichaPersonal.goToFichaPersonal();
        fichaPersonal.crearFichaPersonalBasica(data.empleadoUno);
      }
    );
  });
});
