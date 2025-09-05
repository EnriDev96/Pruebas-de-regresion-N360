require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../utils/validationReporter";
import { validacion } from "../../utils/validacionCampos";
import { helper } from "../../utils/helpers";

class anticiposValidation {
  goToAnticipos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.get(".q-popover > :nth-child(7) > .q-btn").click();
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
  validarAnticipo(data) {
    this.seleccionarMotivo(data.motivo);
    this.seleccionarFecha(data.fecha);
    // this.seleccionarBeneficio(data.beneficio);
    this.ingresarMonto(data.monto);
    //this.seleccionarRol(data.rol);
    this.marcarAutorizacion(data.autorizacion);
    //Generar Solicitud
    //cy.xpath("(//div[contains(.,'Guardar')])[46]").click();
    cy.wait(1000);
    // cy.get(".q-alert-content > div", { timeout: 5000 }).then(($els) => {
    //   const match = $els
    //     .toArray()
    //     .some((el) => el.innerText.trim().includes("Guardado..."));
    //   if (!match) {
    //     cy.log("✅ No permite general la Solicitud ✅");
    //   } else {
    //     validationReporter.addError(
    //       '❌ Error: Si se generó la Solicitud ❌" |'
    //     );
    //   }
    // });
  }
  seleccionarMotivo(motivo) {
    cy.xpath(
      "(//div[contains(.,'Motivo de anticipo|arrow_drop_down')])[12]"
    ).click();
    if (!validacion.campoObligatorio(motivo, "Motivo de anticipo")) {
      return;
    }
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'][contains(.,'${motivo}')]`,
      "Motivo de anticipo",
      motivo
    );
  }
  seleccionarFecha(fecha) {
    if (!validacion.campoObligatorio(fecha, "Día del anticipo")) {
      return;
    }
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Día del anticipo|arrow_drop_down')]"
    ).click();

    helper.seleccionarFecha(fecha);
  }
  seleccionarBeneficio(beneficio) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Beneficio|Rol de pagosarrow_drop_down')]"
    ).click();
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'][contains(.,'${beneficio}')]`,
      "Beneficio",
      beneficio
    );
  }
  ingresarMonto(monto) {
    if (!validacion.campoObligatorio(monto, "Monto")) {
      return;
    }
    cy.xpath("//input[contains(@step,'0.01')]").clear().type(monto);
    validacion.valorMonetario("//input[contains(@step,'0.01')]", "Monto");
  }
  seleccionarRol(rol) {
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Rol|Fin de mesarrow_drop_down')]"
    ).click();
    validacion.correctaSeleccion(
      `//div[@class='q-item-label'][contains(.,'${rol}')]`,
      "Rol",
      rol
    );
  }
  marcarAutorizacion(autorizacion) {
    if (autorizacion === "Si") {
      cy.xpath(
        "(//i[@aria-hidden='true'][contains(.,'check_box_outline_blank')])[3]"
      ).click();
      cy.log(`✅ Checkbox marcado: ${autorizacion}`);
    }
    return this;
  }
}

export default anticiposValidation;
