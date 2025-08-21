import { validationReporter } from "../../support/utils/validationReporter";
import anticiposValidation from "../../support/page-objects/validaciones/AnticiposValidation";
describe("Validaciones de Formulario", () => {
  const anticipo = new anticiposValidation();

  beforeEach(() => {
    cy.loginNomina360("adminEcuagesa");
  });

  afterEach(() => {
    validationReporter.reportAndAssertAll();
    validationReporter.clearErrors();
  });

  it("Campos Obligatorios", () => {
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
    cy.fixture("dataFixtures/anticiposFixtures/validationAnticipos").then(
      (dataAnticipo) => {
        anticipo.validarAnticipo(dataAnticipo.anticipoNormalEmpty);
      }
    );
  });
});
