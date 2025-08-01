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
  solicitarPrestamo(dataEmpleado) {
    this.seleccionarEmpleado(dataEmpleado);
    cy.get(
      ".gutter-md > :nth-child(1) > .q-if > .q-if-inner > .row > .col"
    ).type("Prestamo QA");
    cy.xpath("//div[@class='q-if-label'][contains(.,'Fecha')]").click();
    cy.xpath(
      "//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'15')]"
    ).click();
    cy.get(
      ".gutter-md > :nth-child(3) > .q-field > .row.col > .q-field-content > .q-if > .q-if-inner > .row > .col"
    ).type("120");
    cy.get(":nth-child(4) > .q-if > .q-if-inner > .row").click();
    cy.xpath("(//div[@class='q-item-label'][contains(.,'1')])[1]").click();
    cy.get(
      ":nth-child(1) > :nth-child(5) > .q-if > .q-if-inner > .row > .col"
    ).type("0");
    cy.get(
      ".q-field-content > :nth-child(1) > .q-option-inner > .q-radio-unchecked"
    ).click();
    cy.scrollTo("top");
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
  }

  resgistrarPrestamoSolicitado(dataEmpleado) {
    cy.xpath("//a[@tabindex='0'][contains(.,'addPor registrar')]").click();
    cy.wait(500);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("120");
    cy.wait(500);
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

  eliminarPrestamoRegistrado(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(500);
    this.seleccionarEmpleado(dataEmpleado);

    cy.get(
      ":nth-child(1) > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("120");
    cy.get(".q-btn-group > .text-primary").click();
    cy.get(
      ":nth-child(1) > .q-card > .q-card-main > :nth-child(1) > .row.col > .q-field-content > .q-if > .q-if-inner > .row > .col"
    ).type("120");
    cy.get(
      ".q-card-main > :nth-child(2) > .row.col > .q-field-content > .q-if > .q-if-inner > .row > .col"
    ).type("Prueba QA");
    cy.get(".q-card-actions > .text-center > .q-btn").click();
    cy.wait(1000);
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
}

export default prestamosPage;
