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
  }
  solicitarPrestamo() {
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
  }
  resgistrarPrestamoSolicitado() {}
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
  }
  eliminarPrestamoRegistrado() {}
}

export default prestamosPage;
