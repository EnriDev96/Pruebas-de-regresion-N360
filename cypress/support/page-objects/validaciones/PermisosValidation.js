require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../utils/validationReporter";
import { validacion } from "../../utils/validacionCampos";
import { helper } from "../../utils/helpers";

class permisosValidation {
  goToPermisos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'settingsConfiguración')]").click({
      force: true,
    });
    cy.wait(1000);
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Permisos')]"
    ).click();
    cy.wait(1000);
  }
  seleccionarEmpleado(dataEmpleado) {
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'search')])[1]").click();
    cy.xpath("(//input[contains(@placeholder,'Buscar')])[1]").type(
      dataEmpleado.cedula
    );
    cy.scrollTo("top");
    cy.wait(1000);
    cy.xpath(
      `(//div[contains(.,'${dataEmpleado.nombreCompleto}')])[17]`
    ).click();
    cy.scrollTo("top");
    cy.wait(500);
  }

  solicitarPermisoMaterno(data) {
    //Ingresar Informacion
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Tipo de Solicitud')]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${data.tipo}')]`
    ).click();
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Fecha del permiso')]"
    ).click();
    //❌Pendiente de Corregir❌
    // Por algun motivo no permite guardar el permiso sin antes ecocger la fecha actual
    cy.xpath(
      "//div[@class='row items-center content-center justify-center cursor-pointer text-primary q-datetime-day-today']"
    ).click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > :nth-child(2) > .row.col > .q-field-content > .q-if > .q-icon"
    ).click();
    //❌Fin del Warning❌
    this.seleccionarFecha(data.fechaInicio);
    cy.get(".q-uploader-input").selectFile(data.comprobante);
    cy.scrollTo("top", { easing: "linear", duration: 1000 });
    cy.xpath(
      "//div[@class='col-xs-12 col-sm-6 col-md-4 col-lg-3'][contains(.,'saveGuardar')]"
    ).click();
    cy.wait(500);
  }

  validarPermisoMedico(data) {
    this.seleccionarTipo();
    this.seleccionarMotivo();
    this.seleccionarFechaInicio();
    this.seleccionarFechaFinal();
    this.subircomprobante();
    cy.scrollTo("top", { easing: "linear", duration: 1000 });
    cy.xpath(
      "//div[@class='col-xs-12 col-sm-6 col-md-4 col-lg-3'][contains(.,'saveGuardar')]"
    ).click();
    cy.wait(500);
  }

  validarPermisoOtros(data) {
    this.seleccionarTipo(data.tipo);
    this.seleccionarMotivo(data.motivo);
    this.seleccionarTipoPlazo(data.tipoPlazo);
    this.ingresarPlazo(data.plazo);
    this.seleccionarFechaInicio(data.fechaInicio);
    this.subircomprobante(data.comprobante);
    cy.scrollTo("top", { easing: "linear", duration: 1000 });
  }

  seleccionarTipo(tipo) {
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Tipo de Solicitud')]"
    ).click();
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${tipo}')]`).click();
  }
  seleccionarMotivo(motivo) {
    cy.xpath(
      "//div[@tabindex='0'][contains(.,'|MotivoMotivoarrow_drop_down')]"
    ).click();
    cy.xpath(`//div[@class='q-item-label'][contains(.,'${motivo}')]`).click();
  }
  seleccionarTipoPlazo(tipoPlazo) {
    cy.xpath(
      "//div[@class='row no-wrap relative-position'][contains(.,'Tipo de plazo')]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${tipoPlazo}')]`
    ).click();
  }
  ingresarPlazo(plazo) {
    cy.xpath(
      `//div[@tabindex='-1'][contains(.,'|PlazoPlazo')]//input[@type='number']`
    ).type(plazo, { force: true });
    validacion.valorMonetario(
      "//div[@tabindex='-1'][contains(.,'|PlazoPlazo')]//input[@type='number']",
      "Plazo"
    );
  }
  seleccionarFechaInicio(fechaInicio) {
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Fecha del permiso')]"
    ).click();
    helper.seleccionarFecha(fechaInicio);
  }
  seleccionarFechaFinal(fechaFinal) {
    cy.xpath(
      "//div[@class='q-if-label'][contains(.,'Fecha de finalización')]"
    ).click();
    helper.seleccionarFecha(fechaFinal);
  }
  subircomprobante(comprobante) {
    cy.get(".q-uploader-input").selectFile(comprobante);
  }
}

export default permisosValidation;
