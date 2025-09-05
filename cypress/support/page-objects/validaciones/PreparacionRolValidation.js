import { validacion } from "../../utils/validacionCampos";
require("cypress-xpath");
require("cypress-plugin-tab");

class preparacionRolValidation {
  goToPreparacionDelRol() {
    cy.xpath("//button[@tabindex='0'][contains(.,'Roles de pago')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Preparación de roles')]").click();
    cy.wait(1000);
  }
  seleccionarTipoRol(dataRol) {
    cy.xpath("(//div[contains(.,'Agosto')])[25]").click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.mes}')]`
    ).click();
    cy.xpath(
      "(//div[contains(.,'|RolFin de mesRolarrow_drop_down')])[19]"
    ).click();
    cy.xpath(
      `//div[@class='q-item-label'][contains(.,'${dataRol.tipo}')]`
    ).click();
  }

  seleccionarEmpleado(dataEmpleado) {
    cy.xpath("//button[@tabindex='0'][contains(.,'search')]").click();
    cy.xpath("//input[contains(@placeholder,'buscar empleado')]").type(
      dataEmpleado.cedula
    );
    cy.intercept("POST", "**/collect").as("clarityCollect");
    cy.xpath(
      `//div[@class='q-item-sublabel ellipsis'][contains(.,'${dataEmpleado.cedula}')]`
    ).click();
    cy.wait("@clarityCollect").then((interception) => {
      expect(interception.response.statusCode).to.eq(204);
    });
  }
  verificarRubros(rubro) {
    cy.wait(3000);
    //Rubros de Ingresos
    this.ingresarRubro(rubro.alimentacion);
    this.ingresarRubro(rubro.comision);
    this.ingresarRubro(rubro.bonificacionDesempeño);
    this.ingresarRubro(rubro.retroactivo);
    this.ingresarRubro(rubro.devolucionAportable);
    this.ingresarRubro(rubro.otrosIngresos);
    this.ingresarRubro(rubro.movilizacion);
    this.ingresarRubro(rubro.otrosIngresosNoAportables);
    this.ingresarRubro(rubro.horas25);
    this.ingresarRubro(rubro.horas50);
    this.ingresarRubro(rubro.horas100);
    this.ingresarRubro(rubro.ajusteIR);
    //Rubros de Egresos
    cy.xpath("//div[@data-tab-name='egreso'][contains(.,'Egresos')]").click();
    this.ingresarRubro(rubro.prestamoHipotecario);
    this.ingresarRubro(rubro.prestamoQuirografario);
    this.ingresarRubro(rubro.atrasos);
    this.ingresarRubro(rubro.telefonia);
    this.ingresarRubro(rubro.descuentoEquipoTecnico);
    this.ingresarRubro(rubro.faltasInjustificadas);
    this.ingresarRubro(rubro.seguroSalud);
    this.ingresarRubro(rubro.descuentoFR);
    this.ingresarRubro(rubro.descuentoHoras);
    this.ingresarRubro(rubro.otrosDescuentos);
  }
  ingresarRubro(rubro) {
    const campo = cy
      .contains(".q-if-label", rubro.nombre)
      .should("have.text", rubro.nombre)
      .parents(".q-field")
      .find("input, textarea")
      .type(rubro.valor, { force: true });
    validacion.valorMonetarioCy(campo, rubro.nombre);
  }
}

export default preparacionRolValidation;
