require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../utils/validationReporter";
import { validacion } from "../../utils/validacionCampos";
import { helper } from "../../utils/helpers";

class vacacionesValidation {
  goToVacaciones() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Vacaciones')]").click();
    cy.wait(1000);
  }

  seleccionarEmpleado(dataEmpleado) {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      dataEmpleado.cedula
    );
    cy.scrollTo("top");
    cy.xpath(
      `(//div[contains(.,'${dataEmpleado.nombreCompleto}')])[17]`
    ).click();
    cy.scrollTo("top");
    cy.wait(500);
  }

  validarVacacionNormal(data) {
    cy.xpath("(//div[contains(.,'Generar')])[179]").click();
    cy.xpath("(//div[contains(.,'Normal')])[18]").click();

    this.seleccionarPeriodo(data.periodo);
    this.seleccionarFechaInicio(data.fechaInicio);
    this.seleccionarDiasNormales(data.diasDisponibles);

    //Generar Solicitud
    cy.xpath("(//div[contains(.,'Generar')])[195]").click();
    cy.wait(1000);
    cy.get(".q-alert-content > div", { timeout: 5000 }).then(($els) => {
      const match = $els
        .toArray()
        .some((el) => el.innerText.trim().includes("Generado Exitosamente"));
      if (!match) {
        cy.log("✅ No permite general la Solicitud ✅");
      } else {
        validationReporter.addError(
          '❌ Error: Si se generó la Solicitud ❌" |'
        );
      }
    });
  }

  seleccionarPeriodo(periodo) {
    cy.xpath("(//div[contains(.,'Periodo')])[61]").click();
    if (!validacion.campoObligatorio(periodo, "Periodo")) {
      return;
    }
    validacion.correctaSeleccion(
      `(//div[contains(.,'${periodo}')])[30]`,
      "Periodo",
      periodo
    );
  }

  seleccionarFechaInicio(fecha) {
    cy.xpath("(//div[contains(.,'Fecha de inicio')])[16]").click();
    if (!validacion.campoObligatorio(fecha, "Fecha de inicio")) {
      return;
    }
    helper.seleccionarFecha(fecha);
  }

  seleccionarDiasNormales(dias) {
    cy.xpath("(//div[contains(.,'Días normales disponibles')])[16]").click();
    if (!validacion.campoObligatorio(dias, "Días normales disponibles")) {
      return;
    }
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'and text()='${dias}']`,
      "Días normales disponibles",
      dias
    );
  }
}

export default vacacionesValidation;
