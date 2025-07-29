require("cypress-xpath");
require("cypress-plugin-tab");
class prestamosPage {
  goToVacaciones() {
    cy.xpath("//a[@tabindex='0'][contains(.,'dashboardDashboard')]").click();
    cy.xpath("//button[contains(.,'supervised_user_circleEmpleados')]").click();
    cy.xpath("//a[@tabindex='0'][contains(.,'Vacaciones')]").click();
    cy.wait(1000);
  }
}

export default prestamosPage;
