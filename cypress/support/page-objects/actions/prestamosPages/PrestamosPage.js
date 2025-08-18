require("cypress-xpath");
require("cypress-plugin-tab");
class prestamosPage {
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
  solicitarPrestamo(data) {
    cy.xpath("//div[@tabindex='-1'][contains(.,'|MotivoMotivo')]").type(
      data.motivo
    );
    cy.xpath("//div[@class='q-if-label'][contains(.,'Fecha')]").click();
    this.seleccionarFecha(data.fecha);

    cy.xpath("//div[@class='q-if-label'][contains(.,'Monto')]").type(
      data.monto
    );
    cy.xpath(
      "//div[@class='row no-wrap relative-position'][contains(.,'Cuotas')]"
    ).click();
    cy.xpath("(//div[@class='q-item-label'][contains(.,'1')])[1]").click();
    cy.xpath("//div[@class='q-if-label'][contains(.,'Interés')]").type(
      data.interes
    );
    cy.get(
      ".q-field-content > :nth-child(1) > .q-option-inner > .q-radio-unchecked"
    ).click();
    cy.scrollTo("top");
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
  }

  resgistrarPrestamoSolicitado(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addPor registrar')]").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido);
    cy.wait(1000);
    cy.xpath("//button[@tabindex='0'][contains(.,'registrar')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }

  rechazoPrestamoSolicitado(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath(
      "//div[@class='q-btn-inner row col items-center q-popup--skip justify-center'][contains(.,'Prestamos')]"
    ).click();
    cy.get(".gutter-sm > :nth-child(2) > .q-btn").click();
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.get(".text-apropadores > .q-btn-inner > div").click();
    cy.get(
      ".modal-content > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("Pruebas QA");
    cy.get(".modal-buttons > .text-positive").click();
    cy.wait(1000);
  }

  eliminarPrestamoRegistrado(data) {
    cy.xpath("//div[@class='q-table-control'][contains(.,'|search')]").type(
      data.fecha
    );
    cy.xpath("//button[contains(.,'Pagar')]").click();
    cy.xpath("//div[@class='q-if-label'][contains(.,'Valor a pagar')]").type(
      data.monto
    );
    cy.xpath("//div[@class='q-if-label'][contains(.,'Observación')]").type(
      "Prueba E2E QA"
    );
    cy.xpath(
      "//div[@class='text-center full-width'][contains(.,'Generar Pago')]"
    ).click();
    cy.wait(500);
    cy.xpath("//button[@tabindex='0'][contains(.,'Eliminar')]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }

  visualizarPrestamo(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'visibilitypréstamos')]").click();
    cy.wait(500);
    this.seleccionarEmpleado(dataEmpleado);

    cy.get(
      ":nth-child(1) > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("120");
    cy.wait(2000);
  }

  seleccionarFecha(data) {
    const [anio, mes, dia] = data.split("-");
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
    cy.xpath("(//span[@tabindex='-1'])[3]").click();
    cy.xpath(`(//div[contains(.,'${anio}')])[46]`).click();
    cy.xpath(`(//div[contains(.,'${mesNombre}')])[20]`).click();
    cy.xpath(
      `//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'${parseInt(
        dia,
        10
      )}')]`
    ).click();
  }
}

export default prestamosPage;
