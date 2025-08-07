require("cypress-xpath");
require("cypress-plugin-tab");
import { validationReporter } from "../../../support/utils/validationReporter";

class ContratoPageValidation {
  goToContratos() {
    cy.xpath("//div[normalize-space()='Contratos']").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Contratos')]").click();
    cy.wait(1000);
  }

  crearContrato(data) {
    cy.xpath("(//div[contains(.,'addcontrato')])[13]").click();
    cy.wait(3000);
    this.seleccionarEmpleado();
    this.seleccionarFechaIngreso(data.fechaIngreso);
  }

  seleccionarEmpleado() {
    cy.xpath("(//input[contains(@type,'text')])[4]").type("1104730229");
    cy.xpath(
      "//div[@class='q-item-sublabel'][contains(.,'1104730229')]"
    ).click();
  }

  seleccionarFechaIngreso(fechaIngreso) {
    // Validar que el campo reciba un valor
    if (!fechaIngreso || fechaIngreso.trim() === "") {
      validationReporter.addError(`❌Campo "Fecha de Ingreso" vacío|`);
      cy.log(
        `❌ El campo "Fecha de Ingreso" es requerido y no puede estar vacío`
      );
      return this;
    }
    const [anio, mes, dia] = fechaIngreso.split("-");
    const meses = [
      "",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    const mesNombre = meses[parseInt(mes, 10)];
    cy.xpath(
      "(//div[contains(.,'Fecha de ingreso :|arrow_drop_down')])[9]"
    ).click();
    cy.xpath("(//span[contains(@tabindex,'-1')])[3]").click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${anio}')]`
    ).click();
    cy.xpath(
      `//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'${mesNombre}')]`
    ).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'${parseInt(
        dia,
        10
      )}')]`
    ).click();
    cy.log(`✅ Fecha de Nacimiento seleccionada correctamente`);
    return this;
  }
}

export default ContratoPageValidation;
