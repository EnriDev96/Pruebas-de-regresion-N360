require("cypress-xpath");
require("cypress-plugin-tab");

class anticiposPage {
  goToAnticipos() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.get(".q-popover > :nth-child(7) > .q-btn").click();
    cy.wait(1000);
  }
  solicitarAnticipo(dataEmpleado) {
    cy.xpath("(//div[contains(.,'addRegistrar')])[14]").click();
    cy.wait(500);
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
    cy.xpath(
      "(//div[contains(.,'Motivo de anticipo|arrow_drop_down')])[12]"
    ).click();
    cy.xpath(
      "//div[@class='q-item-label'][contains(.,'ANTICIPO DE SUELDO')]"
    ).click();
    cy.xpath(
      "//div[@class='col-md-4 col-xs-12'][contains(.,'Día del anticipo|arrow_drop_down')]"
    ).click();
    cy.xpath(
      "(//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'5')])[1]"
    ).click();
    cy.xpath("(//input[@type='number'])[7]").type("250");
    cy.xpath(
      "(//i[@aria-hidden='true'][contains(.,'check_box_outline_blank')])[3]"
    ).click();
    cy.xpath("(//div[contains(.,'Guardar')])[46]").click();
  }
  registrarAnticipo(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(2) > .q-btn").click();
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("250");
    cy.get(".text-principal").click();
    cy.get(".modal-buttons > :nth-child(2)").click();
  }
  visualizarAnticipo(dataEmpleado) {
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
    cy.get(
      ":nth-child(1) > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("250");
    cy.wait(500);
    cy.xpath("(//div[contains(.,'Ver')])[16]").scrollIntoView({
      easing: "linear",
      duration: 1000,
    });
    cy.xpath("(//div[contains(.,'Ver')])[16]").click();
  }
  eliminarAnticipoRegistrado(dataEmpleado) {
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
    cy.get(
      ":nth-child(1) > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type("250");
    cy.wait(500);
    cy.xpath("(//div[contains(.,'Eliminar')])[16]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
  }
}

export default anticiposPage;
