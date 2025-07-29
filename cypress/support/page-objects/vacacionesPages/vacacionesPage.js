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
  }

  vacacionNormalAraujo() {
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
  }

  registroVacacionNormal() {}

  rechazoVacacionNormal(dataEmpleado) {
    cy.xpath("(//div[contains(.,'addPor registrar')])[14]").click();
    cy.wait(1000);
    cy.xpath("//input[contains(@placeholder,'Buscar')]").type(
      dataEmpleado.apellido,
      { force: true }
    );
    cy.xpath("(//div[contains(.,'rechazar')])[14]").click();
    cy.xpath("(//input[contains(@type,'text')])[15]").type(
      "Pruebas Automatizadas QA"
    );
    cy.xpath("//button[contains(.,'Si')]").click();
  }
}

export default vacacionesPage;
