require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../utils/validationReporter";
import { validacion } from "../../utils/validacionCampos";
import { helper } from "../../utils/helpers";
class prestamosValidation {
  goToPrestamos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Prestamos')]"
    ).click();
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
  validarPrestamo(data) {
    this.ingresarMotivo(data.motivo);
    this.seleccionarFecha(data.fecha);
    this.ingresarMonto(data.monto);
    this.seleccionarCuotas(data.cuotas);
    this.ingresarInteres(data.interes);
    this.marcarIngreso(data.ingreso);

    cy.scrollTo("top");
    //cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
  }
  ingresarMotivo(motivo) {
    cy.xpath(
      "//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]//input[@type='text']"
    ).type(motivo, { forece: true });
    validacion.formatoSoloLetras(
      "//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]//input[@type='text']",
      "Nombres"
    );
  }
  seleccionarFecha(fecha) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Fecha')]").click();
    helper.seleccionarFecha(fecha);
  }
  ingresarMonto(monto) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Monto')]").type(monto);
    validacion.valorMonetario("//input[contains(@step,'0.01')]", "Monto");
  }
  seleccionarCuotas(cuotas) {
    cy.xpath(
      `//div[@class='row no-wrap relative-position'][contains(.,'Cuotas')]`
    ).click();
    cy.xpath(
      `(//div[@class='q-item-label'][contains(.,'${cuotas}')])[1]`
    ).click();
  }
  ingresarInteres(interes) {
    cy.xpath("//div[@class='q-if-label'][contains(.,'Interés')]").type(interes);
    validacion.valorMonetario(
      "(//input[contains(@type,'number')])[7]",
      "Interés"
    );
  }
  marcarIngreso(ingreso) {
    if (ingreso === "Si") {
      cy.get(
        ".q-field-content > :nth-child(1) > .q-option-inner > .q-radio-unchecked"
      ).click();
      cy.log(`✅ Checkbox marcado: ${ingreso}`);
    }
    return this;
  }
}

export default prestamosValidation;
