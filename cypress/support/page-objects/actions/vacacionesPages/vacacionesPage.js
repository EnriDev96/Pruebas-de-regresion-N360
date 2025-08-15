require("cypress-xpath");
require("cypress-plugin-tab");
class vacacionesPage {
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

  solicitarVacacionNormal() {
    cy.xpath("(//div[contains(.,'Generar')])[179]").click();
    cy.xpath("(//div[contains(.,'Normal')])[18]").click();
    cy.xpath("(//div[contains(.,'Periodo')])[61]").click();
    cy.xpath("(//div[contains(.,'2024-2025')])[30]").click();
    cy.xpath("(//div[contains(.,'Fecha de inicio')])[16]").click();
    cy.xpath(
      "//div[@class='row items-center content-center justify-center cursor-pointer'][contains(.,'14')]"
    ).click();
    cy.xpath("(//div[contains(.,'Días normales disponibles')])[16]").click();
    cy.xpath("//div[@class='q-item-label'and text()='5']").click();
    cy.xpath("(//div[contains(.,'Generar')])[195]").click();
    cy.wait(1000);
  }

  registroVacacionNormal(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.get(".text-principal > .q-btn-inner > div").click();
    cy.get(".modal-buttons > :nth-child(2)").click();
    cy.wait(1000);
  }

  rechazoVacacionNormal(dataEmpleado) {
    cy.get(".gutter-sm > :nth-child(1) > .q-btn").click();
    cy.wait(1000);
    cy.get(
      ".q-table-top > :nth-child(3) > .q-if > .q-if-inner > .row > .col"
    ).type(dataEmpleado.apellido, { force: true });
    cy.xpath("(//div[contains(.,'rechazar')])[14]").click();
    cy.xpath("(//input[contains(@type,'text')])[15]").type(
      "Pruebas Automatizadas QA"
    );
    cy.xpath("//button[contains(.,'Si')]").click();
    cy.wait(1000);
  }

  eliminarVacacionRegistrada() {
    cy.xpath("//button[@tabindex='0'][contains(.,'Historico')]").click();
    cy.xpath("(//i[@aria-hidden='true'][contains(.,'delete')])[2]").click();
    cy.xpath("//button[@tabindex='0'][contains(.,'Si')]").click();
    cy.wait(1000);
  }
}

export default vacacionesPage;
