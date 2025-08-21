import { validationReporter } from "../../support/utils/validationReporter";
import AnticiposPage from "../../support/page-objects/actions/anticiposPages/anticiposPage";
describe("Anticipos", () => {
  const anticipo = new AnticiposPage();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {});

  it("Solicitar y Registrar Anticipo ✅", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        anticipo.goToAnticipos();
        cy.xpath(
          "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'addAnticipos')]"
        ).click();
        cy.wait(500);
        anticipo.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/anticiposFixtures/anticipoFixture").then(
      (dataAnticipo) => {
        anticipo.solicitarAnticipo(dataAnticipo.anticipoNormal);
        anticipo.goToAnticipos();
        anticipo.registrarAnticipo(dataAnticipo.anticipoNormal);
      }
    );
  });

  it("Teardown Anticipos", () => {
    cy.fixture("dataFixtures/empleadosEmpresaFixtures/empleadosEcuagesa").then(
      (data) => {
        anticipo.goToAnticipos();
        anticipo.seleccionarEmpleado(data.Bayas_Israel);
      }
    );
    cy.fixture("dataFixtures/anticiposFixtures/anticipoFixture").then(
      (dataAnticipo) => {
        anticipo.eliminarAnticipoRegistrado(dataAnticipo.anticipoNormal);
      }
    );
  });
});
